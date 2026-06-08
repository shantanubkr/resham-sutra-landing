import type {
  Producer,
  ProducerCategory,
  ProducerCategoryEntry,
  QualityGrade,
  SilkVariety,
} from "@/lib/types";

const LEGACY_CATEGORY_MAP: Record<string, ProducerCategory> = {
  silk_farmer: "farmer",
  dyer: "yarn_dyer",
  weaver: "weaver",
  spinner: "spinner",
  designer: "designer",
  stitcher: "designer",
  machine_operator: "spinner",
  finisher: "yarn_dyer",
  trainer: "designer",
  seller: "weaver",
  aggregator: "farmer",
};

export function normalizeProducerCategory(
  cat: string | ProducerCategory
): ProducerCategory {
  if (
    cat === "farmer" ||
    cat === "cocoon_rearer" ||
    cat === "spinner" ||
    cat === "weaver" ||
    cat === "yarn_dyer" ||
    cat === "designer"
  ) {
    return cat;
  }
  return LEGACY_CATEGORY_MAP[cat] ?? "weaver";
}

export function defaultCategoryEntry(
  category: ProducerCategory,
  silkType: SilkVariety = "eri"
): ProducerCategoryEntry {
  return {
    category,
    silkType,
    quality: "B",
    quantity: 0,
    years: 0,
  };
}

export function syncProducerFromCategoryEntries(
  producer: Producer,
  entries: ProducerCategoryEntry[]
): void {
  const valid = entries.filter((e) => e.category);
  producer.categoryEntries = valid;
  producer.categoryIds = valid.map((e) => e.category);
  const primary =
    producer.primaryCategoryId &&
    valid.some((e) => e.category === producer.primaryCategoryId)
      ? producer.primaryCategoryId
      : valid[0]?.category ?? "weaver";
  producer.primaryCategoryId = primary;
  producer.category = primary;
  const primaryEntry = valid.find((e) => e.category === primary) ?? valid[0];
  producer.yearsOfExperience = primaryEntry?.years ?? 0;
  producer.primaryLivelihood = primaryEntry
    ? `${primaryEntry.silkType} ${primaryEntry.category}`.replace(/_/g, " ")
    : producer.primaryLivelihood;
}

export function migrateCategoryEntries(producer: Producer): ProducerCategoryEntry[] {
  if (producer.categoryEntries?.length) {
    return producer.categoryEntries.map((e) => ({
      ...e,
      category: normalizeProducerCategory(e.category),
      quality: (e.quality ?? "B") as QualityGrade,
      silkType: (e.silkType ?? "eri") as SilkVariety,
      quantity: e.quantity ?? 0,
      years: e.years ?? producer.yearsOfExperience ?? 0,
    }));
  }

  const cats = (producer.categoryIds?.length
    ? producer.categoryIds
    : [producer.category]
  ).map(normalizeProducerCategory);

  const silkGuess: SilkVariety = producer.primaryLivelihood?.toLowerCase().includes("muga")
    ? "muga"
    : producer.primaryLivelihood?.toLowerCase().includes("mulberry")
      ? "mulberry"
      : producer.primaryLivelihood?.toLowerCase().includes("tassar")
        ? "tassar"
        : "eri";

  const qty =
    (producer.monthlyOutput?.silkWovenMeters ?? 0) +
    (producer.monthlyOutput?.produceKg ?? 0) +
    (producer.monthlyOutput?.cocoonsKg ?? 0);

  return [...new Set(cats)].map((category) =>
    defaultCategoryEntry(category, silkGuess)
  ).map((e) => ({
    ...e,
    years: producer.yearsOfExperience ?? 0,
    quantity: qty,
  }));
}

export function producerCategories(producer: Producer): ProducerCategory[] {
  if (producer.categoryEntries?.length) {
    return producer.categoryEntries.map((e) => e.category);
  }
  return producer.categoryIds?.length
    ? producer.categoryIds.map(normalizeProducerCategory)
    : [normalizeProducerCategory(producer.category)];
}
