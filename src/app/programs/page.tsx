import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { AudienceGuide } from "@/components/programs/AudienceGuide";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { PROGRAM_SLUGS } from "@/lib/programs";
import { HIGHLIGHT_PURPLE } from "@/lib/brand-styles";
import { PROGRAM_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Three distinct programs for NGOs, CSR teams, and government bodies: Women Silk Clusters, Solar Livelihood, and District Deployment.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Three programs. <span className={HIGHLIGHT_PURPLE}>One</span> proven
            model.
          </>
        }
        description="Three integrated packages for NGOs, CSR teams, and government bodies. Individuals and producers looking for a single machine, yarn, or service can explore Products."
        image={PROGRAM_IMAGES.hubHero}
        imageAlt="Partnership signing ceremony"
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-20">
          {PROGRAM_SLUGS.map((slug) => (
            <ProgramCard key={slug} slug={slug} />
          ))}
        </div>
      </section>

      <AudienceGuide />
    </>
  );
}
