/** Curated from https://www.youtube.com/@reshamsutra */
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@reshamsutra";

export type FeaturedVideo = {
  id: string;
  title: string;
  description: string;
};

export const FEATURED_VIDEOS = [
  {
    id: "vWg9fdTkP2M",
    title: "Meghalaya — transformative rural entrepreneurship",
    description:
      "Eri silk livelihoods in Ri-Bhoi district with solar spinning and community production.",
  },
  {
    id: "0IgWR_OIW4I",
    title: "Eri silk spinning training on Abha machines",
    description:
      "Hands-on training for women producers in Meghalaya on Resham Sutra spinning equipment.",
  },
  {
    id: "PrHX5sixb3g",
    title: "Tassar silk weaving in Odisha on Sun Kargha",
    description:
      "Solar-assisted handloom weaving — relevant to Buniyaad and cluster programmes in Odisha.",
  },
  {
    id: "Rw1C8CEzsWE",
    title: "Sun Kargha — village weaving revolution",
    description:
      "How the solar-assisted loom changes productivity for rural weavers.",
  },
  {
    id: "UqrSv-EkSNA",
    title: "Sun Kargha demonstration at IIM Bangalore",
    description: "Live demonstration of the solar-assisted handloom platform.",
  },
  {
    id: "iRDKv3Mokcc",
    title: "GramSootra — app for reelers, weavers & farmers",
    description:
      "Overview of the digital marketplace connecting the rural textile value chain.",
  },
] as const;

/** Shown on the home page (subset) */
export const HOME_FEATURED_VIDEOS = [
  FEATURED_VIDEOS[0],
  FEATURED_VIDEOS[1],
  FEATURED_VIDEOS[2],
] as const;

export const GRAMSOOTRA_VIDEO_ID = "iRDKv3Mokcc";
