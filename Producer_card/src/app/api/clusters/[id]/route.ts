import { NextRequest } from "next/server";
import { readDatabase, writeDatabase } from "@/lib/store";
import { STAFF_MANAGE_ROLES, STAFF_VIEW_ROLES } from "@/lib/roles/staff";
import { canManageCluster } from "@/lib/roles/permissions";
import { categoryLabel } from "@/lib/constants";
import {
  computeMetrics,
  errorResponse,
  jsonResponse,
  requireRole,
} from "@/lib/auth/guards";
import type { ClusterManagerContact } from "@/lib/types";

function clusterStaff(db: Awaited<ReturnType<typeof readDatabase>>, clusterId: string) {
  const cluster = db.clusters.find((c) => c.id === clusterId)!;
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
    .map((u) => ({ id: u!.id, name: u!.name, phone: u!.phone }));

  return {
    clusterHeadId: cluster.assignedClusterHeadId,
    clusterHeadName: head?.name ?? null,
    clusterHeadPhone: head?.phone ?? null,
    reshamDoots: doots,
    reshamDootName: doots[0]?.name ?? null,
    reshamDootPhone: doots[0]?.phone ?? null,
    offlineManagers: cluster.offlineManagers ?? [],
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(request, STAFF_VIEW_ROLES);
    const { id } = await params;
    const db = await readDatabase();
    const cluster = db.clusters.find((c) => c.id === id);

    if (!cluster) return jsonResponse({ error: "Not found" }, 404);

    if (
      user.role !== "admin" &&
      !user.clusterIds.includes(cluster.id)
    ) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const staff = clusterStaff(db, id);

    const producers = db.producers
      .filter((p) => p.clusterId === cluster.id)
      .map((p) => ({
        ...p,
        schemeCount: db.producerSchemes.filter((ps) => ps.producerId === p.id)
          .length,
        categoryLabel: categoryLabel(p.category),
      }));

    return jsonResponse({
      cluster: {
        id: cluster.id,
        name: cluster.name,
        villageNames: cluster.villageNames,
        district: cluster.district,
        state: cluster.state,
        pinCode: cluster.pinCode,
        ...staff,
      },
      canManage: canManageCluster(user, cluster.id),
      metrics: computeMetrics(db, [cluster.id]),
      producers,
    });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireRole(request, STAFF_MANAGE_ROLES);
    const { id } = await params;
    const body = await request.json();
    const db = await readDatabase();
    const idx = db.clusters.findIndex((c) => c.id === id);
    if (idx === -1) return jsonResponse({ error: "Not found" }, 404);

    if (!canManageCluster(user, id)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    if (body.offlineManagers !== undefined) {
      db.clusters[idx].offlineManagers = body.offlineManagers as ClusterManagerContact[];
    }

    await writeDatabase(db);
    return jsonResponse({
      cluster: {
        ...db.clusters[idx],
        ...clusterStaff(db, id),
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
