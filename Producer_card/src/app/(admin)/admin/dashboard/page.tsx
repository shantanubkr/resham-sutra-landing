"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { PageHeader } from "@/components/layout/AppShell";
import { MetricsOverview } from "@/components/admin/MetricsOverview";
import { ExportCsvButton } from "@/components/admin/ExportCsvButton";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import {
  ClusterSnapshotCard,
  clusterFromSummary,
} from "@/components/charts/ClusterSnapshotCard";
import type { InterestRequest, Metrics, ClusterSummary } from "@/lib/types";
import { GOV_DEMO_TOKEN } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";

export default function AdminDashboardPage() {
  const { tr } = useI18n();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [clusters, setClusters] = useState<ClusterSummary[]>([]);
  const [interests, setInterests] = useState<InterestRequest[]>([]);

  function loadInterests() {
    apiFetch<{ interests: InterestRequest[] }>("/api/interest").then((d) =>
      setInterests(d.interests)
    );
  }

  useEffect(() => {
    apiFetch<{ metrics: Metrics }>("/api/metrics").then((d) =>
      setMetrics(d.metrics)
    );
    apiFetch<{ clusters: ClusterSummary[] }>("/api/clusters").then((d) =>
      setClusters(d.clusters)
    );
    loadInterests();
  }, []);

  async function dismissInterest(id: string) {
    await apiFetch("/api/interest", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });
    loadInterests();
  }

  return (
    <div>
      <PageHeader
        title={tr("dashboard")}
        description={tr("dashboardDesc")}
        action={
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/clusters">
              <Button variant="admin">{tr("viewClusters")}</Button>
            </Link>
            <Link href="/admin/onboard">
              <Button variant="green">{tr("onboardProducer")}</Button>
            </Link>
            <ExportCsvButton />
            <Link href={`/gov/${GOV_DEMO_TOKEN}`}>
              <Button variant="secondary">{tr("govtView")}</Button>
            </Link>
          </div>
        }
      />
      {metrics ? (
        <MetricsOverview metrics={metrics} />
      ) : (
        <p className="text-muted">{tr("loadingMetrics")}</p>
      )}

      {interests.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">{tr("pendingInterests")}</h2>
          <div className="space-y-3">
            {interests.map((item) => (
              <Alert key={item.id} tone="info" className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {item.buyerName}
                    {item.productLabel
                      ? ` → ${item.productLabel} (${item.clusterName})`
                      : item.producerName
                        ? ` → ${item.producerName}`
                        : ` → ${item.clusterName}`}
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(item.createdAt).toLocaleString("en-IN")}
                    {item.message && ` · ${item.message}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/clusters/${item.clusterId}`}>
                    <Button variant="secondary" className="text-xs">
                      {tr("viewCluster")}
                    </Button>
                  </Link>
                  <Button
                    variant="admin"
                    className="text-xs"
                    onClick={() => dismissInterest(item.id)}
                  >
                    {tr("markRead")}
                  </Button>
                </div>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {clusters.length > 0 && (
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">{tr("clusters")}</h2>
            <Link href="/admin/clusters" className="text-sm text-info hover:underline">
              {tr("viewAll")}
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {clusters.map((c) => (
              <ClusterSnapshotCard
                key={c.id}
                cluster={clusterFromSummary(c)}
                href={`/admin/clusters/${c.id}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
