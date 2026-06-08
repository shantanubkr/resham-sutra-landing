"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { categoryLabel } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { ProducerCardView } from "@/components/producer/ProducerCard";
import { useI18n } from "@/lib/i18n/provider";
import type { ProducerCategoryEntry, Scheme, Training } from "@/lib/types";

interface PublicData {
  producerCode: string;
  fullName: string;
  photoUrl: string;
  village: string;
  category: string;
  categoryEntries?: ProducerCategoryEntry[];
  isSeller: boolean;
  yearsOfExperience: number;
  trainings: Training[];
  enrolledAt: string;
  phone?: string;
  schemes?: Scheme[];
  error?: string;
}

export default function PublicProducerPage() {
  const { code } = useParams<{ code: string }>();
  const { tr } = useI18n();
  const [data, setData] = useState<PublicData | null>(null);

  useEffect(() => {
    fetch(`/api/producers/public/${code}`)
      .then((r) => r.json())
      .then(setData);
  }, [code]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted">
        {tr("loading")}
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {tr("producerNotFound")}
      </div>
    );
  }

  // Build a minimal producer object for ProducerCardView
  const cardProducer = {
    id: "",
    userId: null,
    producerCode: data.producerCode,
    fullName: data.fullName,
    photoUrl: data.photoUrl,
    phone: data.phone ?? "",
    village: data.village,
    clusterId: "",
    category: data.category as never,
    categoryIds: [],
    primaryCategoryId: data.category as never,
    categoryEntries: data.categoryEntries ?? [],
    isSeller: data.isSeller,
    gender: "prefer_not_to_say" as const,
    dateOfBirth: "",
    householdSize: 0,
    dependentsCount: 0,
    incomeBaseline: "below_5k" as const,
    primaryLivelihood: "",
    yearsOfExperience: data.yearsOfExperience,
    machineAccess: false,
    growthPathwayNotes: "",
    skillIds: [],
    enrolledBy: null,
    enrolledAt: data.enrolledAt,
    editRequestPending: false,
    editRequestNotes: null,
    monthlyOutput: { silkWovenMeters: 0, produceKg: 0, cocoonsKg: 0 },
    createdAt: data.enrolledAt,
    updatedAt: data.enrolledAt,
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-lg">
        <p className="mb-6 text-center text-sm text-muted">
          {tr("publicProfileNote")}
        </p>
        <ProducerCardView
          producer={cardProducer}
          categoryEntries={data.categoryEntries}
          trainings={data.trainings}
        />
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold">{tr("aboutSection")}</h2>
          <p className="mt-2 text-sm">
            {categoryLabel(data.category)} — {data.village} ·{" "}
            {data.yearsOfExperience} {tr("yearsUnit")} {tr("experience").toLowerCase()}
          </p>
          {data.phone && (
            <p className="mt-2 text-sm">
              {tr("contactLabel")}:{" "}
              <a href={`tel:${data.phone}`} className="text-info hover:underline">
                {data.phone}
              </a>
            </p>
          )}
          {data.schemes && data.schemes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium">{tr("matchedSchemes")}</h3>
              <div className="mt-2 flex flex-wrap gap-1">
                {data.schemes.map((s) => (
                  <Badge key={s.id} color="purple">
                    {s.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="mt-8 text-center">
          <a href="/" className="text-sm text-foreground hover:underline">
            {tr("backToSystem")}
          </a>
        </p>
      </div>
    </div>
  );
}
