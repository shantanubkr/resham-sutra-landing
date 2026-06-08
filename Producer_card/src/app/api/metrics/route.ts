import { NextRequest } from "next/server";
import { readDatabase } from "@/lib/store";
import {
  computeMetrics,
  errorResponse,
  jsonResponse,
  requireRole,
} from "@/lib/auth/guards";

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(request, [
      "admin",
      "cluster_head",
      "field_operator",
    ]);
    const db = await readDatabase();
    const clusterIds =
      user.role === "admin" ? undefined : user.clusterIds;
    const metrics = computeMetrics(db, clusterIds);
    return jsonResponse({ metrics });
  } catch (e) {
    return errorResponse(e);
  }
}
