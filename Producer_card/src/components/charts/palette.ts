/** Chart segment colors — semantic + neutrals, works on white backgrounds */
export const CHART_PALETTE = [
  "#0a0a0a",
  "#525252",
  "#737373",
  "#a3a3a3",
  "#15803d",
  "#2563eb",
  "#b45309",
  "#dc2626",
] as const;

export function chartColor(index: number) {
  return CHART_PALETTE[index % CHART_PALETTE.length];
}

export function pct(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
}
