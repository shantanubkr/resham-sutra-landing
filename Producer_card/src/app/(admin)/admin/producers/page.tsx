"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { PRODUCER_CATEGORIES } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";
import { trCategory } from "@/lib/i18n/translations";
import { PageHeader } from "@/components/layout/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Input, Select } from "@/components/ui/Input";
import type { Producer, Skill } from "@/lib/types";

type EnrichedProducer = Producer & { skills: Skill[]; schemeCount: number };

export default function ProducersListPage() {
  const { locale, tr } = useI18n();
  const [producers, setProducers] = useState<EnrichedProducer[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [village, setVillage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (village) params.set("village", village);
    apiFetch<{ producers: EnrichedProducer[] }>(
      `/api/producers?${params}`
    ).then((d) => setProducers(d.producers));
  }, [search, category, village]);

  const villages = [...new Set(producers.map((p) => p.village))].sort();

  return (
    <div>
      <PageHeader
        title={tr("producerDatabase")}
        description={tr("producerDatabaseDesc")}
        action={
          <Link href="/admin/onboard">
            <span className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white">
              + {tr("onboard")}
            </span>
          </Link>
        }
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Input
          placeholder={tr("searchProducers")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">{tr("allCategories")}</option>
          {PRODUCER_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {trCategory(locale, c.value)}
            </option>
          ))}
        </Select>
        <Select value={village} onChange={(e) => setVillage(e.target.value)}>
          <option value="">{tr("allVillages")}</option>
          {villages.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </Select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">{tr("producer")}</th>
              <th className="px-4 py-3 font-semibold">{tr("colCategory")}</th>
              <th className="px-4 py-3 font-semibold">{tr("colVillage")}</th>
              <th className="px-4 py-3 font-semibold">{tr("schemes")}</th>
              <th className="px-4 py-3 font-semibold">{tr("colActions")}</th>
            </tr>
          </thead>
          <tbody>
            {producers.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.photoUrl}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{p.fullName}</p>
                      <p className="text-xs text-muted">{p.producerCode}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge color="green">{trCategory(locale, p.category)}</Badge>
                </td>
                <td className="px-4 py-3">{p.village}</td>
                <td className="px-4 py-3">{p.schemeCount}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/producers/${p.id}`}
                    className="text-foreground font-medium"
                  >
                    {tr("view")}
                  </Link>
                  {" · "}
                  <Link
                    href={`/admin/card/${p.id}`}
                    className="text-muted"
                  >
                    {tr("producerCard")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {producers.length === 0 && (
          <p className="p-8 text-center text-muted">{tr("noProducersFound")}</p>
        )}
      </div>
    </div>
  );
}
