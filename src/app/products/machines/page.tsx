import type { Metadata } from "next";
import { CategoryPageHero } from "@/components/products/CategoryPageHero";
import { OfferingCard } from "@/components/products/OfferingCard";
import { ProgramsCrossLink } from "@/components/products/ProgramsCrossLink";
import { PageCTA } from "@/components/ui/PageCTA";
import { SITE_METRICS } from "@/lib/metrics";
import {
  MACHINE_STATS,
  MACHINES,
  PRODUCT_PAGE_IMAGES,
  getProductContactHref,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Machines",
  description:
    "Buniyaad, Unnati, Silky Spin, Sonalika, Sun Kargha, Pro-wet Reel, Handy MRTM, Dyna Charkha, Saral Re-reeling, Abha, and Mulberry reeling — solar-powered silk machines for rural producers.",
};

export default function MachinesPage() {
  return (
    <>
      <CategoryPageHero
        category="machines"
        title="Breakthrough machines for rural producers"
        description={`Cost-effective, energy-efficient equipment for silk yarn and fabric. ${SITE_METRICS.machinesDeployed.toLocaleString("en-IN")}+ machines installed with solar power, finance, and subsidy support where applicable.`}
        image={PRODUCT_PAGE_IMAGES.machinesHero}
      />

      <section className="border-b border-[#EEEEEE] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {MACHINE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] px-4 py-5 text-center"
              >
                <p className="text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[#555555] sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-[#555555]">
            Easy to use · Finance & subsidy support available
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-6 lg:px-8 lg:py-16">
          {MACHINES.map((machine) => (
            <OfferingCard
              key={machine.slug}
              category="machines"
              slug={machine.slug}
              name={machine.name}
              tagline={machine.tagline}
              description={machine.description}
              highlights={machine.highlights}
              image={machine.image}
            />
          ))}
        </div>
      </section>

      <ProgramsCrossLink />

      <PageCTA
        badge="Machine enquiry"
        badgeDot="green"
        title="Ready to deploy a machine?"
        description="Share your location and production goals. We will recommend the right model and connect you with training and support options."
        primaryHref={getProductContactHref("machines")}
        primaryLabel="Enquire about machines"
        secondaryHref="/programs/solar"
        secondaryLabel="Solar program for partners"
      />
    </>
  );
}
