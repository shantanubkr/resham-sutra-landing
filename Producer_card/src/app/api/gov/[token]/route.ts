import { NextRequest } from "next/server";
import { readDatabase } from "@/lib/store";
import { computeMetrics, errorResponse, jsonResponse } from "@/lib/auth/guards";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const db = await readDatabase();
    const govToken = db.govTokens.find((t) => t.token === token);
    if (!govToken) return jsonResponse({ error: "Invalid token" }, 404);
    if (
      govToken.expiresAt &&
      new Date(govToken.expiresAt) < new Date()
    ) {
      return jsonResponse({ error: "Token expired" }, 403);
    }

    const metrics = computeMetrics(db);
    return jsonResponse({ metrics, label: govToken.label });
  } catch (e) {
    return errorResponse(e);
  }
}
