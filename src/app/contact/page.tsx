import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { HIGHLIGHT_GREEN } from "@/lib/brand-styles";
import { CONTACT_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Partner with Resham Sutra. Reach out as an NGO, CSR team, government body, or individual supporter.",
};

function FormFallback() {
  return (
    <div className="rounded-xl border border-[#EEEEEE] bg-white p-8 sm:p-12">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-[#FAFAFA]" />
      <div className="mt-4 h-4 w-full animate-pulse rounded bg-[#FAFAFA]" />
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-20 animate-pulse rounded-xl bg-[#FAFAFA]" />
        ))}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Partner <span className={HIGHLIGHT_GREEN}>with us</span>
          </>
        }
        description="One form, routed to the right team. No long processes, just a conversation about what you want to achieve together."
        image={CONTACT_IMAGES.hero}
        imageAlt="Partnership event"
      />

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-16 lg:px-8 lg:py-20">
          <ContactInfo />
          <Suspense fallback={<FormFallback />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
