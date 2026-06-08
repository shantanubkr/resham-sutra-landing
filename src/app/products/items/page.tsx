import type { Metadata } from "next";
import { CategoryPageHero } from "@/components/products/CategoryPageHero";
import { OfferingCard } from "@/components/products/OfferingCard";
import { ProgramsCrossLink } from "@/components/products/ProgramsCrossLink";
import { PageCTA } from "@/components/ui/PageCTA";
import {
  MARKETPLACE_ITEMS,
  PRODUCT_PAGE_IMAGES,
  getProductContactHref,
} from "@/lib/products";
import { GRAMSOOTRA_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Products — Cocoons & Yarns",
  description:
    "Buy quality-assured cocoons and silk yarn from certified rural producers via Resham Sutra marketplace channels.",
};

export default function ProductItemsPage() {
  return (
    <>
      <CategoryPageHero
        category="items"
        title="Cocoons and silk yarns"
        description="Access inputs and finished yarn without middlemen. Products are marketed through Gramsootra and offline networks with rural lab certification and origin traceability."
        image={PRODUCT_PAGE_IMAGES.itemsHero}
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:gap-6 lg:px-8 lg:py-16">
          {MARKETPLACE_ITEMS.map((item) => (
            <OfferingCard
              key={item.slug}
              category="items"
              slug={item.slug}
              name={item.name}
              tagline={item.tagline}
              description={item.description}
              highlights={item.highlights}
              image={item.image}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-[#EEEEEE] bg-[#FAFAFA]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-[#1A1A1A]">How to buy</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#555555]">
            <li className="flex gap-2">
              <span className="font-semibold text-brand-green">Partner with us</span>
              — NGOs and institutions sourcing for clusters
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-brand-green">Buy from us</span>
              — Wholesale and retail yarn enquiries
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-brand-green">Work with us</span>
              — Producers selling through{" "}
              <a
                href={GRAMSOOTRA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-purple underline-offset-4 hover:underline"
              >
                GramSootra
              </a>
            </li>
          </ul>
        </div>
      </section>

      <ProgramsCrossLink />

      <PageCTA
        badge="Buy from us"
        badgeDot="green"
        title="Source cocoons or yarn?"
        description="Whether you are a weaver, buyer, or producer group, tell us what you need and we will route your enquiry."
        primaryHref={getProductContactHref("items")}
        primaryLabel="Enquire to buy"
      />
    </>
  );
}
