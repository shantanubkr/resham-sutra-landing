import { NextRequest } from "next/server";
import { errorResponse, getSessionUser, jsonResponse } from "@/lib/auth/guards";

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) return jsonResponse({ error: "Unauthorized" }, 401);
    return jsonResponse({ user });
  } catch (e) {
    return errorResponse(e);
  }
}
