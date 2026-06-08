import type { Metadata } from "next";
import { ProgramDetail } from "@/components/programs/ProgramDetail";

export const metadata: Metadata = {
  title: "Women Silk Livelihood Clusters",
  description:
    "Full silk production ecosystems built district by district. Training, machines, raw material banks, and market access for ~100 women per cluster.",
};

export default function ClustersPage() {
  return <ProgramDetail slug="clusters" />;
}
