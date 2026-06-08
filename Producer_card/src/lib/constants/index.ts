import type {
  OfflineManagerRole,
  ProducerCategory,
  SilkVariety,
} from "@/lib/types";

export const DEMO_OTP = "123456";

export const SILK_VARIETIES: { value: SilkVariety; label: string }[] = [
  { value: "muga", label: "Muga" },
  { value: "eri", label: "Eri" },
  { value: "mulberry", label: "Mulberry" },
  { value: "tassar", label: "Tassar" },
];

export const QUALITY_GRADES = ["A", "B", "C"] as const;

export const PRODUCER_CATEGORIES: {
  value: ProducerCategory;
  label: string;
  hint: string;
}[] = [
  {
    value: "farmer",
    label: "Farmer",
    hint: "Mulberry / leaf cultivation",
  },
  {
    value: "cocoon_rearer",
    label: "Cocoon rearer",
    hint: "Cocoon rearing",
  },
  {
    value: "spinner",
    label: "Spinner",
    hint: "Yarn spinning",
  },
  {
    value: "weaver",
    label: "Weaver",
    hint: "Handloom weaving",
  },
  {
    value: "yarn_dyer",
    label: "Yarn dyer",
    hint: "Dyeing & printing",
  },
  {
    value: "designer",
    label: "Designer",
    hint: "Patterns & design",
  },
];

export const OFFLINE_MANAGER_ROLES: {
  value: OfflineManagerRole;
  label: string;
}[] = [
  { value: "community_resource_person", label: "Community resource person" },
  { value: "aggregator", label: "Aggregator" },
  { value: "master_trainer", label: "Master trainer" },
  { value: "quality_check_officer", label: "Quality check officer" },
  { value: "packaging_dispatch_manager", label: "Packaging & dispatch manager" },
  { value: "accountant", label: "Accountant" },
  { value: "procurement_inventory_manager", label: "Procurement & inventory manager" },
];

export const INCOME_BASELINES = [
  { value: "below_5k", label: "Below ₹5,000" },
  { value: "5k-10k", label: "₹5,000 – ₹10,000" },
  { value: "10k-20k", label: "₹10,000 – ₹20,000" },
  { value: "above_20k", label: "Above ₹20,000" },
] as const;

export const GENDERS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

export const CATEGORY_LABELS: Record<ProducerCategory, string> =
  Object.fromEntries(
    PRODUCER_CATEGORIES.map((c) => [c.value, c.label])
  ) as Record<ProducerCategory, string>;

export function categoryLabel(cat: ProducerCategory | string): string {
  return CATEGORY_LABELS[cat as ProducerCategory] ?? String(cat);
}

export function incomeLabel(value: string): string {
  return INCOME_BASELINES.find((i) => i.value === value)?.label ?? value;
}

export function avatarUrl(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a1a1a&color=fff&size=256`;
}

export const GOV_DEMO_TOKEN = "demo-gov-2026";

export {
  BUYER_PRODUCT_META,
  BUYER_PRODUCT_TYPES,
  BUYER_PRODUCT_GROUPS,
  productsByGroup,
} from "@/lib/buyers/products";
