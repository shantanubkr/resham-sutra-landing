import { NextRequest } from "next/server";
import { readDatabase } from "@/lib/store";
import { errorResponse, getSessionUser, jsonResponse } from "@/lib/auth/guards";

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) return jsonResponse({ error: "Unauthorized" }, 401);

    const db = await readDatabase();
    return jsonResponse({ schemes: db.schemes.filter((s) => s.isActive) });
  } catch (e) {
    return errorResponse(e);
  }
}
