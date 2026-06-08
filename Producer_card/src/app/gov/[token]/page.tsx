"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MetricsOverview } from "@/components/admin/MetricsOverview";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/provider";
import type { Metrics } from "@/lib/types";

export default function GovDashboardPage() {
  const { token } = useParams<{ token: string }>();
  const { tr } = useI18n();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    fetch(`/api/gov/${token}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.metrics) {
          setMetrics(d.metrics);
          setLabel(d.label);
        }
      });
  }, [token]);

  async function exportCsv() {
    const res = await fetch(`/api/gov/${token}/export`);
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "producers-export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!metrics) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-muted">
        {tr("loadingDashboard")}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-wider text-foreground">
            {tr("govReadOnlyBadge")}
          </p>
          <h1 className="text-2xl font-bold">{label}</h1>
          <p className="text-sm text-muted">{tr("govMetricsSubtitle")}</p>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="no-print mb-6 flex gap-2">
          <Button variant="secondary" onClick={exportCsv}>
            {tr("exportCsvLabel")}
          </Button>
          <Button variant="secondary" onClick={() => window.print()}>
            {tr("printReportLabel")}
          </Button>
        </div>
        <MetricsOverview metrics={metrics} />
      </main>
      <footer className="border-t py-6 text-center text-xs text-muted">
        {tr("govFooterCopy")}
      </footer>
    </div>
  );
}
