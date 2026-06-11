import { ABOUT_IMAGES as ABOUT_IMAGE_PATHS, TEAM_IMAGES } from "@/lib/images";
import { SITE_METRICS } from "@/lib/metrics";

export const ABOUT_IMAGES = ABOUT_IMAGE_PATHS;

export const ABOUT_INTRO = {
  headline: "Enabling rural artisans through silk, solar, and scale",
  paragraphs: [
    "Resham Sutra is a social and technological enterprise focused on helping rural artisans become self-sufficient and financially independent. From planting trees for sericulture to environment-friendly compact machines, design support, and market access, we stay with communities every step of the way.",
    "We work with rural communities on the margins — in Jharkhand, Odisha, Assam, Chhattisgarh, Madhya Pradesh, Telangana, and beyond — where patchy electricity makes traditional equipment unusable. Our machines are compact, energy-efficient, and solar-powered.",
    `Since ${SITE_METRICS.programsSinceYear}, our programmes have reached ${SITE_METRICS.ruralProducers.toLocaleString("en-IN")}+ rural producers across ${SITE_METRICS.villages}+ villages in ${SITE_METRICS.states} states, benefiting an estimated ${SITE_METRICS.peopleBenefited.toLocaleString("en-IN")}+ people.`,
  ],
} as const;

export const VISION_MISSION = {
  vision: {
    title: "Our Vision",
    text: "Help marginalised communities prosper, leave isolation behind, and join India's wider artisan economy — with a network of 500,000 rural producers on an integrated digital marketplace.",
  },
  mission: {
    title: "Our Mission",
    text: "Bring innovations that improve productivity and quality, delivering greater income and comfort for rural silk producers through farm-to-fabric value chains.",
  },
} as const;

export const JOURNEY_MILESTONES = [
  {
    year: "2012",
    title: "Roots in Simdega",
    description:
      "Work begins in Jharkhand's Simdega district — mulberry planting on 20 acres, expanding to 100 acres across five villages the next year.",
  },
  {
    year: "2019",
    title: "Programmes at scale",
    description:
      "Structured livelihood programmes launch nationwide. ASME iShow recognises our solar silk reeling innovation.",
  },
  {
    year: "Today",
    title: "Proven on the ground",
    description: `${SITE_METRICS.machinesDeployed.toLocaleString("en-IN")}+ machines · ${SITE_METRICS.jobsCreated.toLocaleString("en-IN")}+ jobs · ${SITE_METRICS.recsSetup} RECs · ${SITE_METRICS.rfcsSetup} RFCs across ${SITE_METRICS.states} states.`,
  },
] as const;

export const ECOSYSTEM_PILLARS = [
  "Progressive silk farming collectives",
  "Rural experience centres (RECs)",
  "Raw material banks (cocoon banks)",
  "Rural facility centres (RFCs)",
  "Testing and certification through rural labs",
  "Gramsootra digital marketplace",
] as const;

export const TEAM = [
  {
    name: "Kunal Vaid",
    role: "CEO & Founder",
    image: TEAM_IMAGES["kunal-vaid"],
    bio: "Founder of Resham Sutra Pvt. Ltd. Developed and scaled solar-powered silk reeling, spinning, and weaving machines. Brings modern technology matched to rural textile production.",
  },
  {
    name: "Ratan Vaid",
    role: "Managing Director",
    image: TEAM_IMAGES["ratan-vaid"],
    bio: "35+ years in home textiles and international marketing (Target, Dillards, Next UK, Galeries Lafayette). Deep rural marketing experience for artisan product access.",
  },
  {
    name: "Upasna Jain",
    role: "Chief of Staff",
    image: TEAM_IMAGES["upasna-jain"],
    bio: "Passionate about using technology to change women's lives — from teacher training to familiarising rural women with modern handloom devices.",
  },
] as const;

export const TEAM_NOTE = `Team of ${SITE_METRICS.teamSize} professionals and ${SITE_METRICS.fieldTechnicians}+ trained field technicians supporting producers across India.` as const;
