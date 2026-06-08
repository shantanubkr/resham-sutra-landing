import type {
  Cluster,
  ClusterInventoryItem,
  Database,
  Producer,
  ProducerCategory,
  BuyerProductType,
} from "@/lib/types";
import {
  BUYER_PRODUCT_META,
  getProducerProductVolumes,
  migrateProductType,
  normalizeMonthlyOutput,
} from "@/lib/buyers/products";
import {
  migrateCategoryEntries,
  normalizeProducerCategory,
  syncProducerFromCategoryEntries,
} from "@/lib/producers/category";
import { syncAllSellerFlags } from "@/lib/producers/seller";
import clusterInventorySeed from "@/data/seed/cluster-inventory.json";
import seedClusters from "@/data/seed/clusters.json";
import seedUsers from "@/data/seed/users.json";

const DEFAULT_PRICES: Partial<Record<BuyerProductType, number>> = {
  eri_yarn: 950,
  muga_yarn: 4200,
  mulberry_yarn: 780,
  tassar_yarn: 890,
  eri_fabric: 650,
  muga_fabric: 3200,
  mulberry_fabric: 540,
  tassar_fabric: 580,
  eri_cocoons: 170,
  muga_cocoons: 185,
  mulberry_cocoons: 165,
  tassar_cocoons: 175,
  dyed_finished: 1100,
  stitched_goods: 2400,
};

const OFFLINE_MANAGER_DEFAULTS = [
  "community_resource_person",
  "aggregator",
  "master_trainer",
  "quality_check_officer",
  "packaging_dispatch_manager",
  "accountant",
  "procurement_inventory_manager",
] as const;

function bootstrapClusterInventory(db: Database): ClusterInventoryItem[] {
  const items: ClusterInventoryItem[] = [];
  const now = new Date().toISOString();

  for (const cluster of db.clusters) {
    const dootId = cluster.assignedReshamDootId ?? "system";
    const totals = new Map<BuyerProductType, number>();

    for (const p of db.producers.filter((x) => x.clusterId === cluster.id)) {
      const vols = getProducerProductVolumes(p, []);
      for (const [type, qty] of Object.entries(vols)) {
        if (!qty || qty <= 0) continue;
        const pt = type as BuyerProductType;
        totals.set(pt, (totals.get(pt) ?? 0) + qty);
      }
    }

    for (const [productType, quantityAvailable] of totals) {
      items.push({
        id: crypto.randomUUID(),
        clusterId: cluster.id,
        productType,
        quantityAvailable: Math.round(quantityAvailable * 10) / 10,
        pricePerUnit: DEFAULT_PRICES[productType] ?? 500,
        isListed: true,
        notes: null,
        updatedBy: dootId,
        updatedAt: now,
      });
    }
  }

  return items;
}

const AGE_GROUP_TO_DOB: Record<string, string> = {
  "18-25": "2000-06-15",
  "26-35": "1992-06-15",
  "36-45": "1982-06-15",
  "46-55": "1972-06-15",
  "55+": "1960-06-15",
};

function migrateCluster(cluster: Cluster): void {
  const legacy = cluster as Cluster & {
    assignedFieldOperatorId?: string | null;
  };
  if (!cluster.assignedReshamDootId && legacy.assignedFieldOperatorId) {
    cluster.assignedReshamDootId = legacy.assignedFieldOperatorId;
  }
  if (!cluster.assignedReshamDootIds?.length && cluster.assignedReshamDootId) {
    cluster.assignedReshamDootIds = [cluster.assignedReshamDootId];
  }
  if (!cluster.assignedReshamDootIds) cluster.assignedReshamDootIds = [];
  if (cluster.assignedClusterHeadId === undefined) {
    cluster.assignedClusterHeadId = null;
  }
  if (!cluster.offlineManagers?.length) {
    cluster.offlineManagers = OFFLINE_MANAGER_DEFAULTS.map((role) => ({
      role,
      name: "",
      contact: "",
    }));
  }
  if (!cluster.district) cluster.district = "Kamrup";
  if (!cluster.state) cluster.state = "Assam";
}

function migrateProducerRecord(producer: Producer, db: Database): void {
  const legacy = producer as Producer & {
    ageGroup?: string;
    categoryIds?: ProducerCategory[];
    primaryCategoryId?: ProducerCategory | null;
    dateOfBirth?: string;
  };

  if (!producer.dateOfBirth) {
    producer.dateOfBirth =
      legacy.ageGroup && AGE_GROUP_TO_DOB[legacy.ageGroup]
        ? AGE_GROUP_TO_DOB[legacy.ageGroup]
        : "1990-01-01";
  }

  if (producer.category) {
    producer.category = normalizeProducerCategory(producer.category);
  }
  if (producer.categoryIds?.length) {
    producer.categoryIds = producer.categoryIds.map(normalizeProducerCategory);
  }
  if (producer.primaryCategoryId) {
    producer.primaryCategoryId = normalizeProducerCategory(
      producer.primaryCategoryId
    );
  }

  producer.categoryEntries = migrateCategoryEntries(producer);
  syncProducerFromCategoryEntries(producer, producer.categoryEntries);

  if (!producer.monthlyOutput) {
    producer.monthlyOutput = {
      silkWovenMeters: 0,
      produceKg: 0,
      cocoonsKg: 0,
      products: {},
    };
  }

  producer.monthlyOutput = normalizeMonthlyOutput(
    producer.monthlyOutput,
    producer,
    []
  );

  if (!producer.skillIds) producer.skillIds = [];
}

