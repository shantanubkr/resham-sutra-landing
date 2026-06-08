import { IMPACT_IMAGES } from "@/lib/images";
import { RESEARCH_METRICS, RESEARCH_SOURCES, SITE_METRICS } from "@/lib/metrics";

export const IMPACT_PAGE_IMAGES = {
  hero: IMPACT_IMAGES.hero,
} as const;

/** Income figures sourced from assets/Case Studies/ unless noted */
export const IMPACT_STORIES = [
  {
    name: "Narita Basumatary",
    location: "Assam · Baksa",
    image: IMPACT_IMAGES.storyNarita,
    context:
      "Marginal farmer and SHG member trained by Sanjog on Resham Sutra Eri spinning. She now earns from machine-spun yarn and sells rearing inputs locally.",
    quote:
      "Coming in contact with Sanjog and choosing silk reeling on the machine is the biggest compliment in my life.",
    before: "₹1,000/mo",
    after: "₹4,000/mo",
    timeline: "300% income increase (Case Study, Sanjog Baksa)",
  },
  {
    name: "Ritngen Lamare",
    location: "Meghalaya · Ri-Bhoi",
    image: IMPACT_IMAGES.storyRitngen,
    context:
      "Eri spinner from Liarkhla village trained by MOSONiE on a solar Eri-spinning machine. Her son, unable to do outdoor work after an injury, learned spinning at home.",
    quote:
      "The machine was easy to learn. In a few months I was confident enough to help my neighbours get started too.",
    before: "~0.5 kg yarn/mo",
    after: "2–4 kg yarn/mo",
    timeline: "Case Study, MOSONiE Bhoirymbong",
  },
  {
    name: "Maa Tarini Reeling Group",
    location: "Fakirpur · Odisha",
    image: IMPACT_IMAGES.storyFakirpur,
    context:
      "Established 2017 in Fakirpur, Jajpur. Fifteen Buniyaad machines (90% government subsidy) employ 16 women in two shifts — ending thigh-reeling in the cluster.",
    quote:
      "Working at this centre gives us confidence that we too can earn income — and someday run a machine at home.",
    before: "Thigh-reeling",
    after: "₹3,000–5,000/mo",
    timeline: "Case Study, Odisha end-users (PL)",
  },
  {
    name: "Bharati Sarathi",
    location: "Chhattisgarh",
    image: IMPACT_IMAGES.storyCollective,
    context:
      "Trained in Bilaspur Central Jail with Astitva Mahila Samiti and Resham Sutra. Now a master trainer at the Jagdalpur REC; 200+ women trained.",
    quote:
      "Spinning tasar cocoons has given momentum to our perished life — I am no longer a burden to my family.",
    detail: "9 prisons · 1,000+ women (Success Story, Bilaspur Jail)",
    timeline: "Prison-to-livelihood pathway",
  },
] as const;

export const IMPACT_HIGHLIGHTS = [
  {
    value: SITE_METRICS.jobsCreated,
    suffix: "+",
    label: "direct jobs created",
    personal: `${SITE_METRICS.womenTotalImpact.toLocaleString("en-IN")}+ women impacted in total — replacing thigh-reeling and manual work with solar-powered livelihoods (Ashden application).`,
  },
  {
    value: SITE_METRICS.recsSetup,
    label: "Rural Experience Centres",
    personal: "One-stop hubs for machine demos, training, finance linkage, and cocoon banks — turning isolated workers into connected micro-entrepreneurs.",
  },
  {
    value: SITE_METRICS.rfcsSetup,
    label: "Rural Facility Centres",
    personal: "Shared village workspaces where women produce together with peer learning, quality control, and no overhead burden.",
  },
  {
    value: SITE_METRICS.ruralProducers,
    suffix: "+",
    label: "rural producers",
    personal: "Each with a name, a village, and a story like the ones above.",
  },
  {
    value: SITE_METRICS.states,
    label: "states",
    personal: "From Jharkhand and Odisha to the Northeast and central India.",
  },
  {
    value: SITE_METRICS.incomeIncreasePercent,
    suffix: "%",
    label: "report higher income",
    personal: `${RESEARCH_METRICS.incomeIncreasedAllUsersPercent}% of machine users in CEEW’s assessment (N=${RESEARCH_METRICS.ceeewSampleSize}); ${RESEARCH_METRICS.incomeIncreasedMachineUsersPercent}% in 60 Decibels’ 2025 survey.`,
  },
] as const;

