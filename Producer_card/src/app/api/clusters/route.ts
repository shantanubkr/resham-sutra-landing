import { NextRequest } from "next/server";
import { readDatabase } from "@/lib/store";
import { STAFF_VIEW_ROLES } from "@/lib/roles/staff";
import { filterClustersByRole } from "@/lib/roles/permissions";
import {
  computeMetrics,
  errorResponse,
  jsonResponse,
  requireRole,
} from "@/lib/auth/guards";

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(request, STAFF_VIEW_ROLES);
    const db = await readDatabase();
    const clusters = filterClustersByRole(db.clusters, user);

    const summaries = clusters.map((cluster) => {
      const head = cluster.assignedClusterHeadId
        ? db.users.find((u) => u.id === cluster.assignedClusterHeadId)
        : null;
      const dootIds =
        cluster.assignedReshamDootIds?.length > 0
          ? cluster.assignedReshamDootIds
          : cluster.assignedReshamDootId
            ? [cluster.assignedReshamDootId]
            : [];
      const doots = dootIds
        .map((id) => db.users.find((u) => u.id === id))
        .filter(Boolean)
        .map((u) => ({ name: u!.name, phone: u!.phone }));

      return {
        id: cluster.id,
        name: cluster.name,
        villageNames: cluster.villageNames,
        clusterHeadName: head?.name ?? null,
        reshamDootName: doots[0]?.name ?? null,
        reshamDootNames: doots.map((d) => d.name),
        metrics: computeMetrics(db, [cluster.id]),
      };
    });

    return jsonResponse({ clusters: summaries });
  } catch (e) {
    return errorResponse(e);
  }
}
