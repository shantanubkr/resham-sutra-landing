import { NextRequest } from "next/server";
import { readDatabase } from "@/lib/store";
import { errorResponse, jsonResponse } from "@/lib/auth/guards";

export async function GET() {
  try {
    const db = await readDatabase();
    return jsonResponse({ clusters: db.clusters, skills: db.skills });
  } catch (e) {
    return errorResponse(e);
  }
}
