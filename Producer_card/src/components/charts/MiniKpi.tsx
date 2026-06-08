"use client";

import { DonutChart, type ChartSegment } from "@/components/charts/DonutChart";

export function MiniKpiDonut({
  label,
  value,
  segments,
}: {
  label: string;
  value: string | number;
  segments: ChartSegment[];
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4">
      <DonutChart
        segments={segments}
        size={72}
        thickness={14}
        centerValue={value}
      />
      <p className="text-sm font-medium leading-snug">{label}</p>
    </div>
  );
}

export function MiniKpiBar({
  label,
  value,
  max,
  color = "#0a0a0a",
}: {
  label: string;
  value: number;
  max: number;
  color?: string;
}) {
  const width = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="text-2xl font-bold tabular-nums">{value.toLocaleString("en-IN")}</p>
      <p className="mt-0.5 text-xs text-muted">{label}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
}
