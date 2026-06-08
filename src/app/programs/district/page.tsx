import type { Metadata } from "next";
import { ProgramDetail } from "@/components/programs/ProgramDetail";

export const metadata: Metadata = {
  title: "District Deployment Model",
  description:
    "Government-scale silk livelihood rollout across an entire district with MoU support, training, machines, and impact reporting.",
};

export default function DistrictPage() {
  return <ProgramDetail slug="district" />;
}