function migrateSeedDemoData(db: Database): boolean {
  let changed = false;

  for (const seedUser of seedUsers as Database["users"]) {
    const idx = db.users.findIndex((u) => u.id === seedUser.id);
    if (idx === -1) {
      db.users.push(structuredClone(seedUser));
      changed = true;
      continue;
    }
    const existing = db.users[idx];
    const patch = {
      clusterIds: seedUser.clusterIds,
      staffProfile: seedUser.staffProfile,
      name: seedUser.name,
      email: seedUser.email,
      isActive: seedUser.isActive,
    };
    if (JSON.stringify(existing.clusterIds) !== JSON.stringify(patch.clusterIds)) {
      db.users[idx] = { ...existing, ...patch };
      changed = true;
    } else if (
      JSON.stringify(existing.staffProfile) !== JSON.stringify(patch.staffProfile)
    ) {
      db.users[idx] = { ...existing, staffProfile: patch.staffProfile };
      changed = true;
    }
  }

  for (const seedCluster of seedClusters as Cluster[]) {
    const idx = db.clusters.findIndex((c) => c.id === seedCluster.id);
    if (idx === -1) {
      db.clusters.push(structuredClone(seedCluster));
      changed = true;
      continue;
    }
    const existing = db.clusters[idx];
    if (
      !existing.assignedClusterHeadId &&
      seedCluster.assignedClusterHeadId
    ) {
      db.clusters[idx] = {
        ...existing,
        assignedClusterHeadId: seedCluster.assignedClusterHeadId,
        assignedReshamDootIds: seedCluster.assignedReshamDootIds,
        assignedReshamDootId: seedCluster.assignedReshamDootId,
        offlineManagers: seedCluster.offlineManagers,
        district: seedCluster.district,
        state: seedCluster.state,
        pinCode: seedCluster.pinCode,
      };
      changed = true;
    }
  }

  return changed;
}

export function migrateDatabase(db: Database): Database {
  let seedChanged = migrateSeedDemoData(db);
  if (!db.interestRequests) db.interestRequests = [];
  if (!db.savedListings) db.savedListings = [];
  if (!db.clusterInventory?.length) {
    db.clusterInventory = (clusterInventorySeed as ClusterInventoryItem[]).length
      ? (clusterInventorySeed as ClusterInventoryItem[])
      : bootstrapClusterInventory(db);
  }

  for (const interest of db.interestRequests) {
    const cluster = db.clusters.find((c) => c.id === interest.clusterId);
    if (!interest.clusterName) {
      interest.clusterName = cluster?.name ?? "Unknown cluster";
    }
    if (interest.productType) {
      const migrated = migrateProductType(interest.productType);
      if (migrated) {
        interest.productType = migrated;
        if (!interest.productLabel) {
          interest.productLabel = BUYER_PRODUCT_META[migrated].label;
        }
      }
    }
    if (interest.productType === undefined) interest.productType = null;
    if (interest.productLabel === undefined) interest.productLabel = null;
    const legacy = interest as typeof interest & {
      producerId?: string | null;
      producerName?: string | null;
    };
    if (legacy.producerId === undefined) legacy.producerId = null;
    if (legacy.producerName === undefined) legacy.producerName = null;
    interest.producerId = legacy.producerId ?? null;
    interest.producerName = legacy.producerName ?? null;
  }

  for (const cluster of db.clusters) {
    migrateCluster(cluster);
  }

  for (const listing of db.savedListings) {
    const migrated = migrateProductType(listing.productType);
    if (migrated) listing.productType = migrated;
  }

  for (const producer of db.producers) {
    migrateProducerRecord(producer, db);
  }

  for (const training of db.trainings) {
    if (training.certificationFileUrl === undefined) {
      training.certificationFileUrl = null;
    }
  }

  for (const scheme of db.schemes) {
    const legacy = scheme as typeof scheme & { eligibilityBplRequired?: boolean };
    delete legacy.eligibilityBplRequired;
    if (scheme.eligibilitySkillCategories?.length) {
      const normalized = scheme.eligibilitySkillCategories.map(
        normalizeProducerCategory
      );
      const deduped = [...new Set(normalized)];
      if (deduped.length !== scheme.eligibilitySkillCategories.length) {
        seedChanged = true;
      }
      scheme.eligibilitySkillCategories = deduped;
    }
  }

  for (const user of db.users) {
    if (user.staffProfile === undefined) user.staffProfile = null;
  }

  syncAllSellerFlags(db);

  if (seedChanged) {
    (db as Database & { _migrated?: boolean })._migrated = true;
  }

  return db;
}

export { producerCategories } from "@/lib/producers/category";
