"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { useI18n } from "@/lib/i18n/provider";
import { PageHeader } from "@/components/layout/AppShell";
import { ProductThumbnail } from "@/components/buyer/ProductThumbnail";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { semanticStyles } from "@/lib/ui/semantic";
import type { BuyerCatalogListing, BuyerProductType } from "@/lib/types";

interface SavedItem {
  id: string;
  clusterId: string;
  productType: string;
  clusterName: string;
  productLabel: string;
  notes: string | null;
  listing: BuyerCatalogListing | null;
}

export default function SavedListingsPage() {
  const [saved, setSaved] = useState<SavedItem[]>([]);
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});
  const { tr } = useI18n();

  function itemKey(s: SavedItem) {
    return `${s.clusterId}-${s.productType}`;
  }

  function load() {
    apiFetch<{ saved: SavedItem[] }>("/api/buyers/saved-listings").then((d) => {
      setSaved(d.saved);
      const notes: Record<string, string> = {};
      d.saved.forEach((s) => {
        notes[itemKey(s)] = s.notes ?? "";
      });
      setEditingNotes(notes);
    });
  }

  useEffect(() => {
    load();
  }, []);

  async function updateNotes(item: SavedItem) {
    await apiFetch("/api/buyers/saved-listings", {
      method: "POST",
      body: JSON.stringify({
        clusterId: item.clusterId,
        productType: item.productType,
        notes: editingNotes[itemKey(item)],
      }),
    });
    load();
  }

  async function remove(item: SavedItem) {
    await apiFetch(
      `/api/buyers/saved-listings?clusterId=${item.clusterId}&productType=${item.productType}`,
      { method: "DELETE" }
    );
    load();
  }

  return (
    <div>
      <PageHeader
        title={tr("savedListings")}
        description={tr("savedListingsDesc")}
      />
      <div className="space-y-4">
        {saved.map((s) => (
          <div
            key={s.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="flex flex-col sm:flex-row">
              <ProductThumbnail
                productType={s.productType as BuyerProductType}
                className="aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:h-auto sm:w-36"
                compact
              />
              <div className="flex flex-1 flex-col p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{s.productLabel}</h3>
                    <Link
                      href={`/buyer/clusters/${s.clusterId}`}
                      className={`text-sm ${semanticStyles.info.link}`}
                    >
                      {s.clusterName}
                    </Link>
                    {s.listing && (
                      <p className="mt-1 text-sm tabular-nums">
                        <span className="font-semibold">
                          ₹{s.listing.pricePerUnit.toLocaleString("en-IN")}
                        </span>
                        <span className="text-muted">
                          {" "}
                          / {s.listing.unit.split("/")[0]} ·{" "}
                          {s.listing.quantityAvailable.toLocaleString("en-IN")}{" "}
                          {s.listing.unit.split("/")[0]}
                        </span>
                      </p>
                    )}
                  </div>
                  <Link href="/buyer/search">
                    <Button variant="secondary" className="text-xs">
                      {tr("browseProduce")}
                    </Button>
                  </Link>
                </div>
                <Textarea
                  className="mt-3"
                  value={editingNotes[itemKey(s)] ?? ""}
                  onChange={(e) =>
                    setEditingNotes({
                      ...editingNotes,
                      [itemKey(s)]: e.target.value,
                    })
                  }
                  placeholder={tr("privateNotes")}
                  rows={2}
                />
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="purple"
                    className="text-xs"
                    onClick={() => updateNotes(s)}
                  >
                    {tr("saveNotes")}
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-xs text-error hover:bg-error-bg"
                    onClick={() => remove(s)}
                  >
                    {tr("remove")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {saved.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-muted">
              {tr("noSavedListings")}{" "}
              <Link href="/buyer/search" className={semanticStyles.info.link}>
                {tr("browseProduce")}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
