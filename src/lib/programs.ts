import type { VisitorTypeId } from "@/lib/contact";
import { GRAMSOOTRA_URL } from "@/lib/constants";
import { PROGRAM_IMAGES } from "@/lib/images";
import { SITE_METRICS } from "@/lib/metrics";

export type ProgramSlug = "clusters" | "solar" | "district";

export type ProgramIconName =
  | "clusters"
  | "solar"
  | "district"
  | "users"
  | "chart"
  | "spark"
  | "machine"
  | "leaf"
  | "bolt"
  | "map"
  | "shield"
  | "network"
  | "platform";

export const PROGRAM_SLUGS: ProgramSlug[] = ["clusters", "solar", "district"];

export const AUDIENCE_GUIDE = [
  {
    audience: "NGO",
    recommended: "clusters" as ProgramSlug,
    note: "Field implementation in your geography",
  },
  {
    audience: "CSR / Company",
    recommended: "solar" as ProgramSlug,
    note: "Documented impact with machines and training",
  },
  {
    audience: "Government Body",
    recommended: "district" as ProgramSlug,
    note: "District-wide rollout with MoU support",
  },
  {
    audience: "Individual / Producer",
    recommended: "clusters" as ProgramSlug,
    note: "Browse machines, yarn, and services under Products",
  },
] as const;

export const GRAMSOOTRA = {
  title: "GramSootra",
  url: GRAMSOOTRA_URL,
  tagline: "India’s exclusive silk marketplace for rural artisans",
  description:
    "GramSootra connects weavers, yarn producers, raw material suppliers, and buyers. Producers manage operations, procure inputs, and sell finished goods digitally.",
  features: [
    "Connect stakeholders across the value chain",
    "Procure inputs and manage operations online",
    "Sell finished goods through the platform",
  ],
} as const;

export const PROGRAM_DETAILS = {
  clusters: {
    slug: "clusters" as const,
    title: "Women Silk Livelihood Clusters",
    tagline: "Full silk ecosystems, built district by district.",
    icon: "clusters" as ProgramIconName,
    image: PROGRAM_IMAGES.clusters,
    contactType: "ngo" as VisitorTypeId,
    forAudience: ["NGO", "CSR", "Institutions"],
    description: [
      "We go into a district, identify women artisans, and build a complete silk production cluster from scratch. Training, solar-powered reeling machines, raw material banks, rural facility centres, and market access, all in one package.",
      "One cluster typically covers around 100 women in a single district. Income uplift is measurable within 6 months. After 12 months, the cluster is self-managed by the women who run it.",
    ],
    outcomes: [
      "~100 women per cluster in one district",
      "₹3,000 to 5,000/month additional income within 6 months",
      "Self-managed and self-sustaining after 12 months",
    ],
    steps: [
      "Identify and mobilise women artisans in the target district",
      "Set up training, raw material banks, and facility centres",
      "Deploy solar reeling machines and connect to markets",
      "Transition to community-led management within 12 months",
    ],
    ctaLabel: "Partner on a Cluster",
  },
  solar: {
    slug: "solar" as const,
    title: "Solar Livelihood Program",
    tagline: "Solar-powered machines. Zero fuel cost.",
    icon: "solar" as ProgramIconName,
    image: PROGRAM_IMAGES.solar,
    contactType: "csr" as VisitorTypeId,
    forAudience: ["NGO", "CSR", "Institutions"],
    description: [
      "Our proprietary solar-powered silk reeling machines deliver 400% higher productivity compared to traditional methods and are 90% more energy efficient. Women who use these machines also earn carbon credits on top of their silk income.",
      `${SITE_METRICS.machinesDeployed.toLocaleString("en-IN")}+ machines deployed across ${SITE_METRICS.states} states. Zero fuel cost for the artisan. Finance and subsidy support available where applicable.`,
    ],
    outcomes: [
      `${SITE_METRICS.productivityRange} productivity vs traditional reeling`,
      "90% more energy efficient, fully solar powered",
      "Carbon credits on top of silk income",
    ],
    steps: [
      "Assess community needs and select the right machine model",
      "Install machines with hands-on training for each artisan",
      "Provide ongoing technical support and spare parts access",
      "Track productivity and income outcomes over 6 months",
    ],
    machines: [
      "Buniyaad",
      "Unnati",
      "Silky Spin",
      "Sonalika",
      "Sun Kargha",
      "Pro-wet Reel",
      "Handy MRTM",
    ],
    ctaLabel: "Deploy Solar Machines",
  },
  district: {
    slug: "district" as const,
    title: "District Deployment Model",
    tagline: "Government-scale rollout, end to end.",
    icon: "district" as ProgramIconName,
    image: PROGRAM_IMAGES.district,
    contactType: "government" as VisitorTypeId,
    forAudience: ["Government", "CSR", "Institutions"],
    description: [
      "Designed for state and district governments to roll out silk livelihoods across an entire district. Active MoUs in Jharkhand, Odisha, Chhattisgarh, Meghalaya, and other states.",
      "Full ecosystem delivery: training, machines, certification, market linkage, and documented impact reporting. CSR-compliant under the Companies Act 2013.",
    ],
    outcomes: [
      "Active MoUs with 6+ state governments",
      "Full ecosystem: training + machines + certification + markets",
      "CSR-compliant impact reporting included",
    ],
    steps: [
      "Sign MoU and align on district scope and targets",
      "Establish training centres, raw material banks, and facility hubs",
      "Deploy machines and onboard women artisans at scale",
      "Deliver certification, market linkage, and impact documentation",
    ],
    ctaLabel: "Explore District Deployment",
  },
} as const;

export function getProgramContactHref(slug: ProgramSlug) {
  const program = PROGRAM_DETAILS[slug];
  return `/contact?type=${program.contactType}&program=${slug}`;
}

export function getProgramLabel(slug: string | null) {
  if (!slug) return null;
  if (slug === "gramsootra") return GRAMSOOTRA.title;
  if (slug in PROGRAM_DETAILS) {
    return PROGRAM_DETAILS[slug as ProgramSlug].title;
  }
  return null;
}

export function isProgramSlug(value: string | null): value is ProgramSlug {
  return value !== null && PROGRAM_SLUGS.includes(value as ProgramSlug);
}

export function getProgramBySlug(slug: string) {
  if (slug in PROGRAM_DETAILS) {
    return PROGRAM_DETAILS[slug as ProgramSlug];
  }
  return null;
}
