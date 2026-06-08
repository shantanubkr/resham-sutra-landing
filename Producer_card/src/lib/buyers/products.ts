import type {
  BuyerProductType,
  Producer,
  ProducerCategory,
  ProducerMonthlyOutput,
} from "@/lib/types";

export type SilkVariety = "eri" | "muga" | "mulberry" | "tassar";

export type BuyerProductGroup = "yarn" | "fabric" | "cocoons" | "finished";

export const BUYER_PRODUCT_GROUPS: { id: BuyerProductGroup; label: string }[] =
  [
    { id: "yarn", label: "Spun yarn" },
    { id: "fabric", label: "Woven fabric" },
    { id: "cocoons", label: "Raw cocoons" },
    { id: "finished", label: "Finished goods" },
  ];

export const BUYER_PRODUCT_META: Record<
  BuyerProductType,
  {
    label: string;
    unit: string;
    description: string;
    group: BuyerProductGroup;
    silkVariety?: SilkVariety;
  }
> = {
  eri_yarn: {
    label: "Eri yarn",
    unit: "kg/month",
    description: "Spun eri (end) silk yarn from local reelers and spinners",
    group: "yarn",
    silkVariety: "eri",
  },
  muga_yarn: {
    label: "Muga yarn",
    unit: "kg/month",
    description: "Golden muga silk yarn — Assam’s premium variety",
    group: "yarn",
    silkVariety: "muga",
  },
  mulberry_yarn: {
    label: "Mulberry yarn",
    unit: "kg/month",
    description: "Mulberry (pat) silk yarn for weaving and export",
    group: "yarn",
    silkVariety: "mulberry",
  },
  tassar_yarn: {
    label: "Tassar yarn",
    unit: "kg/month",
    description: "Tassar (tropical tasar) silk yarn from forest silk",
    group: "yarn",
    silkVariety: "tassar",
  },
  eri_fabric: {
    label: "Eri woven fabric",
    unit: "m/month",
    description: "Handloom eri silk cloth — warm, durable Assam staple",
    group: "fabric",
    silkVariety: "eri",
  },
  muga_fabric: {
    label: "Muga woven fabric",
    unit: "m/month",
    description: "Handwoven muga silk — natural golden lustre",
    group: "fabric",
    silkVariety: "muga",
  },
  mulberry_fabric: {
    label: "Mulberry woven fabric",
    unit: "m/month",
    description: "Mulberry silk fabric from cluster handlooms",
    group: "fabric",
    silkVariety: "mulberry",
  },
  tassar_fabric: {
    label: "Tassar woven fabric",
    unit: "m/month",
    description: "Tassar silk handloom fabric with textured finish",
    group: "fabric",
    silkVariety: "tassar",
  },
  eri_cocoons: {
    label: "Eri cocoons",
    unit: "kg/month",
    description: "Fresh eri cocoons from castor/som host sericulture",
    group: "cocoons",
    silkVariety: "eri",
  },
  muga_cocoons: {
    label: "Muga cocoons",
    unit: "kg/month",
    description: "Muga cocoons from som/somalu plantations",
    group: "cocoons",
    silkVariety: "muga",
  },
  mulberry_cocoons: {
    label: "Mulberry cocoons",
    unit: "kg/month",
    description: "Mulberry silk cocoons from bivoltine sericulture",
    group: "cocoons",
    silkVariety: "mulberry",
  },
  tassar_cocoons: {
    label: "Tassar cocoons",
    unit: "kg/month",
    description: "Tassar cocoons from forest and semi-domesticated rearers",
    group: "cocoons",
    silkVariety: "tassar",
  },
  dyed_finished: {
    label: "Dyed & finished goods",
    unit: "kg/month",
    description: "Naturally dyed and finished yarn, fabric, or yardage",
    group: "finished",
  },
  stitched_goods: {
    label: "Stitched products",
    unit: "kg/month",
    description: "Garments, stoles, and stitched silk products",
    group: "finished",
  },
};

export const BUYER_PRODUCT_TYPES = (
  Object.entries(BUYER_PRODUCT_META) as [
    BuyerProductType,
    (typeof BUYER_PRODUCT_META)[BuyerProductType],
  ][]
).map(([type, meta]) => ({ type, ...meta }));

const FABRIC_TYPES: BuyerProductType[] = [
  "eri_fabric",
  "muga_fabric",
  "mulberry_fabric",
  "tassar_fabric",
];
const YARN_TYPES: BuyerProductType[] = [
  "eri_yarn",
  "muga_yarn",
  "mulberry_yarn",
  "tassar_yarn",
];
const COCOON_TYPES: BuyerProductType[] = [
  "eri_cocoons",
  "muga_cocoons",
  "mulberry_cocoons",
  "tassar_cocoons",
];

const LEGACY_PRODUCT_MAP: Record<string, BuyerProductType> = {
  woven_silk: "eri_fabric",
  yarn: "eri_yarn",
  cocoons: "eri_cocoons",
};

export function migrateProductType(
  type: string | null | undefined
): BuyerProductType | null {
  if (!type) return null;
  if (type in BUYER_PRODUCT_META) return type as BuyerProductType;
  return LEGACY_PRODUCT_MAP[type] ?? null;
}

