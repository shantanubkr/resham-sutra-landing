import { NextRequest } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/store";
import { STAFF_VIEW_ROLES } from "@/lib/roles/staff";
import { canLogTraining } from "@/lib/roles/permissions";
import {
  canEditProducer,
  errorResponse,
  jsonResponse,
  requireRole,
} from "@/lib/auth/guards";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(request, [...STAFF_VIEW_ROLES, "producer"]);
    const { id } = await params;
    const db = await readDatabase();
    const trainings = db.trainings.filter((t) => t.producerId === id);
    return jsonResponse({ trainings });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(request, [
      "admin",
      "cluster_head",
      "field_operator",
      "producer",
    ]);
    const { id } = await params;
    const body = await request.json();
    const db = await readDatabase();
    const producer = db.producers.find((p) => p.id === id);
    if (!producer) return jsonResponse({ error: "Not found" }, 404);

    if (user.role === "producer" && user.producerId !== id) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }
    if (user.role !== "producer" && !canLogTraining(user, producer)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const training = {
      id: crypto.randomUUID(),
      producerId: id,
      trainingName: body.trainingName,
      organisation: body.organisation,
      dateAttended: body.dateAttended,
      durationDays: body.durationDays ?? 1,
      certificationText: body.certificationText ?? null,
      certificationFileUrl: body.certificationFileUrl ?? null,
    };
    db.trainings.push(training);
    await writeDatabase(db);
    return jsonResponse({ training }, 201);
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(request, [
      "admin",
      "cluster_head",
      "field_operator",
    ]);
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const trainingId = searchParams.get("trainingId");
    if (!trainingId) return jsonResponse({ error: "trainingId required" }, 400);

    const db = await readDatabase();
    const producer = db.producers.find((p) => p.id === id);
    if (!producer || !canEditProducer(user, producer)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    db.trainings = db.trainings.filter((t) => t.id !== trainingId);
    await writeDatabase(db);
    return jsonResponse({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
