import { NextRequest } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/store";
import { STAFF_MANAGE_ROLES } from "@/lib/roles/staff";
import { syncProducerFromCategoryEntries } from "@/lib/producers/category";
import { syncSellerFlagsForCluster } from "@/lib/producers/seller";
import { applyAutoSchemeMatching } from "@/lib/schemes/matcher";
import {
  errorResponse,
  filterProducersByRole,
  getSessionUser,
  jsonResponse,
  requireRole,
} from "@/lib/auth/guards";
import { canManageCluster } from "@/lib/roles/permissions";
import type { Producer } from "@/lib/types";
import { normalizeMonthlyOutput } from "@/lib/buyers/products";

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) return jsonResponse({ error: "Unauthorized" }, 401);
    if (user.role === "buyer") {
      return jsonResponse({ error: "Use /api/buyers/catalog" }, 403);
    }

    const db = await readDatabase();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase() ?? "";
    const category = searchParams.get("category");
    const village = searchParams.get("village");
    const clusterId = searchParams.get("clusterId");

    let producers = filterProducersByRole(db.producers, user);

    if (search) {
      producers = producers.filter(
        (p) =>
          p.fullName.toLowerCase().includes(search) ||
          p.producerCode.toLowerCase().includes(search) ||
          p.village.toLowerCase().includes(search)
      );
    }
    if (category) producers = producers.filter((p) => p.category === category);
    if (village) producers = producers.filter((p) => p.village === village);
    if (clusterId) producers = producers.filter((p) => p.clusterId === clusterId);

    const enriched = producers.map((p) => ({
      ...p,
      schemeCount: db.producerSchemes.filter((ps) => ps.producerId === p.id).length,
    }));

    return jsonResponse({ producers: enriched, total: enriched.length });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(request, STAFF_MANAGE_ROLES);
    const body = await request.json();
    const db = await readDatabase();
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    if (!body.photoUrl) {
      return jsonResponse({ error: "Photo is required" }, 400);
    }

    const categoryEntries = body.categoryEntries ?? [];
    const categoryIds =
      categoryEntries.length > 0
        ? categoryEntries.map((e: { category: string }) => e.category)
        : body.categoryIds?.length > 0
          ? body.categoryIds
          : [body.category];
    const primaryCategoryId =
      body.primaryCategoryId ?? categoryIds[0] ?? "weaver";

    const producer: Producer = {
      id,
      userId: body.userId ?? null,
      producerCode: (await import("@/lib/producers/id")).nextProducerCode(db),
      fullName: body.fullName,
      photoUrl: body.photoUrl,
      phone: body.phone,
      village: body.village,
      clusterId: body.clusterId,
      category: primaryCategoryId,
      categoryIds,
      primaryCategoryId,
      categoryEntries,
      isSeller: false,
      gender: body.gender,
      dateOfBirth: body.dateOfBirth,
      householdSize: body.householdSize ?? 1,
      dependentsCount: body.dependentsCount ?? 0,
      incomeBaseline: body.incomeBaseline,
      primaryLivelihood: body.primaryLivelihood ?? "",
      yearsOfExperience: body.yearsOfExperience ?? 0,
      machineAccess: body.machineAccess ?? false,
      growthPathwayNotes: body.growthPathwayNotes ?? "",
      skillIds: [],
      enrolledBy: user.id,
      enrolledAt: now,
      editRequestPending: false,
      editRequestNotes: null,
      monthlyOutput: {
        silkWovenMeters: 0,
        produceKg: 0,
        cocoonsKg: 0,
        products: {},
      },
      createdAt: now,
      updatedAt: now,
    };

    syncProducerFromCategoryEntries(producer, producer.categoryEntries);
    producer.monthlyOutput = normalizeMonthlyOutput(
      body.monthlyOutput,
      producer,
      []
    );

    if (!canManageCluster(user, producer.clusterId)) {
      return jsonResponse({ error: "Cannot create producer outside your cluster" }, 403);
    }

    db.producers.push(producer);
    syncSellerFlagsForCluster(db, producer.clusterId);

    if (body.userId) {
      const userIdx = db.users.findIndex((u) => u.id === body.userId);
      if (userIdx >= 0) db.users[userIdx].producerId = id;
    }

    await applyAutoSchemeMatching(db, id);
    await writeDatabase(db);

    return jsonResponse({ producer }, 201);
  } catch (e) {
    return errorResponse(e);
  }
}
