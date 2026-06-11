import { HOME_IMAGES, IMPACT_IMAGES } from "@/lib/images";
import { RESEARCH_METRICS, SITE_METRICS } from "@/lib/metrics";

export { PARTNERS } from "@/lib/partners";

export const BRAND = {
  yellow: "#FCE900",
  green: "#04B648",
  purple: "#615EAA",
  text: "#1A1A1A",
  muted: "#555555",
  border: "#EEEEEE",
} as const;

/** Official GramSootra marketplace — all platform links should use this URL. */
export const GRAMSOOTRA_URL = "https://gramsootra.in/" as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "All Programs", href: "/programs" },
      { label: "Women Silk Clusters", href: "/programs/clusters" },
      { label: "Solar Livelihood", href: "/programs/solar" },
      { label: "District Deployment", href: "/programs/district" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Machines", href: "/products/machines" },
      { label: "Products", href: "/products/items" },
      { label: "Services", href: "/products/services" },
    ],
  },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
] as const;

export const HERO_IMAGE = HOME_IMAGES.hero;

export const IMPACT_IMAGE = HOME_IMAGES.impactStrip;

export const HERO_STATS = [
  {
    value: SITE_METRICS.machinesDeployed,
    suffix: "+",
    label: "machines deployed",
  },
  {
    value: SITE_METRICS.jobsCreated,
    suffix: "+",
    label: "direct jobs created",
  },
  {
    value: SITE_METRICS.recsSetup,
    label: "Rural Experience Centres",
  },
  {
    value: SITE_METRICS.rfcsSetup,
    label: "Rural Facility Centres",
  },
] as const;

export const IMPACT_STATS = [
  {
    value: SITE_METRICS.machinesDeployed,
    suffix: "+",
    context: "machines deployed",
    detail: `${SITE_METRICS.productivityRange} productivity vs traditional`,
  },
  {
    value: SITE_METRICS.jobsCreated,
    suffix: "+",
    context: "direct jobs created",
    detail: `${SITE_METRICS.womenTotalImpact.toLocaleString("en-IN")}+ women impacted overall`,
  },
  {
    value: SITE_METRICS.recsSetup,
    context: "experience centres (RECs)",
    detail: "Training, demos, and machine access hubs",
  },
  {
    value: SITE_METRICS.rfcsSetup,
    context: "facility centres (RFCs)",
    detail: "Shared production spaces for producer groups",
  },
  {
    value: SITE_METRICS.states,
    context: "active states",
    detail: `${SITE_METRICS.villages}+ villages on the ground`,
  },
  {
    value: SITE_METRICS.incomeIncreasePercent,
    suffix: "%",
    context: "report higher income",
    detail: `CEEW assessment (N=${RESEARCH_METRICS.ceeewSampleSize}) · 60 Decibels ${RESEARCH_METRICS.decibelsSurveyYear}`,
  },
] as const;

export const PROGRAMS = [
  {
    title: "Women Silk Livelihood Clusters",
    tagline: "Full silk ecosystems, built district by district.",
    image: HOME_IMAGES.programClusters,
    icon: "clusters" as const,
    highlights: [
      { icon: "users" as const, label: "~100 women per cluster" },
      { icon: "chart" as const, label: "Income in 6 months" },
      { icon: "spark" as const, label: "Self-managed in 12 months" },
    ],
    href: "/programs/clusters",
  },
  {
    title: "Solar Livelihood Program",
    tagline: "Solar-powered machines. Zero fuel cost.",
    image: HOME_IMAGES.programSolar,
    icon: "solar" as const,
    highlights: [
      { icon: "machine" as const, label: `${SITE_METRICS.machinesDeployed.toLocaleString("en-IN")}+ machines deployed` },
      { icon: "leaf" as const, label: "Carbon credits earned" },
      { icon: "bolt" as const, label: "90% more efficient" },
    ],
    href: "/programs/solar",
  },
  {
    title: "District Deployment Model",
    tagline: "Government-scale rollout, end to end.",
    image: HOME_IMAGES.programDistrict,
    icon: "district" as const,
    highlights: [
      { icon: "map" as const, label: "MoUs in 6+ states" },
      { icon: "shield" as const, label: "CSR-compliant reporting" },
      { icon: "network" as const, label: "Ready to scale" },
    ],
    href: "/programs/district",
  },
] as const;

export const TRUST_ITEMS = [
  "FCRA Registered (Ministry of Home Affairs)",
  "CSR Compliant under Companies Act 2013",
  "GuideStar India, Transparency Verified",
  "Ashden Award 2019 · 2025 Finalist",
  "Acumen Academy Fellow Organization",
  "UN SDG Aligned (SDGs 1, 5, 7, 8, 13)",
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Coming in contact with Sanjog and choosing silk reeling on the machine is the biggest compliment in my life.",
    name: "Narita Basumatary",
    role: "Eri spinner · Sanjog Baksa",
    location: "Assam",
    image: IMPACT_IMAGES.storyNarita,
    before: "₹1,000/mo",
    after: "₹4,000/mo",
  },
  {
    quote:
      "The machine was easy to learn. In a few months I was confident enough to help my neighbours get started too.",
    name: "Ritngen Lamare",
    role: "Eri spinner · MOSONiE",
    location: "Meghalaya",
    image: IMPACT_IMAGES.storyRitngen,
    before: "~0.5 kg/mo",
    after: "2–4 kg/mo",
  },
  {
    quote:
      "Working at this centre gives us confidence that we too can earn income.",
    name: "Maa Tarini Reeling Group",
    role: "15 Buniyaad machines",
    location: "Fakirpur, Odisha",
    image: IMPACT_IMAGES.storyFakirpur,
    detail: "16 women · ₹3,000–5,000/mo",
  },
  {
    quote:
      "Spinning tasar cocoons has given momentum to our perished life — I am no longer a burden to my family.",
    name: "Bharati Sarathi",
    role: "Master trainer · Bilaspur Prison programme",
    location: "Chhattisgarh",
    image: IMPACT_IMAGES.storyCollective,
    detail: "200+ women trained at Jagdalpur REC",
  },
] as const;

export const CONTACT = {
  phone: "+91 79822 97420",
  email: "info@reshamsutra.com",
  whatsapp: "+917982297420",
  registeredOffice:
    "Ashreya, Behind Sirdi Sai Hospital, Bariatu, Ranchi 834009, Jharkhand",
  worksOffice: "No. 8 Ghevra Village, New Delhi 110081",
} as const;
