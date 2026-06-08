"use client";

import { useState } from "react";
import {
  GENDERS,
  INCOME_BASELINES,
  PRODUCER_CATEGORIES,
  QUALITY_GRADES,
  SILK_VARIETIES,
} from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";
import { BUYER_PRODUCT_META } from "@/lib/buyers/products";
import { trCategory, trGender } from "@/lib/i18n/translations";
import { defaultCategoryEntry } from "@/lib/producers/category";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { InlineMessage } from "@/components/ui/Alert";
import { MonthlyOutputFields } from "@/components/producer/MonthlyOutputFields";
import type {
  Cluster,
  ProducerCategory,
  ProducerCategoryEntry,
  ProducerMonthlyOutput,
  QualityGrade,
  SilkVariety,
} from "@/lib/types";

export interface ProfileFormData {
  fullName: string;
  phone: string;
  photoUrl: string;
  village: string;
  clusterId: string;
  category: string;
  categoryIds: string[];
  primaryCategoryId: string;
  categoryEntries: ProducerCategoryEntry[];
  isSeller: boolean;
  skillIds: string[];
  yearsOfExperience: number;
  machineAccess: boolean;
  growthPathwayNotes: string;
  gender: string;
  dateOfBirth: string;
  householdSize: number;
  dependentsCount: number;
  incomeBaseline: string;
  primaryLivelihood: string;
  monthlyOutput: ProducerMonthlyOutput;
}

const defaultMonthlyOutput: ProducerMonthlyOutput = {
  silkWovenMeters: 0,
  produceKg: 0,
  cocoonsKg: 0,
  products: {},
};

const defaultData: ProfileFormData = {
  fullName: "",
  phone: "",
  photoUrl: "",
  village: "",
  clusterId: "",
  category: "weaver",
  categoryIds: ["weaver"],
  primaryCategoryId: "weaver",
  categoryEntries: [defaultCategoryEntry("weaver", "eri")],
  isSeller: false,
  skillIds: [],
  yearsOfExperience: 0,
  machineAccess: false,
  growthPathwayNotes: "",
  gender: "female",
  dateOfBirth: "",
  householdSize: 1,
  dependentsCount: 0,
  incomeBaseline: "below_5k",
  primaryLivelihood: "",
  monthlyOutput: defaultMonthlyOutput,
};

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function syncFromEntries(entries: ProducerCategoryEntry[]) {
  const ids = entries.map((e) => e.category);
  const primary = ids[0] ?? "weaver";
  const primaryEntry = entries.find((e) => e.category === primary) ?? entries[0];
  return {
    categoryEntries: entries,
    categoryIds: ids,
    primaryCategoryId: primary,
    category: primary,
    yearsOfExperience: primaryEntry?.years ?? 0,
    primaryLivelihood: primaryEntry
      ? `${primaryEntry.silkType} ${primaryEntry.category}`.replace(/_/g, " ")
      : "",
  };
}

