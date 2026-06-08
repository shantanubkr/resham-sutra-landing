import { NextRequest } from "next/server";
import { getBuyerCluster } from "@/lib/buyers/catalog";
import { readDatabase } from "@/lib/store";
import { errorResponse, jsonResponse, requireRole } from "@/lib/auth/guards";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(request, ["buyer"]);
    const { id } = await params;
    const db = await readDatabase();
    const cluster = getBuyerCluster(db, id);
    if (!cluster) return jsonResponse({ error: "Not found" }, 404);
    return jsonResponse({ cluster });
  } catch (e) {
    return errorResponse(e);
  }
}