export function productsForCategory(
  category: ProducerCategory | string
): BuyerProductType[] {
  switch (category) {
    case "weaver":
      return FABRIC_TYPES;
    case "spinner":
      return YARN_TYPES;
    case "farmer":
    case "cocoon_rearer":
    case "silk_farmer":
      return COCOON_TYPES;
    case "yarn_dyer":
    case "dyer":
    case "finisher":
      return ["dyed_finished"];
    case "designer":
      return [...FABRIC_TYPES, "dyed_finished"];
    case "stitcher":
      return ["stitched_goods"];
    default:
      return [...YARN_TYPES, ...FABRIC_TYPES];
  }
}

export function productsForSilkType(
  silkType: SilkVariety,
  category: ProducerCategory | string
): BuyerProductType[] {
  const base = productsForCategory(category);
  return base.filter((t) => {
    const meta = BUYER_PRODUCT_META[t];
    return !meta.silkVariety || meta.silkVariety === silkType;
  });
}

export function inferSilkVarieties(
  producer: Producer,
  skillNames: string[] = []
): SilkVariety[] {
  const text =
    `${producer.primaryLivelihood} ${skillNames.join(" ")}`.toLowerCase();
  const found: SilkVariety[] = [];
  if (text.includes("muga")) found.push("muga");
  if (text.includes("eri")) found.push("eri");
  if (text.includes("mulberry") || text.includes("pat silk") || text.includes("pat "))
    found.push("mulberry");
  if (text.includes("tassar") || text.includes("tasar")) found.push("tassar");
  if (found.length === 0) found.push("eri");
  return found;
}

function fabricKey(v: SilkVariety): BuyerProductType {
  return `${v}_fabric` as BuyerProductType;
}
function yarnKey(v: SilkVariety): BuyerProductType {
  return `${v}_yarn` as BuyerProductType;
}
function cocoonKey(v: SilkVariety): BuyerProductType {
  return `${v}_cocoons` as BuyerProductType;
}

export function legacyToProducts(
  producer: Producer,
  skillNames: string[],
  output: ProducerMonthlyOutput
): Partial<Record<BuyerProductType, number>> {
  const products: Partial<Record<BuyerProductType, number>> = {};
  const varieties = inferSilkVarieties(producer, skillNames);
  const primary = varieties[0] ?? "eri";
  const cats = producer.categoryIds?.length
    ? producer.categoryIds
    : [producer.category];

  const silkFromEntries = producer.categoryEntries?.[0]?.silkType ?? primary;

  if (output.silkWovenMeters > 0 && cats.some((c) => c === "weaver" || c === "designer")) {
    products[fabricKey(silkFromEntries)] = output.silkWovenMeters;
  }
  if (output.produceKg > 0) {
    if (cats.includes("spinner")) {
      products[yarnKey(silkFromEntries)] = output.produceKg;
    } else if (cats.includes("yarn_dyer")) {
      products.dyed_finished = output.produceKg;
    } else if (cats.includes("designer")) {
      products.dyed_finished = output.produceKg;
    } else {
      products[yarnKey(silkFromEntries)] = output.produceKg;
    }
  }
  if (output.cocoonsKg > 0) {
    products[cocoonKey(silkFromEntries)] = output.cocoonsKg;
  }
  return products;
}

export function rollupMonthlyOutput(
  products: Partial<Record<BuyerProductType, number>>
): ProducerMonthlyOutput {
  let silkWovenMeters = 0;
  let produceKg = 0;
  let cocoonsKg = 0;

  for (const t of FABRIC_TYPES) silkWovenMeters += products[t] ?? 0;
  for (const t of YARN_TYPES) produceKg += products[t] ?? 0;
  produceKg += (products.dyed_finished ?? 0) + (products.stitched_goods ?? 0);
  for (const t of COCOON_TYPES) cocoonsKg += products[t] ?? 0;

  return {
    silkWovenMeters,
    produceKg,
    cocoonsKg,
    products: { ...products },
  };
}

export function getProducerProductVolumes(
  producer: Producer,
  skillNames: string[] = []
): Partial<Record<BuyerProductType, number>> {
  const output = producer.monthlyOutput ?? {
    silkWovenMeters: 0,
    produceKg: 0,
    cocoonsKg: 0,
  };
  if (output.products && Object.keys(output.products).length > 0) {
    return output.products;
  }
  return legacyToProducts(producer, skillNames, output);
}

export function normalizeMonthlyOutput(
  output: ProducerMonthlyOutput | undefined,
  producer: Producer,
  skillNames: string[] = []
): ProducerMonthlyOutput {
  const base = output ?? { silkWovenMeters: 0, produceKg: 0, cocoonsKg: 0 };
  const products =
    base.products && Object.keys(base.products).length > 0
      ? base.products
      : legacyToProducts(producer, skillNames, base);
  return rollupMonthlyOutput(products);
}

export function productsByGroup(group: BuyerProductGroup) {
  return BUYER_PRODUCT_TYPES.filter((p) => p.group === group);
}
