import { errorResponse, jsonResponse } from "@/lib/auth/guards";
import { resetDatabase } from "@/lib/store";

export async function POST() {
  try {
    if (process.env.NODE_ENV === "production") {
      return jsonResponse({ error: "Not available in production" }, 403);
    }
    await resetDatabase();
    return jsonResponse({ ok: true, message: "Database reset to seed data" });
  } catch (e) {
    return errorResponse(e);
  }
}
