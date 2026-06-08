import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";
import { PARTNERS, splitPartnersForMarquee } from "@/lib/partners";

const [PARTNER_ROW_A, PARTNER_ROW_B] = splitPartnersForMarquee(PARTNERS);

function PartnerCard({
  name,
  image,
  state,
}: {
  name: string;
  image?: string;
  state?: string;
}) {
  return (
    <div className="flex h-[148px] w-[200px] shrink-0 flex-col items-center justify-center rounded-lg border border-[#EEEEEE] bg-white px-4 py-3 shadow-sm transition-colors hover:border-brand-green/30 sm:w-[220px]">
      <div className="relative flex h-16 w-full items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain object-center"
            sizes="220px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-md bg-brand-purple/[0.06] px-2">
            <span className="text-center text-[11px] font-bold leading-tight text-brand-purple sm:text-xs">
              {name.split(" ").slice(0, 3).join(" ")}
            </span>
          </div>
        )}
      </div>
      <p className="mt-3 line-clamp-2 text-center text-[10px] font-medium leading-snug text-[#555555] sm:text-xs">
        {name}
        {state ? ` · ${state}` : ""}
      </p>
    </div>
  );
}

function PartnerMarqueeRow({
  partners,
  reverse = false,
}: {
  partners: readonly (typeof PARTNERS)[number][];
  reverse?: boolean;
}) {
  const items = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20" />

      <div
        className={`flex w-max gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {items.map((partner, index) => (
          <PartnerCard
            key={`${partner.slug}-${index}`}
            name={partner.name}
            image={partner.image}
            state={partner.state}
          />
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <p className="text-sm font-bold tracking-wider text-brand-purple uppercase">
            Our network
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A]">
            Trusted by institutions across India
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#555555]">
            Strategic funders, state bodies, and on-ground organisations partner
            with us to scale rural silk livelihoods.
          </p>
        </div>
      </div>

      <div className="space-y-4 pb-4">
        <PartnerMarqueeRow partners={PARTNER_ROW_A} />
        <PartnerMarqueeRow partners={PARTNER_ROW_B} reverse />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-20">
        <div className="overflow-hidden rounded-xl border border-[#EEEEEE] shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
          <div className="grid md:grid-cols-[1.15fr_1fr]">
            <div className="bg-[#FCE900] px-6 py-10 sm:px-10 sm:py-12">
              <p className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]/70">
                Join our partners
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-3xl">
                Want to join our network?
              </h3>
              <p className="mt-4 text-[#1A1A1A]/80 sm:text-lg">
                From state governments to CSR teams, partners choose us for a
                proven model, documented impact, and scale across rural India.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {["NGOs", "CSR Teams", "Government", "Institutions"].map(
                  (tag) => (
                    <li
                      key={tag}
                      className="rounded-lg border border-[#1A1A1A]/10 bg-white/60 px-3 py-1.5 text-xs font-semibold text-[#1A1A1A]"
                    >
                      {tag}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="flex flex-col justify-center bg-brand-purple/[0.04] px-6 py-10 sm:px-10 sm:py-12">
              <p className="text-sm font-medium text-[#555555]">
                {PARTNERS.length}+ institutions already work with us. Yours
                could be next.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <Button href="/contact" className="w-full">
                  Partner With Us
                </Button>
                <Button href="/contact" variant="secondary" className="w-full">
                  Contact Us
                </Button>
              </div>

              <div className="mt-6 space-y-2 border-t border-[#EEEEEE] pt-6 text-sm text-[#555555]">
                <p>
                  Prefer to talk first?{" "}
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                    className="font-semibold text-[#1A1A1A] underline-offset-4 hover:underline"
                  >
                    {CONTACT.phone}
                  </a>
                </p>
                <p>
                  Or email{" "}
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="font-semibold text-[#1A1A1A] underline-offset-4 hover:underline"
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
