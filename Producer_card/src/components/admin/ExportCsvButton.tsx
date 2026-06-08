"use client";

import { getSession } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";

export function ExportCsvButton() {
  async function exportCsv() {
    const session = getSession();
    const headers: Record<string, string> = {};
    if (session?.token) headers.Authorization = `Bearer ${session.token}`;
    const res = await fetch("/api/export/csv", { headers });
    if (!res.ok) {
      alert("Export failed — ensure you are logged in as admin");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "producers-export.csv";
    a.click();
  }

  return (
    <Button variant="secondary" onClick={exportCsv}>
      Export CSV
    </Button>
  );
}
