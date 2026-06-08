"use client";

import { chartColor, pct } from "@/components/charts/palette";

export interface ChartSegment {
  label: string;
  value: number;
  color?: string;
}

function conicStops(segments: ChartSegment[], total: number) {
  let cursor = 0;
  return segments
    .filter((s) => s.value > 0)
    .map((s, i) => {
      const start = cursor;
      const slice = (s.value / total) * 100;
      cursor += slice;
      const color = s.color ?? chartColor(i);
      return `${color} ${start}% ${cursor}%`;
    })
    .join(", ");
}

export function DonutChart({
  segments,
  size = 148,
  thickness = 26,
  centerValue,
  centerLabel,
  emptyLabel = "No data",
}: {
  segments: ChartSegment[];
  size?: number;
  thickness?: number;
  centerValue?: string | number;
  centerLabel?: string;
  emptyLabel?: string;
}) {
  const active = segments.filter((s) => s.value > 0);
  const total = active.reduce((sum, s) => sum + s.value, 0);

  if (total === 0) {
    return (
      <div
        className="relative flex items-center justify-center rounded-full bg-gray-100 text-xs text-muted"
        style={{ width: size, height: size }}
      >
        {emptyLabel}
      </div>
    );
  }

  const inner = size - thickness * 2;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${conicStops(active, total)})`,
        }}
      />
      <div
        className="absolute flex flex-col items-center justify-center rounded-full bg-white text-center"
        style={{
          width: inner,
          height: inner,
          top: thickness,
          left: thickness,
        }}
      >
        {centerValue !== undefined && (
          <span className="text-xl font-bold leading-none">{centerValue}</span>
        )}
        {centerLabel && (
          <span className="mt-0.5 max-w-[80px] text-[10px] leading-tight text-muted">
            {centerLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export function ChartLegend({
  segments,
  compact = false,
}: {
  segments: ChartSegment[];
  compact?: boolean;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const active = segments.filter((s) => s.value > 0);
  if (active.length === 0) return null;

  return (
    <ul className={compact ? "flex-1 space-y-1.5" : "flex-1 space-y-2"}>
      {active.map((s, i) => (
        <li key={s.label} className="flex items-center gap-2 text-sm">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: s.color ?? chartColor(i) }}
          />
          <span className="min-w-0 flex-1 truncate text-muted">{s.label}</span>
          <span className="font-semibold tabular-nums">{s.value}</span>
          <span className="w-8 text-right text-xs text-muted tabular-nums">
            {pct(s.value, total)}%
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ChartPanel({
  title,
  segments,
  centerValue,
  centerLabel,
  compactLegend,
}: {
  title: string;
  segments: ChartSegment[];
  centerValue?: string | number;
  centerLabel?: string;
  compactLegend?: boolean;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        <DonutChart
          segments={segments}
          centerValue={centerValue ?? total}
          centerLabel={centerLabel ?? "total"}
        />
        <ChartLegend segments={segments} compact={compactLegend} />
      </div>
    </div>
  );
}
