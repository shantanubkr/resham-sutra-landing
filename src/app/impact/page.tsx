import type { Metadata } from "next";
import { ImpactCalculator } from "@/components/impact/ImpactCalculator";
import { ImpactCTA } from "@/components/impact/ImpactCTA";
import { ImpactGeography } from "@/components/impact/ImpactGeography";
import { ImpactHero } from "@/components/impact/ImpactHero";
import { ImpactHighlights } from "@/components/impact/ImpactHighlights";
import { ImpactStories } from "@/components/impact/ImpactStories";
import { VideoGallery } from "@/components/media/VideoGallery";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Real stories of income uplift, training, and community-led silk livelihoods across 16 states of India. See what Resham Sutra's work looks like on the ground.",
};

export default function ImpactPage() {
  return (
    <>
      <ImpactHero />
      <ImpactStories />
      <ImpactHighlights />
      <ImpactCalculator />
      <ImpactGeography />
      <VideoGallery id="videos" />
      <ImpactCTA />
    </>
  );
}
