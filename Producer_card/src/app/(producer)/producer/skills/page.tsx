"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { useSession } from "@/components/layout/RoleGuard";
import { PageHeader } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InlineMessage } from "@/components/ui/Alert";
import { semanticStyles } from "@/lib/ui/semantic";
import { Input, Label } from "@/components/ui/Input";
import { useI18n } from "@/lib/i18n/provider";
import type { Training } from "@/lib/types";

export default function ProducerSkillsPage() {
  const { session } = useSession(true);
  const { tr } = useI18n();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [form, setForm] = useState({
    trainingName: "",
    organisation: "",
    dateAttended: "",
    durationDays: 1,
    certificationText: "",
    certificationFileUrl: null as string | null,
  });
  const [adding, setAdding] = useState(false);

  function handleCertFile(file: File | null) {
    if (!file) {
      setForm((f) => ({ ...f, certificationFileUrl: null }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({
        ...f,
        certificationFileUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  }

  function load() {
    if (!session?.user.producerId) return;
    apiFetch<{ trainings: Training[] }>(
      `/api/producers/${session.user.producerId}/trainings`
    ).then((d) => setTrainings(d.trainings));
  }

  useEffect(() => {
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function addTraining(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user.producerId) return;
    setAdding(true);
    await apiFetch(`/api/producers/${session.user.producerId}/trainings`, {
      method: "POST",
      body: JSON.stringify(form),
    });
    setForm({
      trainingName: "",
      organisation: "",
      dateAttended: "",
      durationDays: 1,
      certificationText: "",
      certificationFileUrl: null,
    });
    setAdding(false);
    load();
  }

  return (
    <div>
      <PageHeader
        title={tr("skillsAndTraining")}
        description={tr("skillsAndTrainingDesc")}
      />
      <Card className="mb-6">
        <h2 className="mb-4 font-semibold">{tr("trainingLog")}</h2>
        <ul className="space-y-2 text-sm">
          {trainings.map((t) => (
            <li key={t.id} className="rounded-lg bg-gray-50 px-3 py-2">
              <strong>{t.trainingName}</strong> — {t.organisation}
              <br />
              <span className="text-muted">
                {new Date(t.dateAttended).toLocaleDateString("en-IN")} ·{" "}
                {t.durationDays}{" "}
                {t.durationDays === 1 ? "day" : "days"}
                {t.certificationText && ` · ${t.certificationText}`}
                {t.certificationFileUrl && (
                  <>
                    {" · "}
                    <a
                      href={t.certificationFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={semanticStyles.info.link}
                    >
                      {tr("viewCertificate")}
                    </a>
                  </>
                )}
              </span>
            </li>
          ))}
          {trainings.length === 0 && (
            <li className="text-muted">{tr("noTrainingsYet")}</li>
          )}
        </ul>
      </Card>
      <Card>
        <h2 className="mb-4 font-semibold">{tr("addTrainingTitle")}</h2>
        <form onSubmit={addTraining} className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>{tr("trainingNameLabel")}</Label>
            <Input
              value={form.trainingName}
              onChange={(e) =>
                setForm({ ...form, trainingName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>{tr("organisationLabel")}</Label>
            <Input
              value={form.organisation}
              onChange={(e) =>
                setForm({ ...form, organisation: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>{tr("dateAttendedLabel")}</Label>
            <Input
              type="date"
              value={form.dateAttended}
              onChange={(e) =>
                setForm({ ...form, dateAttended: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>{tr("durationDaysLabel")}</Label>
            <Input
              type="number"
              min={1}
              value={form.durationDays}
              onChange={(e) =>
                setForm({ ...form, durationDays: Number(e.target.value) })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Label>{tr("certTextLabel")}</Label>
            <Input
              value={form.certificationText}
              onChange={(e) =>
                setForm({ ...form, certificationText: e.target.value })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Label>{tr("certFileLabel")}</Label>
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                handleCertFile(e.target.files?.[0] ?? null)
              }
            />
            {form.certificationFileUrl && (
              <InlineMessage tone="success" className="mt-1 text-xs">
                {tr("fileAttached")}
              </InlineMessage>
            )}
          </div>
          <Button type="submit" variant="green" disabled={adding}>
            {adding ? tr("addingTraining") : tr("addTrainingTitle")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
