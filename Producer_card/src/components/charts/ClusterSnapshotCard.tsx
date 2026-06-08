"use client";

import { useI18n } from "@/lib/i18n/provider";
import Link from "next/link";
import { RatioStrip } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { chartColor } from "@/components/charts/palette";
import type { ClusterSummary } from "@/lib/types";
import type { BuyerCatalogCluster } from "@/lib/types";

type ClusterLike = {
  id: string;
  name: string;
  villageNames: string[];
  reshamDootName?: string | null;
  artisanCount?: number;
  listings?: { productLabel: string; quantityAvailable: number }[];
  metrics?: ClusterSummary["metrics"];
  production?: ClusterSummary["metrics"]["production"];
};

export function ClusterSnapshotCard({
  cluster,
  href,
  footer,
}: {
  cluster: ClusterLike;
  href: string;
  footer?: React.ReactNode;
}) {
  const { tr } = useI18n();

  const production =
    cluster.production ?? cluster.metrics?.production;
  const artisanCount =
    cluster.artisanCount ?? production?.artisanCount ?? 0;
  const listings = cluster.listings ?? [];

  const outputSegments = production
    ? [
        {
          label: tr("silkShort"),
          value: production.totalSilkWovenMeters,
          color: chartColor(4),
        },
        {
          label: tr("produceShort"),
          value: production.totalProduceKg,
          color: chartColor(5),
        },
        {
          label: tr("cocoonsShort"),
          value: production.totalCocoonsKg,
          color: chartColor(6),
        },
      ].filter((s) => s.value > 0)
    : listings.map((l, i) => ({
        label: l.productLabel.split(" ")[0],
        value: l.quantityAvailable,
        color: chartColor(i),
      }));

  const sellerCount = cluster.metrics?.sellerCount ?? 0;
  const totalProducers = cluster.metrics?.totalProducers ?? artisanCount;

  return (
    <Link
      href={href}
      className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-black"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-bold">{cluster.name}</h3>
          <p className="mt-0.5 truncate text-xs text-muted">
            {cluster.villageNames.join(" · ")}
          </p>
        </div>
        {totalProducers > 0 && (
          <DonutChart
            segments={[
              { label: tr("sellers"), value: sellerCount, color: chartColor(4) },
              {
                label: tr("others"),
                value: Math.max(0, totalProducers - sellerCount),
                color: chartColor(1),
              },
            ]}
            size={56}
            thickness={10}
            centerValue={artisanCount || totalProducers}
          />
        )}
      </div>

      {outputSegments.length > 0 && (
        <div className="mt-4">
          <RatioStrip segments={outputSegments} />
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
            {outputSegments.slice(0, 3).map((s) => (
              <span key={s.label} className="flex items-center gap-1">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: s.color }}
                />
                {s.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {footer && <div className="mt-3">{footer}</div>}
    </Link>
  );
}

export function clusterFromSummary(c: ClusterSummary): ClusterLike {
  return {
    id: c.id,
    name: c.name,
    villageNames: c.villageNames,
    reshamDootName: c.reshamDootName,
    metrics: c.metrics,
    production: c.metrics.production,
  };
}

export function clusterFromBuyer(c: BuyerCatalogCluster): ClusterLike {
  return {
    id: c.id,
    name: c.name,
    villageNames: c.villageNames,
    reshamDootName: c.reshamDootName,
    artisanCount: c.artisanCount,
    listings: c.listings,
    production: c.production,
  };
}
