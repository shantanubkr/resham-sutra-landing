import { BUYER_PRODUCT_META, getProducerProductVolumes } from "@/lib/buyers/products";
import type {
  BuyerCatalogCluster,
  BuyerCatalogListing,
  BuyerProductType,
  ClusterInventoryItem,
  Database,
} from "@/lib/types";
import { computeMetrics } from "@/lib/auth/guards";

export type CatalogSort = "price_asc" | "price_desc" | "qty_desc" | "name";

function artisanCountForProduct(
  db: Database,
  clusterId: string,
  productType: BuyerProductType
): number {
  let count = 0;
  for (const p of db.producers.filter((x) => x.clusterId === clusterId)) {
    const skillNames = p.skillIds
      .map((id) => db.skills.find((s) => s.id === id)?.name ?? "")
      .filter(Boolean);
    const vol = getProducerProductVolumes(p, skillNames)[productType];
    if (vol && vol > 0) count++;
  }
  return count;
}

export function inventoryToListing(
  db: Database,
  item: ClusterInventoryItem
): BuyerCatalogListing | null {
  if (!item.isListed || item.quantityAvailable <= 0) return null;
  const cluster = db.clusters.find((c) => c.id === item.clusterId);
  if (!cluster) return null;
  const meta = BUYER_PRODUCT_META[item.productType];
  return {
    id: `${item.clusterId}-${item.productType}`,
    inventoryId: item.id,
    clusterId: item.clusterId,
    clusterName: cluster.name,
    villageNames: cluster.villageNames,
    productType: item.productType,
    productLabel: meta.label,
    productGroup: meta.group,
    unit: meta.unit,
    quantityAvailable: item.quantityAvailable,
    pricePerUnit: item.pricePerUnit,
    artisanCount: artisanCountForProduct(db, item.clusterId, item.productType),
  };
}

export function buildMarketplaceCatalog(db: Database): {
  clusters: BuyerCatalogCluster[];
  listings: BuyerCatalogListing[];
} {
  const listings: BuyerCatalogListing[] = [];
  const clusterMap = new Map<string, BuyerCatalogListing[]>();

  for (const item of db.clusterInventory ?? []) {
    const listing = inventoryToListing(db, item);
    if (!listing) continue;
    listings.push(listing);
    const arr = clusterMap.get(item.clusterId) ?? [];
    arr.push(listing);
    clusterMap.set(item.clusterId, arr);
  }

  const clusters: BuyerCatalogCluster[] = db.clusters.map((cluster) => {
    const doot = cluster.assignedReshamDootId
      ? db.users.find((u) => u.id === cluster.assignedReshamDootId)
      : null;
    const clusterListings = clusterMap.get(cluster.id) ?? [];
    const producers = db.producers.filter((p) => p.clusterId === cluster.id);
    return {
      id: cluster.id,
      name: cluster.name,
      villageNames: cluster.villageNames,
      reshamDootName: doot?.name ?? null,
      artisanCount: producers.length,
      listings: clusterListings.sort((a, b) =>
        a.productLabel.localeCompare(b.productLabel)
      ),
      production: computeMetrics(db, [cluster.id]).production,
    };
  });

  listings.sort((a, b) => a.productLabel.localeCompare(b.productLabel));

  return { clusters, listings };
}

export function filterAndSortListings(
  listings: BuyerCatalogListing[],
  opts: {
    clusterId?: string | null;
    productType?: BuyerProductType | null;
    productGroup?: string | null;
    search?: string;
    minPrice?: number | null;
    maxPrice?: number | null;
    sort?: CatalogSort | null;
  }
): BuyerCatalogListing[] {
  let result = [...listings];

  if (opts.clusterId) {
    result = result.filter((l) => l.clusterId === opts.clusterId);
  }
  if (opts.productType) {
    result = result.filter((l) => l.productType === opts.productType);
  }
  if (opts.productGroup) {
    result = result.filter((l) => l.productGroup === opts.productGroup);
  }
  if (opts.minPrice != null && opts.minPrice > 0) {
    result = result.filter((l) => l.pricePerUnit >= opts.minPrice!);
  }
  if (opts.maxPrice != null && opts.maxPrice > 0) {
    result = result.filter((l) => l.pricePerUnit <= opts.maxPrice!);
  }
  if (opts.search) {
    const q = opts.search.toLowerCase();
    result = result.filter(
      (l) =>
        l.productLabel.toLowerCase().includes(q) ||
        l.clusterName.toLowerCase().includes(q) ||
        l.villageNames.some((v) => v.toLowerCase().includes(q))
    );
  }

  switch (opts.sort) {
    case "price_asc":
      result.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
      break;
    case "price_desc":
      result.sort((a, b) => b.pricePerUnit - a.pricePerUnit);
      break;
    case "qty_desc":
      result.sort((a, b) => b.quantityAvailable - a.quantityAvailable);
      break;
    case "name":
    default:
      result.sort((a, b) => a.productLabel.localeCompare(b.productLabel));
      break;
  }

  return result;
}

export function getBuyerCluster(
  db: Database,
  clusterId: string
): BuyerCatalogCluster | null {
  const { clusters } = buildMarketplaceCatalog(db);
  return clusters.find((c) => c.id === clusterId) ?? null;
}

export function canViewClusterInventory(
  user: { role: string; clusterIds: string[] },
  clusterId: string
): boolean {
  if (user.role === "admin") return true;
  if (user.role === "cluster_head" || user.role === "field_operator") {
    return user.clusterIds.includes(clusterId);
  }
  return false;
}

export function canManageClusterInventory(
  user: { role: string; clusterIds: string[] },
  clusterId: string
): boolean {
  if (user.role === "admin") return true;
  if (user.role === "cluster_head") {
    return user.clusterIds.length === 1 && user.clusterIds[0] === clusterId;
  }
  return false;
}
