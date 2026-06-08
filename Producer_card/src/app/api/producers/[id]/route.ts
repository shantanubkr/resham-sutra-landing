import { NextRequest } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/store";
import { applyAutoSchemeMatching } from "@/lib/schemes/matcher";
import { syncProducerFromCategoryEntries } from "@/lib/producers/category";
import { syncSellerFlagsForCluster } from "@/lib/producers/seller";
import {
  canAccessProducer,
  canEditProducer,
  errorResponse,
  getSessionUser,
  jsonResponse,
  requireRole,
} from "@/lib/auth/guards";
import { normalizeMonthlyOutput } from "@/lib/buyers/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getSessionUser(request);
    if (!user) return jsonResponse({ error: "Unauthorized" }, 401);

    const db = await readDatabase();
    const producer = db.producers.find((p) => p.id === id);
    if (!producer) return jsonResponse({ error: "Not found" }, 404);
    if (!canAccessProducer(user, producer)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const trainings = db.trainings.filter((t) => t.producerId === id);
    const schemeLinks = db.producerSchemes.filter((ps) => ps.producerId === id);
    const schemes = schemeLinks.map((link) => ({
      ...db.schemes.find((s) => s.id === link.schemeId)!,
      taggedBy: link.taggedBy,
      taggedAt: link.taggedAt,
    }));

    return jsonResponse({
      producer,
      trainings,
      schemes,
      canEdit: canEditProducer(user, producer),
    });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await requireRole(request, [
      "admin",
      "cluster_head",
      "producer",
    ]);
    const body = await request.json();
    const db = await readDatabase();
    const idx = db.producers.findIndex((p) => p.id === id);
    if (idx === -1) return jsonResponse({ error: "Not found" }, 404);

    const producer = db.producers[idx];

    if (user.role === "producer") {
      if (user.producerId !== id) {
        return jsonResponse({ error: "Forbidden" }, 403);
      }
      db.producers[idx] = {
        ...producer,
        editRequestPending: true,
        editRequestNotes: body.editRequestNotes ?? "Profile update requested",
        updatedAt: new Date().toISOString(),
      };
      if (body.growthPathwayNotes !== undefined) {
        db.producers[idx].growthPathwayNotes = body.growthPathwayNotes;
      }
      await writeDatabase(db);
      return jsonResponse({ producer: db.producers[idx] });
    }

    if (!canEditProducer(user, producer)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const allowed = [
      "fullName", "photoUrl", "phone", "village", "clusterId", "category",
      "categoryIds", "primaryCategoryId", "categoryEntries", "gender",
      "dateOfBirth", "householdSize", "dependentsCount", "incomeBaseline",
      "primaryLivelihood", "yearsOfExperience", "machineAccess",
      "growthPathwayNotes", "monthlyOutput", "editRequestPending",
      "editRequestNotes",
    ] as const;

    const updated = { ...producer, updatedAt: new Date().toISOString() };
    for (const key of allowed) {
      if (body[key] !== undefined) {
        (updated as Record<string, unknown>)[key] = body[key];
      }
    }

    if (body.categoryEntries !== undefined) {
      syncProducerFromCategoryEntries(updated, updated.categoryEntries ?? []);
    }

    if (body.monthlyOutput !== undefined) {
      updated.monthlyOutput = normalizeMonthlyOutput(
        body.monthlyOutput,
        updated,
        []
      );
    }

    db.producers[idx] = updated;
    syncSellerFlagsForCluster(db, updated.clusterId);
    await applyAutoSchemeMatching(db, id);
    await writeDatabase(db);
    return jsonResponse({ producer: db.producers[idx] });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole(request, ["admin"]);
    const db = await readDatabase();
    db.producers = db.producers.filter((p) => p.id !== id);
    db.trainings = db.trainings.filter((t) => t.producerId !== id);
    db.producerSchemes = db.producerSchemes.filter((ps) => ps.producerId !== id);
    await writeDatabase(db);
    return jsonResponse({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
