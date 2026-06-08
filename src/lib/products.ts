import { GRAMSOOTRA_URL } from "@/lib/constants";
import { PRODUCT_IMAGES } from "@/lib/images";
import { RESEARCH_METRICS, SITE_METRICS } from "@/lib/metrics";

export type ProductCategory = "machines" | "items" | "services";

export type MachineSlug =
  | "buniyaad"
  | "unnati"
  | "silky-spin"
  | "sonalika"
  | "pro-wet-reel"
  | "handy-mrtm"
  | "dyna-charkha"
  | "saral-rereel"
  | "sun-kargha"
  | "abha"
  | "mulberry-reeling";

export type ItemSlug = "cocoons" | "yarns";

export type ServiceSlug =
  | "experience-centres"
  | "raw-material-banks"
  | "facility-centres"
  | "certification"
  | "gramsootra"
  | "training";

export const MACHINE_STATS = [
  {
    value: SITE_METRICS.productivityRange,
    label: "productivity vs traditional methods",
  },
  { value: `${RESEARCH_METRICS.incomeIncreasedAllUsersPercent}%`, label: "report higher income (CEEW)" },
  {
    value: `${SITE_METRICS.machinesDeployed.toLocaleString("en-IN")}+`,
    label: "machines installed",
  },
  { value: "Solar", label: "off-grid power options" },
] as const;

export const PRODUCT_PAGE_IMAGES = {
  hubHero: PRODUCT_IMAGES.hubHero,
  cardMachines: PRODUCT_IMAGES.cardMachines,
  cardItems: PRODUCT_IMAGES.cardItems,
  cardServices: PRODUCT_IMAGES.cardServices,
  machinesHero: PRODUCT_IMAGES.machinesHero,
  itemsHero: PRODUCT_IMAGES.itemsHero,
  servicesHero: PRODUCT_IMAGES.servicesHero,
} as const;

