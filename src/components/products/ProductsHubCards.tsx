import Image from "next/image";
import Link from "next/link";
import {
  EYEBROW_GREEN,
  HIGHLIGHT_PURPLE,
  PRODUCT_CATEGORY_ACCENTS,
} from "@/lib/brand-styles";
import { ECOSYSTEM_PILLARS, PRODUCT_HUB_SECTIONS } from "@/lib/products";

export function ProductsHubCards() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:gap-6 lg:px-8 lg:py-16">
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
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p
                    className={`text-[10px] font-bold tracking-wider uppercase sm:text-xs ${accent.eyebrow}`}
                  >
                    {section.count}
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-[#1A1A1A] sm:text-xl">
                    {section.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-[#555555] sm:text-sm">
                    {section.description}
                  </p>
                  <span className="mt-4 text-xs font-semibold text-[#1A1A1A] group-hover:text-brand-purple sm:text-sm">
                    Browse {section.title.toLowerCase()} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[#EEEEEE] bg-[#FAFAFA]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className={EYEBROW_GREEN}>Farm to fabric</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            The ecosystem behind{" "}
            <span className={HIGHLIGHT_PURPLE}>every machine</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[#555555]">
            Resham Sutra integrates the full rural textile value chain — from
            silk farming collectives to certification and sales. Programs bundle
            these for partners; here you can explore each piece on its own.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ECOSYSTEM_PILLARS.map((pillar, index) => (
              <li
                key={pillar}
                className="flex items-start gap-3 rounded-xl border border-[#EEEEEE] bg-white px-4 py-3 text-sm text-[#1A1A1A]"
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                    index % 3 === 0
                      ? "bg-[#FCE900] text-[#1A1A1A]"
                      : index % 3 === 1
                        ? "bg-brand-green text-white"
                        : "bg-brand-purple text-white"
                  }`}
                >
                  {index + 1}
                </span>
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
