import { NextRequest } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/store";
import { errorResponse, getSessionUser, jsonResponse } from "@/lib/auth/guards";

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) return jsonResponse({ ok: true });

    const db = await readDatabase();
    db.sessions = db.sessions.filter((s) => s.token !== request.headers.get("authorization")?.slice(7));
    await writeDatabase(db);
    return jsonResponse({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
