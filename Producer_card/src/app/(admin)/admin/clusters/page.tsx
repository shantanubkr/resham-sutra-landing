"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { useI18n } from "@/lib/i18n/provider";
import { PageHeader } from "@/components/layout/AppShell";
import {
  ClusterSnapshotCard,
  clusterFromSummary,
} from "@/components/charts/ClusterSnapshotCard";
import type { ClusterSummary } from "@/lib/types";

export default function ClustersListPage() {
  const { tr } = useI18n();
  const [clusters, setClusters] = useState<ClusterSummary[]>([]);

  useEffect(() => {
    apiFetch<{ clusters: ClusterSummary[] }>("/api/clusters").then((d) =>
      setClusters(d.clusters)
    );
  }, []);

  return (
    <div>
      <PageHeader
        title={tr("clusters")}
        description={tr("clusterOverviewDesc")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {clusters.map((c) => (
          <ClusterSnapshotCard
            key={c.id}
            cluster={clusterFromSummary(c)}
            href={`/admin/clusters/${c.id}`}
            footer={
              c.reshamDootName ? (
                <p className="text-xs text-muted">
                  {tr("dootPrefix")}: {c.reshamDootName}
                </p>
              ) : null
            }
          />
        ))}
      </div>
    </div>
  );
}
