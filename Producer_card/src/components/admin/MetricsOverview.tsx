"use client";

import { trCategory, trGender } from "@/lib/i18n/translations";
import { useI18n } from "@/lib/i18n/provider";
import { ChartPanel } from "@/components/charts/DonutChart";
import { BarChartPanel } from "@/components/charts/BarChart";
import { MiniKpiBar, MiniKpiDonut } from "@/components/charts/MiniKpi";
import { chartColor } from "@/components/charts/palette";
import type { Metrics } from "@/lib/types";

export function MetricsOverview({ metrics }: { metrics: Metrics }) {
  const { locale, tr } = useI18n();

  const categorySegments = Object.entries(metrics.byCategory).map(
    ([cat, count], i) => ({
      label: trCategory(locale, cat),
      value: count,
      color: chartColor(i),
    })
  );

  const genderSegments = Object.entries(metrics.byGender).map(
    ([g, count], i) => ({
      label: trGender(locale, g),
      value: count,
      color: chartColor(i + 2),
    })
  );

  const sellerSegments = [
    { label: tr("sellers"), value: metrics.sellerCount, color: chartColor(4) },
    {
      label: tr("nonSellers"),
      value: metrics.nonSellerCount,
      color: chartColor(1),
    },
  ];

  const kpiMax = Math.max(
    metrics.totalProducers,
    metrics.schemesTagged,
    metrics.newEnrolments30Days,
    metrics.incompleteProfiles,
    metrics.pendingInterests,
    1
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniKpiDonut
          label={tr("totalProducers")}
          value={metrics.totalProducers}
          segments={sellerSegments}
        />
        <MiniKpiBar
          label={tr("new30d")}
          value={metrics.newEnrolments30Days}
          max={kpiMax}
          color={chartColor(5)}
        />
        <MiniKpiBar
          label={tr("schemesTagged")}
          value={metrics.schemesTagged}
          max={kpiMax}
          color={chartColor(4)}
        />
        <MiniKpiBar
          label={tr("incompleteProfiles")}
          value={metrics.incompleteProfiles}
          max={kpiMax}
          color={chartColor(7)}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartPanel
          title={tr("chartByCategory")}
          segments={categorySegments}
          centerLabel={tr("producersCenter")}
        />
        <ChartPanel
          title={tr("chartGender")}
          segments={genderSegments}
          compactLegend
        />
        <BarChartPanel
          title={tr("chartTopSkills")}
          items={metrics.topSkills.map((s, i) => ({
            label: s.name,
            value: s.count,
            color: chartColor(i),
          }))}
        />
        <BarChartPanel
          title={tr("chartSchemeReach")}
          items={metrics.schemeCoverage.map((s, i) => ({
            label: s.schemeName,
            value: s.count,
            color: chartColor(i + 1),
          }))}
        />
      </div>
    </div>
  );
}
