"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { BUYER_PRODUCT_GROUPS, productsByGroup } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";
import { PageHeader } from "@/components/layout/AppShell";
import { ProductListingCard } from "@/components/buyer/ProductListingCard";
import {
  ClusterSnapshotCard,
  clusterFromBuyer,
} from "@/components/charts/ClusterSnapshotCard";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import type { BuyerCatalogCluster, BuyerCatalogListing } from "@/lib/types";

type SortOption = "name" | "price_asc" | "price_desc" | "qty_desc";

export default function BuyerBrowsePage() {
  const [listings, setListings] = useState<BuyerCatalogListing[]>([]);
  const [clusters, setClusters] = useState<BuyerCatalogCluster[]>([]);
  const [search, setSearch] = useState("");
  const [productType, setProductType] = useState("");
  const [productGroup, setProductGroup] = useState("");
  const [clusterId, setClusterId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortOption>("name");
  const [view, setView] = useState<"products" | "clusters">("products");
  const [interestSent, setInterestSent] = useState<Set<string>>(new Set());
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const { tr } = useI18n();

  function listingKey(l: BuyerCatalogListing) {
    return `${l.clusterId}-${l.productType}`;
  }

  useEffect(() => {
    apiFetch<{ saved: { clusterId: string; productType: string }[] }>(
      "/api/buyers/saved-listings"
    ).then((d) =>
      setSavedKeys(
        new Set(d.saved.map((s) => `${s.clusterId}-${s.productType}`))
      )
    );
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (productType) params.set("productType", productType);
    if (productGroup) params.set("productGroup", productGroup);
    if (clusterId) params.set("clusterId", clusterId);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sort) params.set("sort", sort);
    apiFetch<{ listings: BuyerCatalogListing[]; clusters: BuyerCatalogCluster[] }>(
      `/api/buyers/catalog?${params}`
    ).then((d) => {
      setListings(d.listings);
      setClusters(d.clusters);
    });
  }, [search, productType, productGroup, clusterId, minPrice, maxPrice, sort]);

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

  return (
    <div>
      <PageHeader
        title={tr("browseProduce")}
        description={tr("browseProduceDesc")}
      />

      <div className="mb-4 flex gap-2">
        <Button
          variant={view === "products" ? "purple" : "secondary"}
          className="text-sm"
          onClick={() => setView("products")}
        >
          {tr("byProduct")}
        </Button>
        <Button
          variant={view === "clusters" ? "purple" : "secondary"}
          className="text-sm"
          onClick={() => setView("clusters")}
        >
          {tr("byCluster")}
        </Button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder={tr("searchProducts")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:col-span-2"
        />
        <Select
          value={productGroup}
          onChange={(e) => {
            setProductGroup(e.target.value);
            setProductType("");
          }}
        >
          <option value="">{tr("allProductGroups")}</option>
          {BUYER_PRODUCT_GROUPS.map((g) => (
            <option key={g.id} value={g.id}>
              {g.label}
            </option>
          ))}
        </Select>
        <Select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          <option value="">{tr("allProducts")}</option>
          {BUYER_PRODUCT_GROUPS.filter(
            (g) => !productGroup || g.id === productGroup
          ).map((group) => (
            <optgroup key={group.id} label={group.label}>
              {productsByGroup(group.id).map((p) => (
                <option key={p.type} value={p.type}>
                  {p.label}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
        <Select value={clusterId} onChange={(e) => setClusterId(e.target.value)}>
          <option value="">{tr("allClusters")}</option>
          {clusters.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
        <Input
          type="number"
          min={0}
          placeholder={tr("minPrice")}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <Input
          type="number"
          min={0}
          placeholder={tr("maxPrice")}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <Select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}>
          <option value="name">{tr("sortName")}</option>
          <option value="price_asc">{tr("sortPriceLow")}</option>
          <option value="price_desc">{tr("sortPriceHigh")}</option>
          <option value="qty_desc">{tr("sortQuantity")}</option>
        </Select>
      </div>

      {view === "products" ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((l) => (
            <ProductListingCard
              key={listingKey(l)}
              listing={l}
              interestSent={interestSent.has(listingKey(l))}
              saved={savedKeys.has(listingKey(l))}
              onExpressInterest={() => expressInterest(l)}
              onSave={() => saveListing(l)}
            />
          ))}
          {listings.length === 0 && (
            <p className="col-span-full text-center text-muted">
              {tr("noProductsFound")}
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {clusters.map((c) => (
            <ClusterSnapshotCard
              key={c.id}
              cluster={clusterFromBuyer(c)}
              href={`/buyer/clusters/${c.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
