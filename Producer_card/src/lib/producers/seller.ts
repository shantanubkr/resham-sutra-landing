import { getProducerProductVolumes } from "@/lib/buyers/products";
import type { BuyerProductType, Database } from "@/lib/types";

/** Seller = producer has listed inventory matching their monthly output */
export function syncSellerFlagsForCluster(db: Database, clusterId: string): void {
  const listedTypes = new Set(
    (db.clusterInventory ?? [])
      .filter((i) => i.clusterId === clusterId && i.isListed)
      .map((i) => i.productType)
  );

  for (const producer of db.producers.filter((p) => p.clusterId === clusterId)) {
    const vols = getProducerProductVolumes(producer, []);
    const hasListedProduct = Object.entries(vols).some(
      ([type, qty]) =>
        (qty ?? 0) > 0 && listedTypes.has(type as BuyerProductType)
    );
    producer.isSeller = hasListedProduct;
  }
}

export function syncAllSellerFlags(db: Database): void {
  for (const cluster of db.clusters) {
    syncSellerFlagsForCluster(db, cluster.id);
  }
}
