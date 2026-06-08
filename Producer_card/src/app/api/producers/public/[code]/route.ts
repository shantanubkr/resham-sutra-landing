import { NextRequest } from "next/server";
import { readDatabase } from "@/lib/store";
import {
  errorResponse,
  getSessionUser,
  jsonResponse,
  toPublicProducer,
} from "@/lib/auth/guards";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const user = await getSessionUser(request);
    const showPhone = user?.role === "buyer";

    const db = await readDatabase();
    const producer = db.producers.find(
      (p) => p.producerCode.toLowerCase() === code.toLowerCase()
    );
    if (!producer) return jsonResponse({ error: "Not found" }, 404);

    const schemeLinks = db.producerSchemes.filter(
      (ps) => ps.producerId === producer.id
    );
    const schemes = schemeLinks
      .map((link) => db.schemes.find((s) => s.id === link.schemeId))
      .filter(Boolean);

    return jsonResponse({
      ...toPublicProducer(db, producer, showPhone),
      schemes,
    });
  } catch (e) {
    return errorResponse(e);
  }
}
