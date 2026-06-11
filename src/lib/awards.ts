export type AwardEntry = {
  id: string;
  title: string;
  organization: string;
  /** Display year on the card badge */
  year: number;
  /** Optional subtitle when year alone is not enough (e.g. Ashden 2019 + 2025 finalist) */
  yearLabel?: string;
  type: "award" | "grant";
};

export const AWARDS = [
  {
    id: "national-startup-agri-tech",
    title: "Top Startups in Agri-Tech",
    organization: "National Startup Mission",
    year: 2020,
    type: "award",
  },
  {
    id: "asme-ishow",
    title: "ASME iShow Innovation Award",
    organization: "ASME",
    year: 2019,
    type: "award",
  },
  {
    id: "ashden",
    title: "Ashden Award",
    organization: "Ashden",
    year: 2025,
    yearLabel: "2019 · 2025 Finalist",
    type: "award",
  },
  {
    id: "scf-sidbi",
    title: "Swavalambhan Challenge Fund (SCF) Grant",
    organization: "SIDBI",
    year: 2024,
    type: "grant",
  },
  {
    id: "amara-raja",
    title: "Better Way Award",
    organization: "Amara Raja",
    year: 2024,
    type: "award",
  },
  {
    id: "climate-innovation",
    title: "Climate Innovation Award",
    organization: "SELCO Foundation × KULA Innovate",
    year: 2024,
    type: "award",
  },
] as const satisfies readonly AwardEntry[];
