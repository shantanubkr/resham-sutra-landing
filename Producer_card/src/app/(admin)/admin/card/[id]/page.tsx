"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api-client";
import { PageHeader } from "@/components/layout/AppShell";
import {
  ProducerCardView,
  PrintCardButton,
} from "@/components/producer/ProducerCard";
import type { Producer, Training } from "@/lib/types";

export default function AdminCardPage() {
  const { id } = useParams<{ id: string }>();
  const [producer, setProducer] = useState<Producer | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    apiFetch<{
      producer: Producer;
      trainings: Training[];
    }>(`/api/producers/${id}`).then((d) => {
      setProducer(d.producer);
      setTrainings(d.trainings);
    });
  }, [id]);

  if (!producer) return <p className="text-muted">Loading…</p>;

  return (
    <div>
      <PageHeader
        title="Generate / print card"
        description={`${producer.fullName} · ${producer.producerCode}`}
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
