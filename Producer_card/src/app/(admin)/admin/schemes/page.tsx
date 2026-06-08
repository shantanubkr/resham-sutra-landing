"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { useI18n } from "@/lib/i18n/provider";
import { trGender, trCategory } from "@/lib/i18n/translations";
import { PageHeader } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { semanticStyles } from "@/lib/ui/semantic";
import type { Scheme } from "@/lib/types";

export default function SchemeManagementPage() {
  const { locale, tr } = useI18n();
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  useEffect(() => {
    apiFetch<{ schemes: Scheme[] }>("/api/schemes").then((d) =>
      setSchemes(d.schemes)
    );
  }, []);

  return (
    <div>
      <PageHeader
        title={tr("schemeMgmtTitle")}
        description={tr("schemeMgmtDesc")}
      />
      <Alert tone="warning" className="mb-6">
        {tr("schemeEligibilityWarning")}
      </Alert>
      <div className="grid gap-4">
        {schemes.map((s) => (
          <Card key={s.id}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-bold">{s.name}</h3>
                <p className="text-sm text-muted">{s.administeringBody}</p>
              </div>
              <Badge color="success">{tr("active")}</Badge>
            </div>
            <p className="mt-3 text-sm">{s.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.eligibilityGender && s.eligibilityGender !== "any" && (
                <Badge color="info">
                  {trGender(locale, s.eligibilityGender)}{" "}
                  {tr("genderOnlySuffix")}
                </Badge>
              )}
              {[...new Set(s.eligibilitySkillCategories)].map((c) => (
                <Badge key={c} color="gray">
                  {trCategory(locale, c)}
                </Badge>
              ))}
            </div>
            <a
              href={s.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 inline-block text-sm ${semanticStyles.info.link}`}
            >
              {tr("referenceLink")}
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
