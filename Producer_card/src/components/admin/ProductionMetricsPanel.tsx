"use client";

import { useI18n } from "@/lib/i18n/provider";
import { ChartPanel } from "@/components/charts/DonutChart";
import { BarChartPanel } from "@/components/charts/BarChart";
import { chartColor } from "@/components/charts/palette";
import type { ProductionMetrics } from "@/lib/types";

function fmtNum(n: number, decimals = 0) {
  return n.toLocaleString("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

export function ProductionMetricsPanel({
  production,
}: {
  production: ProductionMetrics;
}) {
  const { tr } = useI18n();

  const roleSegments = [
    { label: tr("weavers"), value: production.weaverCount, color: chartColor(0) },
    { label: tr("spinners"), value: production.spinnerCount, color: chartColor(5) },
    {
      label: tr("silkFarmers"),
      value: production.silkFarmerCount,
      color: chartColor(6),
    },
    { label: tr("dyers"), value: production.dyerCount, color: chartColor(2) },
  ].filter((s) => s.value > 0);

  const outputItems = [
    {
      label: tr("silkWovenChart"),
      value: production.totalSilkWovenMeters,
      color: chartColor(4),
    },
    {
      label: tr("produceChart"),
      value: Math.round(production.totalProduceKg * 10) / 10,
      color: chartColor(5),
    },
    {
      label: tr("cocoonsChart"),
      value: Math.round(production.totalCocoonsKg * 10) / 10,
      color: chartColor(6),
    },
  ].filter((i) => i.value > 0);

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold">{tr("production")}</h2>
        <span className="text-xs text-muted">{tr("monthlyReportingLabel")}</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartPanel
          title={tr("chartArtisansByRole")}
          segments={roleSegments}
          centerValue={production.artisanCount}
          centerLabel={tr("artisans")}
        />
        <BarChartPanel title={tr("chartMonthlyOutput")} items={outputItems} />
      </div>

      {outputItems.length > 0 && (
        <p className="text-center text-xs text-muted tabular-nums">
          {fmtNum(production.totalSilkWovenMeters)} {tr("silkMetersUnit")} ·{" "}
          {fmtNum(production.totalProduceKg, 1)} {tr("produceKgUnit")} ·{" "}
          {fmtNum(production.totalCocoonsKg, 1)} {tr("cocoonsKgUnit")}
        </p>
      )}
    </div>
  );
}
