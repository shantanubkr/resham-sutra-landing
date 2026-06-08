"use client";

import { chartColor } from "@/components/charts/palette";

export interface BarItem {
  label: string;
  value: number;
  color?: string;
}

export function HorizontalBarChart({
  items,
  unit = "",
  maxItems = 6,
}: {
  items: BarItem[];
  unit?: string;
  maxItems?: number;
}) {
  const sorted = [...items]
    .filter((i) => i.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, maxItems);
  const max = Math.max(...sorted.map((i) => i.value), 1);

  if (sorted.length === 0) {
    return <p className="text-sm text-muted">No data yet</p>;
  }

  return (
    <ul className="space-y-3">
      {sorted.map((item, i) => (
        <li key={item.label}>
          <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
            <span className="truncate text-muted">{item.label}</span>
            <span className="shrink-0 font-semibold tabular-nums">
              {item.value.toLocaleString("en-IN")}
              {unit}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(item.value / max) * 100}%`,
                background: item.color ?? chartColor(i),
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function BarChartPanel({
  title,
  items,
  unit,
}: {
  title: string;
  items: BarItem[];
  unit?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <HorizontalBarChart items={items} unit={unit} />
    </div>
  );
}

/** Stacked horizontal strip — good for cluster/product mix at a glance */
export function RatioStrip({
  segments,
  height = 10,
}: {
  segments: BarItem[];
  height?: number;
}) {
  const active = segments.filter((s) => s.value > 0);
  const total = active.reduce((sum, s) => sum + s.value, 0);
  if (total === 0) {
    return <div className="rounded-full bg-gray-100" style={{ height }} />;
  }

  return (
    <div
      className="flex overflow-hidden rounded-full"
      style={{ height }}
      role="img"
      aria-label={active.map((s) => `${s.label} ${s.value}`).join(", ")}
    >
      {active.map((s, i) => (
        <div
          key={s.label}
          style={{
            width: `${(s.value / total) * 100}%`,
            background: s.color ?? chartColor(i),
          }}
          title={`${s.label}: ${s.value}`}
        />
      ))}
    </div>
  );
}