export { RESEARCH_SOURCES };

export const ACTIVE_STATES = [
  "Jharkhand",
  "Odisha",
  "Assam",
  "Chhattisgarh",
  "Madhya Pradesh",
  "Telangana",
  "Meghalaya",
  "West Bengal",
  "Karnataka",
  "Bihar",
  "Manipur",
  "Nagaland",
  "Uttarakhand",
  "Rajasthan",
  "Maharashtra",
  "Andhra Pradesh",
] as const;

/** Illustrative estimates for partnership calculator — not audited financial projections */
export const CALCULATOR_RATES = {
  womenPerLakh: 4,
  machinesPerLakh: 0.8,
  treesPerLakh: 200,
  impactTimeline: "Measurable within 6 months (field programmes)",
} as const;

export const IMPACT_PILLARS = [
  {
    title: "Social impact",
    text: `Over 90% of producers are women. In 60 Decibels’ 2025 survey, ${RESEARCH_METRICS.qualityOfLifeImprovedPercent}% of machine users said their quality of life improved and ${RESEARCH_METRICS.confidenceImprovedPercent}% reported greater confidence. ${RESEARCH_METRICS.financialDecisionImprovedPercent}% said they make financial decisions more independently — ${SITE_METRICS.peopleBenefited.toLocaleString("en-IN")}+ lives touched since ${SITE_METRICS.programsSinceYear}.`,
    image: IMPACT_IMAGES.pillarSocial,
  },
  {
    title: "Economic impact",
    text: `Before Resham Sutra, ${RESEARCH_METRICS.silkUnder500gBeforePercent}% of spinners produced under 500 g silk per week; after adoption, ${RESEARCH_METRICS.silkOver500gAfterPercent}% produce over 500 g. ${RESEARCH_METRICS.incomeIncreasedMachineUsersPercent}% report higher earnings — mainly from yarn quality (${RESEARCH_METRICS.incomeIncreaseReasons.yarnQuality}%), training (${RESEARCH_METRICS.incomeIncreaseReasons.technicalTraining}%), and productivity (${RESEARCH_METRICS.incomeIncreaseReasons.productivity}%). Typical sale price: ${RESEARCH_METRICS.typicalSellPriceInrPerKg}/kg.`,
    image: IMPACT_IMAGES.pillarEconomic,
  },
  {
    title: "Environmental impact",
    text: `Solar-powered machines offset an estimated ${SITE_METRICS.co2TonnesAnnual.toLocaleString("en-IN")} tonnes of CO₂ annually. ${RESEARCH_METRICS.gridAtUsageSitePercent}% of CEEW-surveyed users operate where grid power is available but unreliable — solar keeps production running through outages, with carbon credits on top of silk income.`,
    image: IMPACT_IMAGES.pillarEnvironmental,
  },
] as const;

/** Headline outcomes from verified research — shown on Impact page. */
export const RESEARCH_HIGHLIGHTS = [
  {
    value: RESEARCH_METRICS.qualityOfLifeImprovedPercent,
    suffix: "%",
    label: "quality of life improved",
    detail: "60 Decibels 2025 · machine users (n=103)",
  },
  {
    value: RESEARCH_METRICS.netPromoterScore,
    label: "Net Promoter Score",
    detail: `${RESEARCH_METRICS.promoterPercent}% Promoters · 60 Decibels 2025`,
  },
  {
    value: RESEARCH_METRICS.silkOver500gAfterPercent,
    suffix: "%",
    label: "now produce 500 g+ silk/week",
    detail: `Up from ${RESEARCH_METRICS.silkUnder500gBeforePercent}% under 500 g before adoption`,
  },
  {
    value: RESEARCH_METRICS.firstTimeMachineAccessPercent,
    suffix: "%",
    label: "first-time machine access",
    detail: "Reaching spinners without prior similar equipment",
  },
] as const;
