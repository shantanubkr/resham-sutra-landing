import { jsonResponse } from "@/lib/auth/guards";

// This endpoint has been superseded by /api/buyers/saved-listings.
// Returning 410 Gone to avoid silent failures from any stale clients.
export async function GET() {
  return jsonResponse({ error: "This endpoint is no longer active. Use /api/buyers/saved-listings." }, 410);
}

export async function POST() {
  return jsonResponse({ error: "This endpoint is no longer active. Use /api/buyers/saved-listings." }, 410);
}

export async function DELETE() {
  return jsonResponse({ error: "This endpoint is no longer active. Use /api/buyers/saved-listings." }, 410);
}
