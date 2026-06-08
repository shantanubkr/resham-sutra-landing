import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageCTA } from "@/components/ui/PageCTA";
import { ProductsHubCards } from "@/components/products/ProductsHubCards";
import { ProgramsCrossLink } from "@/components/products/ProgramsCrossLink";
import { HIGHLIGHT_PURPLE } from "@/lib/brand-styles";
import { PRODUCT_PAGE_IMAGES, getProductContactHref } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Solar silk machines, cocoons and yarns, and rural livelihood services for individual producers and buyers.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="For producers & buyers"
        title={
          <>
            Machines, products,{" "}
            <span className={HIGHLIGHT_PURPLE}>and services</span>
          </>
        }
        description="Browse individual machines, buy cocoons and yarn, or access training and digital tools. Organisations deploying at scale should explore Programs for bundled packages."
        image={PRODUCT_PAGE_IMAGES.hubHero}
        imageAlt="Women operating solar silk reeling machines"
      />

      <ProductsHubCards />
      <ProgramsCrossLink />

      <PageCTA
        badge="Individual enquiry"
        badgeDot="green"
        title="Interested in a machine or yarn?"
        description="Tell us what you need — machine model, raw materials, or a service — and we will connect you to the right team."
        primaryHref={getProductContactHref("machines")}
        primaryLabel="Get in touch"
        secondaryHref="/programs"
        secondaryLabel="View programs for organisations"
      />
    </>
  );
}
