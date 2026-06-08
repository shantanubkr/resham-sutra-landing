"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { useSession } from "@/components/layout/RoleGuard";
import { PageHeader } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { semanticStyles } from "@/lib/ui/semantic";
import type { Scheme } from "@/lib/types";

export default function ProducerSchemesPage() {
  const { session } = useSession(true);
  const [schemes, setSchemes] = useState<(Scheme & { taggedBy: string })[]>(
    []
  );

  useEffect(() => {
    if (!session?.user.producerId) return;
    apiFetch<{ schemes: (Scheme & { taggedBy: string })[] }>(
      `/api/producers/${session.user.producerId}/schemes`
    ).then((d) => setSchemes(d.schemes));
  }, [session]);

  return (
    <div>
      <PageHeader
        title="My schemes"
        description="Government schemes matched to your profile"
      />
      <Alert tone="info" className="mb-6">
        Suggested eligibility only — not a guarantee of benefit.
      </Alert>
      <div className="grid gap-4">
        {schemes.map((s) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold">{s.name}</h3>
              <Badge color={s.taggedBy === "auto_match" ? "info" : "success"}>
                {s.taggedBy === "auto_match" ? "Auto-matched" : "Admin tagged"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted">{s.administeringBody}</p>
            <p className="mt-2 text-sm">{s.description}</p>
            <a
              href={s.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 inline-block text-sm ${semanticStyles.info.link}`}
            >
              Learn more →
            </a>
          </Card>
        ))}
        {schemes.length === 0 && (
          <Card>
            <p className="text-muted">
              No schemes matched yet. Complete your profile for eligibility
              matching.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
