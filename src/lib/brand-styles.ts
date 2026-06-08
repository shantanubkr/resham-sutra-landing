import type { ProgramSlug } from "@/lib/programs";
import type { ProductCategory } from "@/lib/products";

export const EYEBROW_GREEN =
  "text-sm font-bold uppercase tracking-wider text-brand-green";
export const EYEBROW_PURPLE =
  "text-sm font-bold uppercase tracking-wider text-brand-purple";

export const HIGHLIGHT_YELLOW = "rounded-lg bg-[#FCE900] px-1.5";
export const HIGHLIGHT_GREEN =
  "rounded-lg bg-brand-green/15 px-1.5 text-brand-green";
export const HIGHLIGHT_PURPLE =
  "rounded-lg bg-brand-purple/15 px-1.5 text-brand-purple";

export const STAT_BADGES = [
  "bg-[#FCE900] text-[#1A1A1A]",
  "bg-brand-green/15 text-brand-green",
  "bg-brand-purple/15 text-brand-purple",
  "bg-[#FCE900] text-[#1A1A1A]",
  "bg-brand-green/15 text-brand-green",
  "bg-brand-purple/15 text-brand-purple",
] as const;

export const DOT_CYCLE = [
  "bg-[#FCE900]",
  "bg-brand-green",
  "bg-brand-purple",
] as const;

export const ICON_BG_CYCLE = [
  "bg-[#FCE900] text-[#1A1A1A]",
  "bg-brand-green text-white",
  "bg-brand-purple text-white",
  "bg-[#FCE900]/40 text-[#1A1A1A]",
] as const;

export const CHECKMARK_CYCLE = [
  "bg-[#FCE900] text-[#1A1A1A]",
  "bg-brand-green text-white",
  "bg-brand-purple text-white",
] as const;

export const STEP_BADGE_CYCLE = [
  "bg-[#FCE900] text-[#1A1A1A]",
  "bg-brand-green text-white",
  "bg-brand-purple text-white",
  "bg-[#FCE900] text-[#1A1A1A]",
] as const;

export const PRODUCT_CATEGORY_ACCENTS: Record<
  ProductCategory,
  { border: string; icon: string; hover: string; dot: string; eyebrow: string }
> = {
  machines: {
    border: "border-t-[#FCE900]",
    icon: "bg-[#FCE900] text-[#1A1A1A]",
    hover: "hover:border-[#FCE900]/50",
    dot: "bg-[#FCE900]",
    eyebrow: "text-[#1A1A1A]",
  },
  items: {
    border: "border-t-brand-green",
    icon: "bg-brand-green text-white",
    hover: "hover:border-brand-green/30",
    dot: "bg-brand-green",
    eyebrow: "text-brand-green",
  },
  services: {
    border: "border-t-brand-purple",
    icon: "bg-brand-purple text-white",
    hover: "hover:border-brand-purple/30",
    dot: "bg-brand-purple",
    eyebrow: "text-brand-purple",
  },
};

export const PROGRAM_SLUG_ACCENTS: Record<
  ProgramSlug,
  { border: string; icon: string; hover: string; dot: string }
> = {
  clusters: {
    border: "border-t-brand-green",
    icon: "bg-brand-green text-white",
    hover: "hover:border-brand-green/30",
    dot: "bg-brand-green",
  },
  solar: {
    border: "border-t-[#FCE900]",
    icon: "bg-[#FCE900] text-[#1A1A1A]",
    hover: "hover:border-[#FCE900]/50",
    dot: "bg-[#FCE900]",
  },
  district: {
    border: "border-t-brand-purple",
    icon: "bg-brand-purple text-white",
    hover: "hover:border-brand-purple/30",
    dot: "bg-brand-purple",
  },
};

export const PAGE_CTA_WRAPPER =
  "rounded-3xl bg-[linear-gradient(90deg,#FCE900,#04B648,#615EAA)] p-[3px] shadow-[0_8px_40px_rgba(0,0,0,0.08)]";

export const PAGE_CTA_INNER =
  "relative overflow-hidden rounded-[21px] bg-white px-6 py-12 text-center sm:px-12 sm:py-16";

export const INPUT_FOCUS =
  "focus:border-brand-green focus:ring-2 focus:ring-brand-green/30";
