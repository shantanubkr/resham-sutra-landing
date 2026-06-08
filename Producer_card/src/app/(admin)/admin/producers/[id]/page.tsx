"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { useI18n } from "@/lib/i18n/provider";
import { PageHeader } from "@/components/layout/AppShell";
import {
  ProfileBuilder,
  type ProfileFormData,
} from "@/components/producer/ProfileBuilder";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Input";
import type { Cluster, Producer, Scheme, Training } from "@/lib/types";

export default function ProducerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { tr } = useI18n();
  const [producer, setProducer] = useState<Producer | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [schemes, setSchemes] = useState<(Scheme & { taggedBy: string })[]>([]);
  const [allSchemes, setAllSchemes] = useState<Scheme[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [canEdit, setCanEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagSchemeId, setTagSchemeId] = useState("");
  const [clusterName, setClusterName] = useState("");

  function load() {
    apiFetch<{
      producer: Producer;
      trainings: Training[];
      schemes: (Scheme & { taggedBy: string })[];
      canEdit: boolean;
    }>(`/api/producers/${id}`).then((d) => {
      setProducer(d.producer);
      setTrainings(d.trainings);
      setSchemes(d.schemes);
      setCanEdit(d.canEdit);
      apiFetch<{ clusters: { id: string; name: string }[] }>(
        "/api/clusters"
      ).then((c) => {
        const cluster = c.clusters.find((x) => x.id === d.producer.clusterId);
        setClusterName(cluster?.name ?? tr("clusters"));
      });
    });
    apiFetch<{ schemes: Scheme[] }>("/api/schemes").then((d) =>
      setAllSchemes(d.schemes)
    );
    apiFetch<{ clusters: Cluster[] }>("/api/meta").then((d) =>
      setClusters(d.clusters)
    );
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleSubmit(data: ProfileFormData) {
    setSaving(true);
    await apiFetch(`/api/producers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    setSaving(false);
    load();
  }

  async function tagScheme() {
    if (!tagSchemeId) return;
    await apiFetch(`/api/producers/${id}/schemes`, {
      method: "POST",
      body: JSON.stringify({ schemeId: tagSchemeId }),
    });
    setTagSchemeId("");
    load();
  }

  async function removeScheme(schemeId: string) {
    await apiFetch(`/api/producers/${id}/schemes`, {
      method: "POST",
      body: JSON.stringify({ schemeId, action: "remove" }),
    });
    load();
  }

  if (!producer) return <p className="text-muted">{tr("loading")}</p>;

  const initial: Partial<ProfileFormData> = {
    fullName: producer.fullName,
    phone: producer.phone,
    photoUrl: producer.photoUrl,
    village: producer.village,
    clusterId: producer.clusterId,
    category: producer.category,
    categoryIds: producer.categoryIds,
    primaryCategoryId: producer.primaryCategoryId ?? producer.category,
    categoryEntries: producer.categoryEntries ?? [],
    isSeller: producer.isSeller,
    skillIds: [],
    yearsOfExperience: producer.yearsOfExperience,
    machineAccess: producer.machineAccess,
    growthPathwayNotes: producer.growthPathwayNotes,
    gender: producer.gender,
    dateOfBirth: producer.dateOfBirth,
    householdSize: producer.householdSize,
    dependentsCount: producer.dependentsCount,
    incomeBaseline: producer.incomeBaseline,
    primaryLivelihood: producer.primaryLivelihood,
    monthlyOutput: producer.monthlyOutput ?? {
      silkWovenMeters: 0,
      produceKg: 0,
      cocoonsKg: 0,
    },
  };

  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href="/admin/clusters" className="hover:text-foreground">
          {tr("clusters")}
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/admin/clusters/${producer.clusterId}`}
          className="hover:text-foreground"
        >
          {clusterName || tr("clusters")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{producer.fullName}</span>
      </nav>

      <PageHeader
        title={producer.fullName}
        description={producer.producerCode}
        action={
          <div className="flex gap-2">
            {canEdit && (
              <Link href={`/admin/card/${id}`}>
                <Button variant="green">{tr("generateCard")}</Button>
              </Link>
            )}
            <Link href={`/p/${producer.producerCode}`} target="_blank">
              <Button variant="secondary">{tr("publicProfile")}</Button>
            </Link>
          </div>
        }
      />

      {!canEdit && (
        <Alert tone="info" className="mb-6">
          {tr("reshamDootViewNote")}
        </Alert>
      )}

      {producer.editRequestPending && canEdit && (
        <Alert tone="warning" className="mb-6">
          <strong>{tr("editRequestPending")}:</strong>{" "}
          {producer.editRequestNotes ?? tr("editRequestDefault")}
        </Alert>
      )}

      {producer.isSeller && (
        <p className="mb-4 text-sm font-medium text-success-foreground">
          {tr("colSeller")} — {tr("listed")}
        </p>
      )}

      <Card className="mb-8">
        <ProfileBuilder
          clusters={clusters}
          initial={initial}
          onSubmit={handleSubmit}
          submitting={saving}
          readOnly={!canEdit}
        />
      </Card>

      {canEdit && (
        <Card className="mb-8">
          <h2 className="mb-4 font-semibold">{tr("schemeTags")}</h2>
          <ul className="mb-4 space-y-2">
            {schemes.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
              >
                <span>
                  {s.name}{" "}
                  <Badge color={s.taggedBy === "auto_match" ? "info" : "success"}>
                    {s.taggedBy === "auto_match" ? tr("auto") : tr("manual")}
                  </Badge>
                </span>
                <button
                  type="button"
                  onClick={() => removeScheme(s.id)}
                  className="text-xs text-error hover:underline"
                >
                  {tr("remove")}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <Select
              value={tagSchemeId}
              onChange={(e) => setTagSchemeId(e.target.value)}
              className="flex-1"
            >
              <option value="">{tr("addScheme")}</option>
              {allSchemes
                .filter((s) => !schemes.find((t) => t.id === s.id))
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
            </Select>
            <Button variant="purple" onClick={tagScheme}>
              {tr("tag")}
            </Button>
          </div>
        </Card>
      )}

      <Card>
        <h2 className="mb-4 font-semibold">{tr("trainingLog")}</h2>
        <ul className="space-y-2 text-sm">
          {trainings.map((t) => (
            <li key={t.id}>
              {t.trainingName} — {t.organisation} (
              {new Date(t.dateAttended).toLocaleDateString("en-IN")})
            </li>
          ))}
          {trainings.length === 0 && (
            <li className="text-muted">{tr("noTrainings")}</li>
          )}
        </ul>
      </Card>
    </div>
  );
}
