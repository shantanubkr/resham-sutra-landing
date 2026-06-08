import { PARTNER_IMAGES } from "@/lib/images";

export type PartnerCategory = "strategic" | "institutional" | "on-ground";

export type Partner = {
  slug: string;
  name: string;
  category: PartnerCategory;
  state?: string;
  image?: string;
};

/** Source: Website content/partners.xlsx + live-site logos in assets/site/images/partners/logos/ */
export const PARTNERS: readonly Partner[] = [
  // Strategic partners (partners.xlsx)
  {
    slug: "clean-india",
    name: "Clean India",
    category: "strategic",
  },
  {
    slug: "shell-foundation",
    name: "Shell Foundation",
    category: "strategic",
  },
  {
    slug: "gates-foundation",
    name: "Bill & Melinda Gates Foundation",
    category: "strategic",
  },
  {
    slug: "dharma-life",
    name: "Dharma Life",
    category: "strategic",
  },
  {
    slug: "ceew",
    name: "CEEW",
    category: "strategic",
    image: PARTNER_IMAGES.ceew,
  },
  {
    slug: "villgro",
    name: "Villgro",
    category: "strategic",
    image: PARTNER_IMAGES.villgro,
  },
  {
    slug: "nhdc",
    name: "National Handloom Development Corporation",
    category: "strategic",
  },
  {
    slug: "nehhdc",
    name: "North East Handloom & Handicraft Development Corporation",
    category: "strategic",
  },
  {
    slug: "selco-foundation",
    name: "Selco Foundation",
    category: "strategic",
    image: PARTNER_IMAGES["selco-foundation"],
  },
  {
    slug: "acumen-academy",
    name: "Acumen Academy",
    category: "strategic",
    image: PARTNER_IMAGES["acumen-academy"],
  },
  {
    slug: "aurora-trust",
    name: "Aurora Trust",
    category: "strategic",
    image: PARTNER_IMAGES["aurora-trust"],
  },
  {
    slug: "upaya",
    name: "Upaya Social Ventures",
    category: "strategic",
    image: PARTNER_IMAGES.upaya,
  },

  // Institutional partners (live site + programmes)
  {
    slug: "central-silk-board",
    name: "Central Silk Board",
    category: "institutional",
    image: PARTNER_IMAGES["central-silk-board"],
  },
  {
    slug: "state-of-odisha",
    name: "State of Odisha",
    category: "institutional",
    image: PARTNER_IMAGES["state-of-odisha"],
  },
  {
    slug: "state-of-chhattisgarh",
    name: "State of Chhattisgarh",
    category: "institutional",
    image: PARTNER_IMAGES["state-of-chhattisgarh"],
  },
  {
    slug: "jharcraft",
    name: "Jharcraft",
    category: "institutional",
    image: PARTNER_IMAGES.jharcraft,
  },

  // On-ground partners (partners.xlsx)
  {
    slug: "mosonie",
    name: "MOSONIE Socio Economic Foundation",
    category: "on-ground",
    state: "Meghalaya",
  },
  {
    slug: "meghalaya-msrlm",
    name: "Meghalaya State Rural Livelihood Mission",
    category: "on-ground",
    state: "Meghalaya",
  },
  {
    slug: "meghalaya-sls",
    name: "Meghalaya State Livelihood Society",
    category: "on-ground",
    state: "Meghalaya",
    image: PARTNER_IMAGES["meghalaya-sls"],
  },
  {
    slug: "astitva-mahila-samiti",
    name: "Astitva Mahila Samiti",
    category: "on-ground",
    state: "Chhattisgarh",
  },
  {
    slug: "kanker",
    name: "Kanker",
    category: "on-ground",
    state: "Chhattisgarh",
  },
  {
    slug: "jeya-bunkar-producer-group",
    name: "Jeya Bunkar Producer Group",
    category: "on-ground",
    state: "Jharkhand",
  },
  {
    slug: "nagaland-sericulture",
    name: "Department of Sericulture, Nagaland",
    category: "on-ground",
    state: "Nagaland",
  },
  {
    slug: "sewa-bihar",
    name: "SEWA",
    category: "on-ground",
    state: "Bihar",
  },
  {
    slug: "jivika-jwire",
    name: "JIVIKA / JWIRE",
    category: "on-ground",
    state: "Bihar",
  },
  {
    slug: "prerna-ojas",
    name: "Prerna Ojas",
    category: "on-ground",
    state: "Uttar Pradesh",
    image: PARTNER_IMAGES["prerna-ojas"],
  },
  {
    slug: "odisha-handloom-sericulture",
    name: "Department of Handloom & Sericulture, Odisha",
    category: "on-ground",
    state: "Odisha",
  },
  {
    slug: "jslps",
    name: "Jharkhand State Livelihood Promotion Society (JSLPS)",
    category: "on-ground",
    state: "Jharkhand",
    image: PARTNER_IMAGES.jslps,
  },
  {
    slug: "meghloom-producer-enterprise",
    name: "Meghloom Producer Enterprise",
    category: "on-ground",
    state: "Meghalaya",
  },
] as const;

export const PARTNERS_WITH_LOGOS = PARTNERS.filter(
  (partner): partner is Partner & { image: string } => Boolean(partner.image),
);

export const PARTNERS_MISSING_LOGOS = PARTNERS.filter((partner) => !partner.image);

export function splitPartnersForMarquee(partners: readonly Partner[]) {
  const midpoint = Math.ceil(partners.length / 2);
  return [partners.slice(0, midpoint), partners.slice(midpoint)] as const;
}
