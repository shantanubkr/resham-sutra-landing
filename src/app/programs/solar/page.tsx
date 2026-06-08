import type { Metadata } from "next";
import { ProgramDetail } from "@/components/programs/ProgramDetail";

export const metadata: Metadata = {
  title: "Solar Livelihood Program",
  description:
    "Solar-powered silk reeling machines with 400% higher productivity, zero fuel cost, and carbon credits for rural artisans.",
};

export default function SolarPage() {
  return <ProgramDetail slug="solar" />;
}
