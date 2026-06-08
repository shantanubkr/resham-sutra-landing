import { NextRequest } from "next/server";
import { readDatabase } from "@/lib/store";
import { categoryLabel } from "@/lib/constants";
import { errorResponse, jsonResponse } from "@/lib/auth/guards";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const db = await readDatabase();

    const govToken = db.govTokens.find((t) => t.token === token);
    if (!govToken) return jsonResponse({ error: "Invalid token" }, 404);
    if (govToken.expiresAt && new Date(govToken.expiresAt) < new Date()) {
      return jsonResponse({ error: "Token expired" }, 403);
    }

    const header =
      "producer_code,village,category,gender,date_of_birth,schemes_tagged,enrolled_at\n";

    const rows = db.producers.map((p) => {
      const schemeCount = db.producerSchemes.filter(
        (ps) => ps.producerId === p.id
      ).length;
      return [
        p.producerCode,
        p.village,
        categoryLabel(p.category),
        p.gender,
        p.dateOfBirth ?? "",
        schemeCount,
        p.enrolledAt.split("T")[0],
      ].join(",");
    });

    return new Response(header + rows.join("\n"), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="producers-export.csv"',
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
