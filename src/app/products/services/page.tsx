import type { Metadata } from "next";
import { CategoryPageHero } from "@/components/products/CategoryPageHero";
import { OfferingCard } from "@/components/products/OfferingCard";
import { ProgramsCrossLink } from "@/components/products/ProgramsCrossLink";
import { PageCTA } from "@/components/ui/PageCTA";
import {
  PRODUCT_PAGE_IMAGES,
  SERVICES,
  getProductContactHref,
} from "@/lib/products";
import { GRAMSOOTRA_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Rural Experience Centres, raw material banks, facility centres, certification, training, and Gramsootra digital platform.",
};

export default function ServicesPage() {
  return (
    <>
      <CategoryPageHero
        category="services"
        title="End-to-end producer support"
        description="Beyond machinery, Resham Sutra builds sustainable livelihoods through training hubs, input supply, safe workspaces, certification, and a digital platform for the full value chain."
        image={PRODUCT_PAGE_IMAGES.servicesHero}
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-6 lg:px-8 lg:py-16">
          {SERVICES.map((service) => (
            <OfferingCard
              key={service.slug}
              category="services"
              slug={service.slug}
              name={service.name}
              tagline={service.tagline}
              description={service.description}
              highlights={service.highlights}
              image={service.image}
            />
          ))}
        </div>
      </section>

      <ProgramsCrossLink />

      <PageCTA
        badge="Service enquiry"
        badgeDot="purple"
        title="Need training or platform access?"
        description="For training, REC visits, or other Resham Sutra services — describe what you need. For the GramSootra app and marketplace, visit gramsootra.in."
        primaryHref={getProductContactHref("services")}
        primaryLabel="Ask about services"
        secondaryHref={GRAMSOOTRA_URL}
        secondaryLabel="Visit GramSootra"
      />
    </>
  );
}
