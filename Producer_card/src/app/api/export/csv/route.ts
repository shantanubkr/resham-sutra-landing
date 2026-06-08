import { NextRequest } from "next/server";
import { readDatabase } from "@/lib/store";
import { categoryLabel } from "@/lib/constants";
import {
  computeMetrics,
  errorResponse,
  jsonResponse,
  requireRole,
} from "@/lib/auth/guards";

export async function GET(request: NextRequest) {
  try {
    await requireRole(request, ["admin"]);
    const db = await readDatabase();
    const { searchParams } = new URL(request.url);
    const clusterId = searchParams.get("clusterId");

    let producers = db.producers;
    if (clusterId) {
      producers = producers.filter((p) => p.clusterId === clusterId);
    }

    const header =
      "producer_code,village,category,skills,gender,date_of_birth,schemes_tagged,enrolled_at\n";
    const rows = producers.map((p) => {
      const skills = db.skills
        .filter((s) => p.skillIds.includes(s.id))
        .map((s) => s.name)
        .join("; ");
      const schemeCount = db.producerSchemes.filter(
        (ps) => ps.producerId === p.id
      ).length;
      return [
        p.producerCode,
        p.village,
        categoryLabel(p.category),
        `"${skills}"`,
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
