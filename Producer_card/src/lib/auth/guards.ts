import { NextRequest } from "next/server";
import type { AuthUser, Database, Producer, UserRole } from "@/lib/types";
import { readDatabase } from "@/lib/store";
import { producerCategories } from "@/lib/producers/category";
import {
  canEditProducer as roleCanEditProducer,
  canViewProducer as roleCanViewProducer,
  filterProducersByRole as roleFilterProducers,
} from "@/lib/roles/permissions";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export async function getSessionUser(
  request: NextRequest
): Promise<AuthUser | null> {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;

  const token = auth.slice(7);
  const db = await readDatabase();
  const session = db.sessions.find(
    (s) => s.token === token && new Date(s.expiresAt) > new Date()
  );
  if (!session) return null;

  const user = db.users.find((u) => u.id === session.userId && u.isActive);
  if (!user) return null;

  return {
    id: user.id,
    phone: user.phone,
    email: user.email,
    role: user.role,
    name: user.name,
    clusterIds: user.clusterIds,
    producerId: user.producerId,
    buyerId: user.buyerId,
  };
}

export async function requireAuth(request: NextRequest): Promise<AuthUser> {
  const user = await getSessionUser(request);
  if (!user) throw new ApiError(401, "Unauthorized");
  return user;
}

export async function requireRole(
  request: NextRequest,
  roles: UserRole[]
): Promise<AuthUser> {
  const user = await requireAuth(request);
  if (!roles.includes(user.role)) throw new ApiError(403, "Forbidden");
  return user;
}

export function filterProducersByRole(
  producers: Producer[],
  user: AuthUser
): Producer[] {
  return roleFilterProducers(producers, user);
}

export function canAccessProducer(user: AuthUser, producer: Producer): boolean {
  return roleCanViewProducer(user, producer);
}

export function canEditProducer(user: AuthUser, producer: Producer): boolean {
  return roleCanEditProducer(user, producer);
}

export function toPublicProducer(
  db: Database,
  producer: Producer,
  showPhone = false
) {
  const skills = db.skills.filter((s) => producer.skillIds.includes(s.id));
  const trainings = db.trainings.filter((t) => t.producerId === producer.id);
  const categories = producerCategories(producer);
  return {
    producerCode: producer.producerCode,
    fullName: producer.fullName,
    photoUrl: producer.photoUrl,
    village: producer.village,
    category: producer.category,
    categories,
    categoryEntries: producer.categoryEntries ?? [],
    isSeller: producer.isSeller,
    yearsOfExperience: producer.yearsOfExperience,
    skills,
    trainings,
    enrolledAt: producer.enrolledAt,
    showPhone,
    ...(showPhone ? { phone: producer.phone } : {}),
  };
}

export function computeMetrics(db: Database, clusterIds?: string[]) {
  let producers = db.producers;
  if (clusterIds?.length) {
    producers = producers.filter((p) => clusterIds.includes(p.clusterId));
  }

  const byCategory: Record<string, number> = {};
  const byVillage: Record<string, number> = {};
  const byGender: Record<string, number> = {};
  const qualityCounts: Record<string, number> = {};
  let incompleteProfiles = 0;
  let sellerCount = 0;
  let weaverCount = 0;
  let spinnerCount = 0;
  let farmerCount = 0;
  let dyerCount = 0;
  let totalSilkWovenMeters = 0;
  let totalProduceKg = 0;
  let totalCocoonsKg = 0;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const clusterSet = clusterIds?.length
    ? new Set(clusterIds)
    : new Set(producers.map((p) => p.clusterId));
  const pendingInterests = (db.interestRequests ?? []).filter(
    (r) =>
      clusterSet.has(r.clusterId) && (!r.readByAdmin || !r.readByDoot)
  ).length;

  for (const p of producers) {
    byCategory[p.category] = (byCategory[p.category] ?? 0) + 1;
    byVillage[p.village] = (byVillage[p.village] ?? 0) + 1;
    byGender[p.gender] = (byGender[p.gender] ?? 0) + 1;
    if (p.isSeller) sellerCount++;
    if (!p.photoUrl || !p.categoryEntries?.length) incompleteProfiles++;

    if (p.category === "weaver") weaverCount++;
    if (p.category === "spinner") spinnerCount++;
    if (p.category === "farmer" || p.category === "cocoon_rearer") farmerCount++;
    if (p.category === "yarn_dyer") dyerCount++;

    const output = p.monthlyOutput ?? {
      silkWovenMeters: 0,
      produceKg: 0,
      cocoonsKg: 0,
    };
    totalSilkWovenMeters += output.silkWovenMeters;
    totalProduceKg += output.produceKg;
    totalCocoonsKg += output.cocoonsKg;

    for (const entry of p.categoryEntries ?? []) {
      const key = `${entry.category} (${entry.quality})`;
      qualityCounts[key] = (qualityCounts[key] ?? 0) + 1;
    }
  }

  const topSkills = Object.entries(qualityCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const producerIds = new Set(producers.map((p) => p.id));
  const taggedLinks = db.producerSchemes.filter((ps) =>
    producerIds.has(ps.producerId)
  );

  const schemeCoverageMap: Record<string, number> = {};
  for (const link of taggedLinks) {
    const scheme = db.schemes.find((s) => s.id === link.schemeId);
    if (scheme) {
      schemeCoverageMap[scheme.name] =
        (schemeCoverageMap[scheme.name] ?? 0) + 1;
    }
  }

  const schemeCoverage = Object.entries(schemeCoverageMap)
    .map(([schemeName, count]) => ({ schemeName, count }))
    .sort((a, b) => b.count - a.count);

  const newEnrolments30Days = producers.filter(
    (p) => new Date(p.enrolledAt) >= thirtyDaysAgo
  ).length;

  return {
    totalProducers: producers.length,
    sellerCount,
    nonSellerCount: producers.length - sellerCount,
    byCategory,
    byVillage,
    byGender,
    topSkills,
    schemesTagged: taggedLinks.length,
    newEnrolments30Days,
    incompleteProfiles,
    schemeCoverage,
    pendingInterests,
    production: {
      artisanCount: producers.length,
      weaverCount,
      spinnerCount,
      silkFarmerCount: farmerCount,
      dyerCount,
      totalSilkWovenMeters,
      totalProduceKg,
      totalCocoonsKg,
      reportingLabel: "Monthly (reported by artisans)",
    },
  };
}

export function jsonResponse(data: unknown, status = 200) {
  return Response.json(data, { status });
}

export function errorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return jsonResponse({ error: error.message }, error.status);
  }
  console.error(error);
  return jsonResponse({ error: "Internal server error" }, 500);
}
