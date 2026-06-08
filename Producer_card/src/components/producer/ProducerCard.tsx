"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { categoryLabel, SILK_VARIETIES } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";
import type { Producer, ProducerCategoryEntry, Training } from "@/lib/types";

interface ProducerCardProps {
  producer: Producer;
  categoryEntries?: ProducerCategoryEntry[];
  trainings?: Training[];
  publicUrl?: string;
  printable?: boolean;
}

function silkLabel(type: string) {
  return SILK_VARIETIES.find((s) => s.value === type)?.label ?? type;
}

export function ProducerCardView({
  producer,
  categoryEntries,
  trainings = [],
  publicUrl,
  printable = false,
}: ProducerCardProps) {
  const { tr } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrReady, setQrReady] = useState(false);
  const entries = categoryEntries ?? producer.categoryEntries ?? [];
  const url =
    publicUrl ??
    (typeof window !== "undefined"
      ? `${window.location.origin}/p/${producer.producerCode}`
      : `/p/${producer.producerCode}`);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, { width: 96, margin: 1 }, () =>
        setQrReady(true)
      );
    }
  }, [url]);

  return (
    <div
      id="producer-card"
      className={`mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-black bg-white shadow-lg ${printable ? "print:shadow-none print:border-black" : ""}`}
    >
      <div className="bg-black px-4 py-3 text-white">
        <p className="text-xs font-bold uppercase tracking-wider opacity-90">
          {tr("reshamSutra")}
        </p>
        <p className="text-sm font-semibold">{tr("producerIdentityCard")}</p>
      </div>
      <div className="flex gap-4 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={producer.photoUrl}
          alt={producer.fullName}
          className="h-24 w-24 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h2 className="text-lg font-bold">{producer.fullName}</h2>
          <p className="text-sm text-muted">ID: {producer.producerCode}</p>
          <p className="text-sm">{categoryLabel(producer.category)}</p>
          <p className="text-sm text-muted">{producer.village}</p>
          {producer.isSeller && (
            <span className="mt-1 inline-block rounded bg-success-bg px-2 py-0.5 text-xs font-semibold text-success-foreground ring-1 ring-success-border">
              {tr("sellerBadge")}
            </span>
          )}
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-3 text-sm">
        {entries.length > 0 ? (
          <ul className="space-y-1">
            {entries.map((e) => (
              <li key={e.category}>
                <span className="font-medium">{categoryLabel(e.category)}</span>
                {" · "}
                {silkLabel(e.silkType)} · Q{e.quality} · {e.years}y
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <span className="font-medium">{tr("experience")}:</span>{" "}
            {producer.yearsOfExperience} {tr("yearsUnit")}
          </p>
        )}
        {trainings.length > 0 && (
          <p className="mt-2">
            <span className="font-medium">{tr("trainingLog")}:</span>{" "}
            {trainings[0].trainingName}
          </p>
        )}
        <p className="mt-2 text-muted text-xs">
          {new Date(producer.enrolledAt).toLocaleDateString("en-IN")}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
        <canvas
          ref={canvasRef}
          className={qrReady ? "opacity-100" : "opacity-30"}
        />
        <p className="max-w-[120px] text-right text-xs text-muted">
          {tr("scanToViewProfile")}
        </p>
      </div>
    </div>
  );
}

export function PrintCardButton() {
  const { tr } = useI18n();
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
    >
      {tr("printDownloadPdf")}
    </button>
  );
}
