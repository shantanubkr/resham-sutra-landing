"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { useI18n } from "@/lib/i18n/provider";
import { PageHeader } from "@/components/layout/AppShell";
import { ProductionMetricsPanel } from "@/components/admin/ProductionMetricsPanel";
import { ProductListingCard } from "@/components/buyer/ProductListingCard";
import type { BuyerCatalogCluster, BuyerCatalogListing } from "@/lib/types";

export default function BuyerClusterPage() {
  const { id } = useParams<{ id: string }>();
  const [cluster, setCluster] = useState<BuyerCatalogCluster | null>(null);
  const [interestSent, setInterestSent] = useState<Set<string>>(new Set());
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const { tr } = useI18n();

  function listingKey(l: BuyerCatalogListing) {
    return `${l.clusterId}-${l.productType}`;
  }

  useEffect(() => {
    apiFetch<{ cluster: BuyerCatalogCluster }>(`/api/buyers/clusters/${id}`).then(
      (d) => setCluster(d.cluster)
    );
    apiFetch<{ saved: { clusterId: string; productType: string }[] }>(
      "/api/buyers/saved-listings"
    ).then((d) =>
      setSavedKeys(
        new Set(d.saved.map((s) => `${s.clusterId}-${s.productType}`))
      )
    );
  }, [id]);

  async function expressInterest(listing: BuyerCatalogListing) {
    await apiFetch("/api/interest", {
      method: "POST",
      body: JSON.stringify({
        clusterId: listing.clusterId,
        productType: listing.productType,
      }),
    });
    setInterestSent((prev) => new Set([...prev, listingKey(listing)]));
  }

  async function saveListing(listing: BuyerCatalogListing) {
    await apiFetch("/api/buyers/saved-listings", {
      method: "POST",
      body: JSON.stringify({
        clusterId: listing.clusterId,
        productType: listing.productType,
      }),
    });
    setSavedKeys((prev) => new Set([...prev, listingKey(listing)]));
  }

  if (!cluster) {
    return <p className="text-muted">{tr("loading")}</p>;
  }

  return (
    <div>
      <nav className="mb-4 text-sm text-muted">
        <Link href="/buyer/search" className="text-info hover:underline">
          {tr("browseProduce")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{cluster.name}</span>
      </nav>

      <PageHeader
        title={cluster.name}
        description={cluster.villageNames.join(", ")}
      />

      <div className="mb-8">
        <ProductionMetricsPanel production={cluster.production} />
      </div>

      <h2 className="mb-4 text-lg font-bold">{tr("productsToBuy")}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cluster.listings.map((l) => (
          <ProductListingCard
            key={listingKey(l)}
            listing={l}
            interestSent={interestSent.has(listingKey(l))}
            saved={savedKeys.has(listingKey(l))}
            onExpressInterest={() => expressInterest(l)}
            onSave={() => saveListing(l)}
          />
        ))}
        {cluster.listings.length === 0 && (
          <p className="col-span-full text-muted">{tr("noProductsInCluster")}</p>
        )}
      </div>
    </div>
  );
}