export const MACHINES = [
  {
    slug: "buniyaad" as const,
    name: "Buniyaad Reeling Machine",
    image: PRODUCT_IMAGES.machines.buniyaad,
    tagline: "Micro reeling that replaces thigh-reeling.",
    description:
      "Compact micro silk reeling machine for textured weft yarn. Matches manual product texture while delivering 3–4× productivity. Recognised by Central Silk Board for distribution in Odisha, Chhattisgarh, and Bihar.",
    highlights: [
      "3–4× traditional productivity · 200–250 g output",
      "Solar-capable · under 15 kg · from ₹9,700",
      "Replaces unsafe thigh-reeling",
    ],
  },
  {
    slug: "unnati" as const,
    name: "Unnati Reeling Machine",
    image: PRODUCT_IMAGES.machines.unnati,
    tagline: "World's first solar silk reeling and spinning machine.",
    description:
      "Produces fine twisted yarn for warp and weft in Tassar, Eri, and Muga silk. Works off-grid in remote villages. Over 6,000 Unnati machines installed across India.",
    highlights: [
      "Fully solar-powered · 150–200 g capacity",
      "Warp and weft quality yarn",
      "From ₹24,700 · 30 W solar panel",
    ],
  },
  {
    slug: "silky-spin" as const,
    name: "Silky Spin",
    image: PRODUCT_IMAGES.machines["silky-spin"],
    tagline: "Spin silk directly from cocoons without roving.",
    description:
      "Preferred for Eri, Tassar, Muga, and Mulberry silk. Supports de-flossing and a wide variety of spun yarns with a high-speed spindle.",
    highlights: [
      "200% productivity uplift · ~300 g capacity",
      "2,000+ installed in Assam, Jharkhand & beyond",
      "Solar-capable · 15 W power draw",
    ],
  },
  {
    slug: "sonalika" as const,
    name: "Sonalika Muga Reeling",
    image: PRODUCT_IMAGES.machines.sonalika,
    tagline: "Muga weft yarn reeling — replaces bhir reeling.",
    description:
      "Produces fluffy, higher-quality Muga weft yarn. Two ends operate simultaneously in a compact, safe design.",
    highlights: [
      "2–3× manual productivity · 150–200 g",
      "Single-operator · solar option",
      "From ₹13,400",
    ],
  },
  {
    slug: "pro-wet-reel" as const,
    name: "Pro-wet Reel",
    image: PRODUCT_IMAGES.machines["pro-wet-reel"],
    tagline: "Reeling machine for warp silk yarn.",
    description:
      "Purpose-built for warp silk yarn production in organised facility centres and producer groups.",
    highlights: [
      "Warp-quality output",
      "Solar-compatible",
      "Field support and spares",
    ],
  },
  {
    slug: "handy-mrtm" as const,
    name: "Handy MRTM",
    image: PRODUCT_IMAGES.machines["handy-mrtm"],
    tagline: "Motorised reeling and twisting for Tassar and Muga.",
    description:
      "Computer-designed for smooth operation with double cam and closed gearbox. Versatile for reeling and twisting.",
    highlights: [
      "400 g / 8 hrs · 4 ends",
      "Solar or pedal powered",
      "Lower power · easy maintenance",
    ],
  },
  {
    slug: "dyna-charkha" as const,
    name: "Dyna Charkha",
    image: PRODUCT_IMAGES.machines["dyna-charkha"],
    tagline: "Reeling and re-reeling — yarn direct to hanks.",
    description:
      "Dry reeling for Tassar; wet reeling for Muga and Mulberry. Re-reels from bobbins to standard hanks with optional sensors.",
    highlights: [
      "3/4/8-end re-reeling options",
      "Solar-powered",
      "Hank length counter ready",
    ],
  },
  {
    slug: "saral-rereel" as const,
    name: "Saral Re-reeling",
    image: PRODUCT_IMAGES.machines["saral-rereel"],
    tagline: "Simple 3-end re-reeling for low-volume operations.",
    description:
      "Low-cost re-reeling charkha with motor or manual operation. Ideal for village producers scaling up hank preparation.",
    highlights: [
      "3-end re-reeling",
      "Low-cost · easy to maintain",
      "Solar option available",
    ],
  },
  {
    slug: "sun-kargha" as const,
    name: "Sun Kargha",
    image: PRODUCT_IMAGES.machines["sun-kargha"],
    tagline: "Solar and pedal-powered loom — 2–3× handloom output.",
    description:
      "Highly efficient loom requiring only 100–150 W. Produces ~100 picks per minute for all fabric types. Hand, solar, or pedal modes.",
    highlights: [
      "2–3× traditional handloom productivity",
      "~4 m/hr at 30 PPI",
      "100–150 W · 320 mAH battery option",
    ],
  },
  {
    slug: "abha" as const,
    name: "Abha Spinning Machine",
    image: PRODUCT_IMAGES.machines.abha,
    tagline: "Advanced spinning for established producers.",
    description:
      "Higher-capacity spinning for experienced artisans and producer groups at rural facility centres.",
    highlights: [
      "For skilled spinners and groups",
      "Facility-centre workflows",
      "Traceable via Gramsootra",
    ],
  },
  {
    slug: "mulberry-reeling" as const,
    name: "Mulberry Silk Reeling",
    image: PRODUCT_IMAGES.machines["mulberry-reeling"],
    tagline: "Dedicated reeling for mulberry silk value chains.",
    description:
      "Reeling solution for mulberry sericulture collectives with certification-ready output and end-to-end value chain support.",
    highlights: [
      "Mulberry collective programmes",
      "Certification-ready output",
      "South India rollout focus",
    ],
  },
] as const;

export const MARKETPLACE_ITEMS = [
  {
    slug: "cocoons" as const,
    name: "Cocoons",
    image: PRODUCT_IMAGES.items.cocoons,
    tagline: "Quality-assured cocoons for rural producers.",
    description:
      "Year-round access to cocoons through raw material banks and the Gramsootra marketplace. Producers procure inputs reliably without depending on exploitative middlemen.",
    highlights: [
      "Traceable sourcing",
      "Available via Gramsootra",
      "Linked to cluster supply chains",
    ],
  },
  {
    slug: "yarns" as const,
    name: "Yarns",
    image: PRODUCT_IMAGES.items.yarns,
    tagline: "Silk yarn from certified rural producers.",
    description:
      "Finished silk yarn from women producers on Resham Sutra machines — hand-spun Eri, mill-spun counts, and export-grade lots. Sold through Gramsootra, cooperatives, and wholesale channels. Export Eri yarn from $35–60/kg (2025 price list).",
    highlights: [
      "Rural lab certified quality",
      "Export Eri yarn from $35–60/kg",
      "Typical spinner sale: ₹2,000–3,000/kg (60 Decibels 2025)",
    ],
  },
] as const;

