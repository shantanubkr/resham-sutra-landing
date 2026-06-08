import { NextRequest } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/store";
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
    await requireRole(request, [
      "admin",
      "cluster_head",
      "field_operator",
      "producer",
    ]);
    const { id } = await params;
    const db = await readDatabase();
    const links = db.producerSchemes.filter((ps) => ps.producerId === id);
    const schemes = links.map((link) => ({
      ...db.schemes.find((s) => s.id === link.schemeId)!,
      taggedBy: link.taggedBy,
      taggedAt: link.taggedAt,
    }));
    return jsonResponse({ schemes });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(request, ["admin", "cluster_head"]);
    const { id } = await params;
    const { schemeId, action } = await request.json();
    const db = await readDatabase();
    const producer = db.producers.find((p) => p.id === id);
    if (!producer) return jsonResponse({ error: "Not found" }, 404);
    if (!canEditProducer(user, producer)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    if (action === "remove") {
      db.producerSchemes = db.producerSchemes.filter(
        (ps) => !(ps.producerId === id && ps.schemeId === schemeId)
      );
    } else {
      const exists = db.producerSchemes.some(
        (ps) => ps.producerId === id && ps.schemeId === schemeId
      );
      if (!exists) {
        db.producerSchemes.push({
          producerId: id,
          schemeId,
          taggedBy: "admin_manual",
          taggedAt: new Date().toISOString(),
        });
      }
    }

    await writeDatabase(db);
    return jsonResponse({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
