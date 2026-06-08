"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { useSession } from "@/components/layout/RoleGuard";
import { PageHeader } from "@/components/layout/AppShell";
import {
  ProducerCardView,
  PrintCardButton,
} from "@/components/producer/ProducerCard";
import type { Producer, Training } from "@/lib/types";

export default function ProducerCardPage() {
  const { session } = useSession(true);
  const [producer, setProducer] = useState<Producer | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    if (!session?.user.producerId) return;
    apiFetch<{
      producer: Producer;
      trainings: Training[];
    }>(`/api/producers/${session.user.producerId}`).then((d) => {
      setProducer(d.producer);
      setTrainings(d.trainings);
    });
  }, [session]);

  if (!session?.user.producerId) {
    return (
      <div>
        <PageHeader title="My producer card" />
        <p className="text-muted">
          <a href="/producer/onboard" className="text-foreground">
            Complete your profile
          </a>{" "}
          to generate your card.
        </p>
      </div>
    );
  }

  if (!producer) return <p className="text-muted">Loading…</p>;

  return (
    <div>
      <PageHeader
        title="My producer card"
        description="Your phygital identity — scan QR to view public profile"
        action={<PrintCardButton />}
      />
      <ProducerCardView
        producer={producer}
        trainings={trainings}
        printable
      />
    </div>
  );
}
