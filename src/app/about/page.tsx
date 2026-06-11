import type { Metadata } from "next";
import { AboutCTA } from "@/components/about/AboutCTA";
import { AwardsSection } from "@/components/home/AwardsSection";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutJourney } from "@/components/about/AboutJourney";
import { AboutTeam } from "@/components/about/AboutTeam";
import { VisionMission } from "@/components/about/VisionMission";

export const metadata: Metadata = {
  title: "About",
  description:
    "Resham Sutra is a social enterprise enabling rural artisan communities through sustainable silk production, solar-powered machinery, and market access across India.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <VisionMission />
      <AboutJourney />
      <AwardsSection />
      <AboutTeam />
      <AboutCTA />
    </>
  );
}
