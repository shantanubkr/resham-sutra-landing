"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { useSession } from "@/components/layout/RoleGuard";
import { PageHeader } from "@/components/layout/AppShell";
import { categoryLabel, incomeLabel } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Alert, InlineMessage } from "@/components/ui/Alert";
import { Textarea } from "@/components/ui/Input";
import { useI18n } from "@/lib/i18n/provider";
import type { Producer, Skill, Training } from "@/lib/types";

export default function ProducerProfilePage() {
  const { session } = useSession(true);
  const { tr } = useI18n();
  const [producer, setProducer] = useState<Producer | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!session?.user.producerId) return;
    apiFetch<{
      producer: Producer;
      skills: Skill[];
      trainings: Training[];
    }>(`/api/producers/${session.user.producerId}`).then((d) => {
      setProducer(d.producer);
      setSkills(d.skills);
      setTrainings(d.trainings);
    });
  }, [session]);

  async function requestEdit() {
    if (!session?.user.producerId) return;
    await apiFetch(`/api/producers/${session.user.producerId}`, {
      method: "PATCH",
      body: JSON.stringify({ editRequestNotes: notes, editRequestPending: true }),
    });
    setSubmitted(true);
  }

  if (!session?.user.producerId) {
    return (
      <div>
        <PageHeader title={tr("myProfileTitle")} />
        <Card>
          <p className="text-muted">{tr("noProducerLinked")}</p>
        </Card>
      </div>
    );
  }

  if (!producer) return <p className="text-muted">{tr("loading")}</p>;

  return (
    <div>
      <PageHeader title={tr("myProfileTitle")} description={producer.producerCode} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-semibold">{tr("identitySection")}</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">{tr("nameLabel")}</dt>
              <dd className="font-medium">{producer.fullName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{tr("colCategory")}</dt>
              <dd>{categoryLabel(producer.category)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{tr("villageLabel")}</dt>
              <dd>{producer.village}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{tr("phoneLabel")}</dt>
              <dd>{producer.phone}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted">{tr("coreFieldsNote")}</p>
        </Card>
        <Card>
          <h2 className="mb-4 font-semibold">{tr("incomeHouseholdSection")}</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">{tr("incomeLabel")}</dt>
              <dd>{incomeLabel(producer.incomeBaseline)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{tr("household")}</dt>
              <dd>
                {producer.householdSize}{" "}
                {producer.householdSize === 1 ? "member" : "members"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{tr("dateOfBirth")}</dt>
              <dd>
                {new Date(producer.dateOfBirth).toLocaleDateString("en-IN")}
              </dd>
            </div>
          </dl>
          <h3 className="mb-2 mt-4 font-medium">{tr("skills")}</h3>
          <div className="flex flex-wrap gap-1">
            {skills.map((s) => (
              <Badge key={s.id} color="green">
                {s.name}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
      {trainings.length > 0 && (
        <Card className="mt-6">
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
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}
      <Card className="mt-6">
        <h2 className="mb-2 font-semibold">{tr("requestEditTitle")}</h2>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={tr("editNotesPlaceholder")}
        />
        <Button variant="green" className="mt-3" onClick={requestEdit} disabled={submitted}>
          {tr("submitEditRequest")}
        </Button>
        {submitted && (
          <Alert tone="success" className="mt-2">
            {tr("editRequestSuccess")}
          </Alert>
        )}
      </Card>
    </div>
  );
}