export function ProfileBuilder({
  clusters,
  initial,
  onSubmit,
  submitting,
  readOnly = false,
}: {
  clusters: Cluster[];
  skills?: unknown[];
  initial?: Partial<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  submitting?: boolean;
  readOnly?: boolean;
}) {
  const { locale, tr } = useI18n();
  const [step, setStep] = useState(0);
  const [photoError, setPhotoError] = useState("");
  const [data, setData] = useState<ProfileFormData>({
    ...defaultData,
    ...initial,
    categoryEntries:
      initial?.categoryEntries?.length
        ? initial.categoryEntries
        : defaultData.categoryEntries,
  });

  function update(partial: Partial<ProfileFormData>) {
    setData((d) => ({ ...d, ...partial }));
  }

  function selectCluster(clusterId: string) {
    const cluster = clusters.find((c) => c.id === clusterId);
    if (!cluster) return;
    update({ clusterId, village: cluster.name });
  }

  function toggleCategory(cat: ProducerCategory) {
    setData((d) => {
      const exists = d.categoryEntries.find((e) => e.category === cat);
      let entries: ProducerCategoryEntry[];
      if (exists) {
        entries = d.categoryEntries.filter((e) => e.category !== cat);
        if (entries.length === 0) entries = [defaultCategoryEntry(cat)];
      } else {
        entries = [...d.categoryEntries, defaultCategoryEntry(cat, "eri")];
      }
      return { ...d, ...syncFromEntries(entries) };
    });
  }

  function updateEntry(
    cat: ProducerCategory,
    patch: Partial<ProducerCategoryEntry>
  ) {
    setData((d) => {
      const entries = d.categoryEntries.map((e) =>
        e.category === cat ? { ...e, ...patch } : e
      );
      return { ...d, ...syncFromEntries(entries) };
    });
  }

  async function handlePhotoFile(file: File | null) {
    if (!file) return;
    const url = await readFileAsDataUrl(file);
    update({ photoUrl: url });
    setPhotoError("");
  }

  async function handleSubmit() {
    if (!data.photoUrl) {
      setPhotoError(tr("photoRequired"));
      return;
    }
    if (!data.dateOfBirth) return;
    await onSubmit({ ...data, isSeller: false, skillIds: [] });
  }

  const steps = [
    tr("stepIdentity"),
    tr("stepWork"),
    tr("stepPersonal"),
    tr("production"),
    tr("stepReview"),
  ];

  const canSubmit =
    data.fullName &&
    data.phone &&
    data.clusterId &&
    data.photoUrl &&
    data.dateOfBirth &&
    data.categoryEntries.length > 0;

  const primaryEntry =
    data.categoryEntries.find((e) => e.category === data.primaryCategoryId) ??
    data.categoryEntries[0];

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8 flex gap-2">
        {steps.map((s, i) => (
          <button
            key={s}
            type="button"
            disabled={readOnly}
            onClick={() => setStep(i)}
            className={`flex-1 rounded-xl py-3 text-center text-sm font-bold transition ${
              i === step
                ? "bg-black text-white shadow-md"
                : i < step
                  ? "bg-success-bg text-success-foreground ring-2 ring-success-border"
                  : "bg-gray-100 text-muted"
            }`}
          >
            <span className="block text-lg">{i + 1}</span>
            <span className="block text-[10px] uppercase tracking-wide mt-0.5">
              {s}
            </span>
          </button>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <Label className="text-base">{tr("uploadPhoto")} *</Label>
            <label className="mt-3 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-8 cursor-pointer hover:border-black transition">
              {data.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.photoUrl}
                  alt=""
                  className="h-32 w-32 rounded-2xl object-cover"
                />
              ) : null}
              <span className={`text-sm font-semibold text-muted ${data.photoUrl ? "mt-3" : ""}`}>
                {tr("tapToAddPhoto")}
              </span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                disabled={readOnly}
                onChange={(e) => handlePhotoFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {photoError && (
              <InlineMessage tone="error" className="mt-2">
                {photoError}
              </InlineMessage>
            )}
          </div>

          <div>
            <Label className="text-base">{tr("fullName")} *</Label>
            <Input
              className="text-lg py-3 mt-1"
              value={data.fullName}
              disabled={readOnly}
              onChange={(e) => update({ fullName: e.target.value })}
              placeholder={tr("fullName")}
            />
          </div>

          <div>
            <Label className="text-base">{tr("phoneLabel")} *</Label>
            <Input
              className="text-lg py-3 mt-1"
              type="tel"
              inputMode="numeric"
              value={data.phone}
              disabled={readOnly}
              onChange={(e) => update({ phone: e.target.value })}
              placeholder="10-digit mobile"
            />
          </div>

          <div>
            <Label className="text-base">{tr("clusterVillage")} *</Label>
            <div className="mt-2 grid gap-2">
              {clusters.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  disabled={readOnly}
                  onClick={() => selectCluster(c.id)}
                  className={`rounded-xl border-2 px-4 py-4 text-left text-lg font-semibold transition ${
                    data.clusterId === c.id
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <p className="text-sm text-muted text-center">{tr("pickCategoriesHint")}</p>

          <div className="grid grid-cols-2 gap-3">
            {PRODUCER_CATEGORIES.map((c) => {
              const selected = data.categoryEntries.some(
                (e) => e.category === c.value
              );
              return (
                <button
                  key={c.value}
                  type="button"
                  disabled={readOnly}
                  onClick={() => toggleCategory(c.value)}
                  className={`rounded-2xl border-2 p-4 text-left transition ${
                    selected
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <span className="block font-bold text-base">
                    {trCategory(locale, c.value)}
                  </span>
                  <span className="mt-1 block text-xs opacity-80">{c.hint}</span>
                </button>
              );
            })}
          </div>

          {data.categoryEntries.map((entry) => (
            <div
              key={entry.category}
              className="rounded-2xl border-2 border-gray-200 bg-white p-4 space-y-4"
            >
              <h3 className="font-bold text-lg">
                {trCategory(locale, entry.category)}
              </h3>

              <div>
                <Label>{tr("silkType")}</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {SILK_VARIETIES.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      disabled={readOnly}
                      onClick={() =>
                        updateEntry(entry.category, { silkType: s.value })
                      }
                      className={`rounded-xl py-3 text-sm font-bold ${
                        entry.silkType === s.value
                          ? "bg-black text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>{tr("qualityGrade")}</Label>
                <div className="mt-2 flex gap-2">
                  {QUALITY_GRADES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      disabled={readOnly}
                      onClick={() =>
                        updateEntry(entry.category, {
                          quality: q as QualityGrade,
                        })
                      }
                      className={`flex-1 rounded-xl py-4 text-xl font-bold ${
                        entry.quality === q
                          ? q === "A"
                            ? "bg-success-bg ring-2 ring-success-border"
                            : q === "B"
                              ? "bg-warning-bg ring-2 ring-warning-border"
                              : "bg-gray-200 ring-2 ring-gray-400"
                          : "bg-gray-50"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{tr("quantityProduced")}</Label>
                  <Input
                    type="number"
                    min={0}
                    className="text-lg py-3 mt-1"
                    disabled={readOnly}
                    value={entry.quantity || ""}
                    onChange={(e) =>
                      updateEntry(entry.category, {
                        quantity: Number(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>{tr("yearsExperience")}</Label>
                  <Input
                    type="number"
                    min={0}
                    className="text-lg py-3 mt-1"
                    disabled={readOnly}
                    value={entry.years || ""}
                    onChange={(e) =>
                      updateEntry(entry.category, {
                        years: Number(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              {data.categoryEntries.length > 1 && (
                <button
                  type="button"
                  disabled={readOnly}
                  onClick={() =>
                    update({
                      primaryCategoryId: entry.category,
                      category: entry.category,
                    })
                  }
                  className={`text-sm font-semibold underline ${
                    data.primaryCategoryId === entry.category
                      ? "text-success-foreground"
                      : "text-muted"
                  }`}
                >
                  {data.primaryCategoryId === entry.category
                    ? `★ ${tr("primaryCategory")}`
                    : tr("setAsPrimary")}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <Label className="text-base">{tr("genderLabel")}</Label>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {GENDERS.slice(0, 2).map((g) => (
                <button
                  key={g.value}
                  type="button"
                  disabled={readOnly}
                  onClick={() => update({ gender: g.value })}
                  className={`rounded-xl py-4 text-lg font-bold ${
                    data.gender === g.value
                      ? "bg-black text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {trGender(locale, g.value)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base">{tr("dateOfBirth")} *</Label>
            <Input
              type="date"
              className="text-lg py-3 mt-1"
              disabled={readOnly}
              value={data.dateOfBirth}
              onChange={(e) => update({ dateOfBirth: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{tr("householdSize")}</Label>
              <Input
                type="number"
                min={1}
                className="text-lg py-3 mt-1"
                disabled={readOnly}
                value={data.householdSize}
                onChange={(e) =>
                  update({ householdSize: Number(e.target.value) || 1 })
                }
              />
            </div>
            <div>
              <Label>{tr("dependents")}</Label>
              <Input
                type="number"
                min={0}
                className="text-lg py-3 mt-1"
                disabled={readOnly}
                value={data.dependentsCount}
                onChange={(e) =>
                  update({ dependentsCount: Number(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          <div>
            <Label>{tr("incomeBaseline")}</Label>
            <Select
              className="text-base py-3 mt-1"
              disabled={readOnly}
              value={data.incomeBaseline}
              onChange={(e) => update({ incomeBaseline: e.target.value })}
            >
              {INCOME_BASELINES.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </Select>
          </div>

          <label className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
            <input
              type="checkbox"
              className="h-5 w-5"
              disabled={readOnly}
              checked={data.machineAccess}
              onChange={(e) => update({ machineAccess: e.target.checked })}
            />
            <span className="text-base font-medium">{tr("hasMachineAccess")}</span>
          </label>
        </div>
      )}

      {step === 3 && (
        <MonthlyOutputFields
          value={data.monthlyOutput}
          onChange={(monthlyOutput) => update({ monthlyOutput })}
          primaryCategory={data.primaryCategoryId}
          silkType={primaryEntry?.silkType ?? "eri"}
          readOnly={readOnly}
        />
      )}

      {step === 4 && (
        <div className="space-y-4 rounded-2xl bg-white border-2 border-gray-200 p-6 text-base">
          <div className="flex items-center gap-4">
            {data.photoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.photoUrl}
                alt=""
                className="h-20 w-20 rounded-xl object-cover"
              />
            )}
            <div>
              <p className="text-xl font-bold">{data.fullName}</p>
              <p className="text-muted">{data.village}</p>
            </div>
          </div>
          {data.categoryEntries.map((e) => (
            <div key={e.category} className="rounded-xl bg-gray-50 p-3">
              <p className="font-bold">{trCategory(locale, e.category)}</p>
              <p className="text-sm text-muted">
                {e.silkType} · {tr("qualityGrade")} {e.quality} · {e.quantity}{" "}
                · {e.years} {tr("yearsUnit")}
              </p>
            </div>
          ))}
          <p>
            <strong>{tr("monthlyOutput")}:</strong>{" "}
            {Object.entries(data.monthlyOutput.products ?? {})
              .filter(([, v]) => v && v > 0)
              .map(
                ([type, vol]) =>
                  `${BUYER_PRODUCT_META[type as keyof typeof BUYER_PRODUCT_META].label}: ${vol}`
              )
              .join(" · ") || tr("notReportedYet")}
          </p>
        </div>
      )}

      {!readOnly && (
        <div className="mt-10 flex justify-between gap-4">
          <Button
            variant="secondary"
            type="button"
            className="flex-1 py-4 text-base"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            ← {tr("back")}
          </Button>
          {step < 4 ? (
            <Button
              type="button"
              variant="green"
              className="flex-1 py-4 text-base font-bold"
              onClick={() => setStep((s) => s + 1)}
            >
              {tr("next")} →
            </Button>
          ) : (
            <Button
              type="button"
              variant="green"
              className="flex-1 py-4 text-base font-bold"
              disabled={submitting || !canSubmit}
              onClick={handleSubmit}
            >
              {submitting ? tr("saving") : tr("submitProfile")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
