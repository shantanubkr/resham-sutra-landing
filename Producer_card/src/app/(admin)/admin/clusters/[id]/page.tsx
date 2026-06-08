"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { useI18n } from "@/lib/i18n/provider";
import { trCategory } from "@/lib/i18n/translations";
import { PageHeader } from "@/components/layout/AppShell";
import { ClusterInventoryPanel } from "@/components/admin/ClusterInventoryPanel";
import { ClusterManagersPanel } from "@/components/admin/ClusterManagersPanel";
import { MetricsOverview } from "@/components/admin/MetricsOverview";
import { ProductionMetricsPanel } from "@/components/admin/ProductionMetricsPanel";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type {
  ClusterManagerContact,
  Metrics,
  Producer,
} from "@/lib/types";

interface ClusterDetail {
  id: string;
  name: string;
  villageNames: string[];
  clusterHeadName: string | null;
  clusterHeadPhone: string | null;
  reshamDootName: string | null;
  reshamDootPhone: string | null;
  reshamDoots: { id: string; name: string; phone: string }[];
  offlineManagers: ClusterManagerContact[];
}

type ProducerRow = Producer & {
  schemeCount: number;
  categoryLabel: string;
};

export default function ClusterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { locale, tr } = useI18n();
  const [cluster, setCluster] = useState<ClusterDetail | null>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [producers, setProducers] = useState<ProducerRow[]>([]);
  const [canManage, setCanManage] = useState(false);

  useEffect(() => {
    apiFetch<{
      cluster: ClusterDetail;
      metrics: Metrics;
      producers: ProducerRow[];
      canManage: boolean;
    }>(`/api/clusters/${id}`).then((d) => {
      setCluster(d.cluster);
      setMetrics(d.metrics);
      setProducers(d.producers);
      setCanManage(d.canManage);
    });
  }, [id]);

  if (!cluster || !metrics) {
    return <p className="text-muted">{tr("loadingCluster")}</p>;
  }

  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href="/admin/clusters" className="hover:text-foreground">
          {tr("clusters")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{cluster.name}</span>
      </nav>

      {!canManage && (
        <Alert tone="info" className="mb-4">
          {tr("reshamDootViewNote")}
        </Alert>
      )}

      <PageHeader
        title={cluster.name}
        description={cluster.villageNames.join(", ")}
        action={
          canManage ? (
            <Link href={`/admin/onboard?clusterId=${cluster.id}`}>
              <Button variant="green">{tr("onboardInCluster")}</Button>
            </Link>
          ) : undefined
        }
      />

      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-muted">
            {tr("clusterHead")}
          </p>
          <p className="mt-1 text-lg font-bold">
            {cluster.clusterHeadName ?? "—"}
          </p>
          {cluster.clusterHeadPhone && (
            <p className="text-sm text-muted">{cluster.clusterHeadPhone}</p>
          )}
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase text-muted">
            {tr("reshamDoot")}
          </p>
          {cluster.reshamDoots.length > 0 ? (
            cluster.reshamDoots.map((d) => (
              <div key={d.id} className="mt-1">
                <p className="text-lg font-bold">{d.name}</p>
                <p className="text-sm text-muted">{d.phone}</p>
              </div>
            ))
          ) : (
            <p className="mt-1 text-lg font-bold">—</p>
          )}
        </div>
      </div>

      <ClusterManagersPanel
        clusterId={cluster.id}
        initial={cluster.offlineManagers}
        canManage={canManage}
      />

      <div className="mt-10">
        <ProductionMetricsPanel production={metrics.production} />
      </div>

      <div className="mt-10">
        <ClusterInventoryPanel clusterId={cluster.id} canManage={canManage} />
      </div>

      <div className="mt-10">
        <MetricsOverview metrics={metrics} />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-bold">{tr("producersInCluster")}</h2>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">{tr("producer")}</th>
                <th className="px-4 py-3 font-semibold">{tr("colVillage")}</th>
                <th className="px-4 py-3 font-semibold">{tr("colCategory")}</th>
                <th className="px-4 py-3 font-semibold">{tr("colSeller")}</th>
                <th className="px-4 py-3 font-semibold">{tr("schemes")}</th>
                <th className="px-4 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {producers.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.photoUrl}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{p.fullName}</p>
                        <p className="text-xs text-muted">{p.producerCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{p.village}</td>
                  <td className="px-4 py-3">
                    <Badge color="green">
                      {trCategory(locale, p.category)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {p.isSeller ? (
                      <Badge color="warning">{tr("yes")}</Badge>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{p.schemeCount}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/producers/${p.id}`}
                      className="font-medium text-info hover:underline"
                    >
                      {tr("open")}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {producers.length === 0 && (
            <p className="p-8 text-center text-muted">
              {tr("noProducersInCluster")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
