"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { useI18n } from "@/lib/i18n/provider";
import { PageHeader } from "@/components/layout/AppShell";
import { ClusterInventoryPanel } from "@/components/admin/ClusterInventoryPanel";
import { Select } from "@/components/ui/Input";
import { semanticStyles } from "@/lib/ui/semantic";

interface ClusterOption {
  id: string;
  name: string;
}

export default function InventoryPage() {
  const { tr } = useI18n();
  const [clusters, setClusters] = useState<ClusterOption[]>([]);
  const [clusterId, setClusterId] = useState("");

  useEffect(() => {
    apiFetch<{ clusters: ClusterOption[] }>("/api/clusters").then((d) => {
      setClusters(d.clusters);
      if (d.clusters.length === 1) {
        setClusterId(d.clusters[0].id);
      } else if (d.clusters.length > 0) {
        setClusterId(d.clusters[0].id);
      }
    });
  }, []);

  const selected = clusters.find((c) => c.id === clusterId);

  return (
    <div>
      <PageHeader
        title={tr("clusterInventory")}
        description={tr("inventoryPageDesc")}
      />

      {clusters.length > 1 && (
        <div className="mb-6 max-w-sm">
          <label className="mb-1 block text-sm font-medium">
            {tr("selectCluster")}
          </label>
          <Select
            value={clusterId}
            onChange={(e) => setClusterId(e.target.value)}
          >
            {clusters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
      )}

      {clusterId ? (
        <>
          <ClusterInventoryPanel clusterId={clusterId} />
          <p className="mt-4 text-sm text-muted">
            <Link
              href={`/admin/clusters/${clusterId}`}
              className={semanticStyles.info.link}
            >
              {tr("viewCluster")}: {selected?.name}
            </Link>
          </p>
        </>
      ) : (
        <p className="text-muted">{tr("loading")}</p>
      )}
    </div>
  );
}
