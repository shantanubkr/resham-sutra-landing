import {
  buildMarketplaceCatalog,
  getBuyerCluster,
} from "@/lib/buyers/inventory";

/** @deprecated use buildMarketplaceCatalog */
export function buildBuyerCatalog(db: Parameters<typeof buildMarketplaceCatalog>[0]) {
  return buildMarketplaceCatalog(db);
}

export { buildMarketplaceCatalog, getBuyerCluster };
