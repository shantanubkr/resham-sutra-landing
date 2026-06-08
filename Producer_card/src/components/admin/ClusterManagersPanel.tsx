"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { OFFLINE_MANAGER_ROLES } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import type { ClusterManagerContact } from "@/lib/types";

export function ClusterManagersPanel({
  clusterId,
  initial,
  canManage,
}: {
  clusterId: string;
  initial: ClusterManagerContact[];
  canManage: boolean;
}) {
  const { tr } = useI18n();
  const [managers, setManagers] = useState<ClusterManagerContact[]>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setManagers(initial);
  }, [initial]);

  function updateRow(
    role: ClusterManagerContact["role"],
    field: "name" | "contact",
    value: string
  ) {
    setManagers((rows) =>
      rows.map((r) => (r.role === role ? { ...r, [field]: value } : r))
    );
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    try {
      await apiFetch(`/api/clusters/${clusterId}`, {
        method: "PATCH",
        body: JSON.stringify({ offlineManagers: managers }),
      });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  const rows =
    managers.length > 0
      ? managers
      : OFFLINE_MANAGER_ROLES.map((r) => ({
          role: r.value,
          name: "",
          contact: "",
        }));

  return (
    <Card>
      <h2 className="mb-1 text-lg font-bold">{tr("offlineManagers")}</h2>
      <p className="mb-4 text-sm text-muted">
        {canManage
          ? tr("managerContact")
          : tr("reshamDootViewNote")}
      </p>
      <div className="space-y-3">
        {rows.map((row) => {
          const label =
            OFFLINE_MANAGER_ROLES.find((r) => r.value === row.role)?.label ??
            row.role;
          return (
            <div
              key={row.role}
              className="rounded-xl border border-gray-200 bg-gray-50 p-3"
            >
              <p className="mb-2 text-sm font-semibold">{label}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input
                  placeholder={tr("managerName")}
                  value={row.name}
                  disabled={!canManage}
                  className="text-base"
                  onChange={(e) => updateRow(row.role, "name", e.target.value)}
                />
                <Input
                  placeholder={tr("managerContact")}
                  value={row.contact}
                  disabled={!canManage}
                  className="text-base"
                  inputMode="tel"
                  onChange={(e) =>
                    updateRow(row.role, "contact", e.target.value)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
      {canManage && (
        <Button
          variant="green"
          className="mt-4 w-full sm:w-auto"
          onClick={save}
          disabled={saving}
        >
          {saving ? tr("saving") : saved ? tr("saved") : tr("saveManagers")}
        </Button>
      )}
    </Card>
  );
}