export const SERVICES = [
  {
    slug: "experience-centres" as const,
    name: "Rural Experience Centres",
    image: PRODUCT_IMAGES.services["experience-centres"],
    tagline: "One-stop hubs for training and machine familiarisation.",
    description:
      `${SITE_METRICS.recsSetup} RECs operate as one-stop hubs — machine demonstrations, training, technical and business support, and finance linkage for micro-entrepreneurs.`,
    highlights: [
      "Live machine demonstrations",
      "Credit and subsidy linkage",
      "Knowledge centre for visitors",
    ],
  },
  {
    slug: "raw-material-banks" as const,
    name: "Raw Material Banks",
    image: PRODUCT_IMAGES.services["raw-material-banks"],
    tagline: "Year-round cocoon and input support.",
    description:
      "Banks ensure producers are not forced to buy from middlemen at volatile prices. Steady input supply keeps machines running and income predictable through the season.",
    highlights: [
      "Reduced middleman dependence",
      "Cluster-linked inventory",
      "Procurement via Gramsootra",
    ],
  },
  {
    slug: "facility-centres" as const,
    name: "Rural Facility Centres",
    image: PRODUCT_IMAGES.services["facility-centres"],
    tagline: "Safe, organised production spaces in villages.",
    description:
      `${SITE_METRICS.rfcsSetup} RFCs are shared village workspaces where producers work without overhead — safe, organised production with peer learning and quality control.`,
    highlights: [
      "Safe communal workspaces",
      "Organised village production",
      "Supports group entrepreneurship",
    ],
  },
  {
    slug: "certification" as const,
    name: "Testing & Certification",
    image: PRODUCT_IMAGES.services.certification,
    tagline: "Rural labs for quality and origin assurance.",
    description:
      "Rural testing labs certify product quality and geographic origin so buyers trust rural-made silk. Certification underpins marketplace pricing and export readiness.",
    highlights: [
      "Quality assurance",
      "Origin traceability",
      "Market access enabler",
    ],
  },
  {
    slug: "training" as const,
    name: "Training & Business Development",
    image: PRODUCT_IMAGES.services.training,
    tagline: "Skills, community, and producer mentoring.",
    description:
      "Structured training on machine operation, business basics, and community platforms for information exchange. Producers graduate from trainees to mentors within clusters.",
    highlights: [
      "Machine and livelihood skills",
      "Community knowledge sharing",
      "Ongoing producer mentoring",
    ],
  },
  {
    slug: "gramsootra" as const,
    name: "GramSootra Digital Platform",
    image: PRODUCT_IMAGES.services.gramsootra,
    tagline: "ERP, marketplace, and community in one app.",
    description:
      "GramSootra is Resham Sutra’s digital marketplace — connect reelers, weavers, and farmers with simple ERP, traceability, and sales for cocoons, yarns, and fabrics. Download the app at gramsootra.in.",
    highlights: [
      "Simple ERP for buying, production & sales",
      "Marketplace for cocoons, yarn & fabric",
      "Community & training information exchange",
    ],
  },
] as const;

export const PRODUCTS_INTRO = {
  title: "Machines, materials, and services",
  description:
    "Explore individual machines, buy cocoons and yarn, or access training and digital tools. Organisations looking for full rollout packages should start with Programs.",
} as const;

export const ECOSYSTEM_PILLARS = [
  "Progressive silk farming collectives",
  "Rural Experience Centres",
  "Raw material banks",
  "Rural Facility Centres",
  "Testing & certification",
  "GramSootra digital platform",
] as const;

export function isGramsootraSlug(slug?: string) {
  return slug === "gramsootra";
}

export function getProductContactHref(category: ProductCategory, slug?: string) {
  if (isGramsootraSlug(slug)) return GRAMSOOTRA_URL;
  const params = new URLSearchParams({ type: "individual", category });
  if (slug) params.set("item", slug);
  return `/contact?${params.toString()}`;
}

export function getProductActionLabel(slug?: string) {
  return isGramsootraSlug(slug) ? "Visit GramSootra" : "Enquire";
}

export function getProductItemLabel(
  category: string | null,
  item: string | null,
): string | null {
  if (!category || !item) return null;
  if (category === "machines") {
    return MACHINES.find((m) => m.slug === item)?.name ?? null;
  }
  if (category === "items") {
    return MARKETPLACE_ITEMS.find((p) => p.slug === item)?.name ?? null;
  }
  if (category === "services") {
    return SERVICES.find((s) => s.slug === item)?.name ?? null;
  }
  return null;
}
