"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api-client";
import { useI18n } from "@/lib/i18n/provider";
import { useSession } from "@/components/layout/RoleGuard";
import { PageHeader } from "@/components/layout/AppShell";
import {
  ProfileBuilder,
  type ProfileFormData,
} from "@/components/producer/ProfileBuilder";
import { Alert } from "@/components/ui/Alert";
import { Card } from "@/components/ui/Card";
import type { Cluster } from "@/lib/types";

export default function AdminOnboardPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tr } = useI18n();
  const { session } = useSession(true);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const canOnboard =
    session?.user.role === "admin" || session?.user.role === "cluster_head";

  useEffect(() => {
    apiFetch<{ clusters: Cluster[] }>("/api/meta").then((d) =>
      setClusters(d.clusters)
    );
  }, []);

  async function handleSubmit(data: ProfileFormData) {
    setSubmitting(true);
    try {
      const clusterId =
        searchParams.get("clusterId") || data.clusterId || clusters[0]?.id;
      const result = await apiFetch<{ producer: { id: string } }>(
        "/api/producers",
        {
          method: "POST",
          body: JSON.stringify({ ...data, clusterId }),
        }
      );
      router.push(`/admin/producers/${result.producer.id}`);
    } finally {
      setSubmitting(false);
    }
  }

  const presetCluster = searchParams.get("clusterId") ?? clusters[0]?.id ?? "";

  if (!canOnboard) {
    return (
      <Alert tone="info">
        {tr("reshamDootViewNote")}
      </Alert>
    );
  }

  return (
    <div>
      <PageHeader
        title={tr("onboardProducer")}
        description={tr("onboardDesc")}
      />
      <Card>
        <ProfileBuilder
          clusters={clusters}
          initial={{ clusterId: presetCluster }}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </Card>
    </div>
  );
}
