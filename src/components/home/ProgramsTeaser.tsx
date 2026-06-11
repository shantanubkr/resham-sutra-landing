import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProgramIcon } from "@/components/programs/ProgramIcon";
import { PROGRAMS } from "@/lib/constants";
import { PRODUCT_CATEGORY_ACCENTS } from "@/lib/brand-styles";
import { BRAND_IMAGES } from "@/lib/images";
import { PRODUCT_HUB_SECTIONS } from "@/lib/products";
import { GRAMSOOTRA } from "@/lib/programs";

const PROGRAM_ACCENTS = [
  {
    border: "border-t-brand-green",
    icon: "bg-brand-green text-white",
    hover: "hover:border-brand-green/30",
  },
  {
    border: "border-t-[#FCE900]",
    icon: "bg-[#FCE900] text-[#1A1A1A]",
    hover: "hover:border-[#FCE900]/50",
  },
  {
    border: "border-t-brand-purple",
    icon: "bg-brand-purple text-white",
    hover: "hover:border-brand-purple/30",
  },
] as const;

export function ProgramsTeaser() {
  return (
    <section
      id="programs-offering"
      className="relative scroll-mt-28 border-t border-[#EEEEEE] bg-white"
    >
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-green/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-wider text-brand-green uppercase">
            Programs & offerings
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Partner programs,{" "}
            <span className="rounded-lg bg-brand-purple/15 px-1.5 text-brand-purple">
              products
            </span>
            , and our digital platform
          </h2>
          <p className="mt-3 text-[#555555]">
            Full rollout packages for institutions, plus machines, materials, and
            services for producers and buyers on the ground.
          </p>
        </div>

        <div className="mt-10">
          <p className="text-xs font-bold tracking-wider text-[#555555] uppercase">
            Programs for partners
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-3">
            {PROGRAMS.map((program, index) => {
              const accent = PROGRAM_ACCENTS[index];
              return (
                <article
                  key={program.href}
                  className={`group flex flex-col overflow-hidden rounded-xl border border-[#EEEEEE] border-t-4 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] ${accent.border} ${accent.hover}`}
                >
                  <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-lg ${accent.icon}`}
                    >
                      <ProgramIcon name={program.icon} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold leading-snug text-[#1A1A1A]">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#555555]">{program.tagline}</p>
                    <div className="mt-auto pt-6">
                      <Link
                        href={program.href}
                        className="inline-flex text-sm font-semibold text-[#1A1A1A] underline-offset-4 hover:text-brand-purple hover:underline"
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-4 flex justify-end">
            <Link
              href="/programs"
              className="text-sm font-semibold text-brand-purple underline-offset-4 hover:underline"
            >
              View all programs →
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-xs font-bold tracking-wider text-[#555555] uppercase">
            Machines, materials & services
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            {PRODUCT_HUB_SECTIONS.map((section) => {
              const accent = PRODUCT_CATEGORY_ACCENTS[section.category];
              return (
                <Link
                  key={section.category}
                  href={section.href}
                  className={`group flex flex-col overflow-hidden rounded-xl border border-[#EEEEEE] border-t-4 bg-white transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] ${accent.border} ${accent.hover}`}
                >
                  <div className="relative h-28 overflow-hidden sm:h-32">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p
                      className={`text-[10px] font-bold tracking-wider uppercase sm:text-xs ${accent.eyebrow}`}
                    >
                      {section.count}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-[#1A1A1A]">
                      {section.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-[#555555] sm:text-sm">
                      {section.description}
                    </p>
                    <span className="mt-4 text-xs font-semibold text-[#1A1A1A] group-hover:text-brand-purple sm:text-sm">
                      Browse →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border-2 border-brand-purple/25 bg-[linear-gradient(135deg,rgba(97,94,170,0.1)_0%,rgba(255,255,255,1)_45%,rgba(4,184,72,0.08)_100%)] shadow-[0_8px_40px_rgba(97,94,170,0.12)]">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_1.4fr] lg:items-center lg:gap-10">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-[#EEEEEE] bg-white shadow-sm sm:h-28 sm:w-28">
                <Image
                  src={BRAND_IMAGES.gramsootra}
                  alt="GramSootra logo"
                  fill
                  className="object-contain p-2"
                  sizes="112px"
                />
              </div>
              <p className="mt-4 text-sm font-bold tracking-wider text-brand-purple uppercase">
                Digital marketplace
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
                {GRAMSOOTRA.title}
              </h3>
              <p className="mt-2 text-sm text-[#555555] sm:text-base">
                {GRAMSOOTRA.tagline}
              </p>
            </div>

            <div>
              <p className="text-[#555555] leading-relaxed">{GRAMSOOTRA.description}</p>
              <ul className="mt-5 space-y-2">
                {GRAMSOOTRA.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[#1A1A1A]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={GRAMSOOTRA.url} className="sm:shrink-0">
                  Visit GramSootra
                </Button>
                <Link
                  href="/#videos"
                  className="text-center text-sm font-semibold text-brand-purple underline-offset-4 hover:underline sm:text-left"
                >
                  Watch the app demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
