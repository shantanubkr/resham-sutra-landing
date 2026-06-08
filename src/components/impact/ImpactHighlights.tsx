import Image from "next/image";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { IMPACT_HIGHLIGHTS, IMPACT_PILLARS, RESEARCH_HIGHLIGHTS, RESEARCH_SOURCES } from "@/lib/impact";
import {
  EYEBROW_PURPLE,
  HIGHLIGHT_GREEN,
  STAT_BADGES,
} from "@/lib/brand-styles";

const PILLAR_BORDERS = [
  "border-t-brand-green",
  "border-t-[#FCE900]",
  "border-t-brand-purple",
] as const;

export function ImpactHighlights() {
  return (
    <section className="border-y border-[#EEEEEE] bg-[#FAFAFA]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className={EYEBROW_PURPLE}>By the numbers</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Scale that <span className={HIGHLIGHT_GREEN}>matters</span>
          </h2>
          <p className="mt-4 text-[#555555]">
            A few numbers to ground the stories above. Every figure represents
            real communities on the ground.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {IMPACT_HIGHLIGHTS.map((item, index) => (
            <article
              key={item.label}
              className="rounded-xl border border-[#EEEEEE] bg-white p-6 transition-colors hover:border-brand-green/20"
            >
              <p className="text-3xl font-bold text-[#1A1A1A]">
                <span
                  className={`rounded-lg px-2 py-0.5 ${STAT_BADGES[index % STAT_BADGES.length]}`}
                >
                  <AnimatedNumber
                    value={item.value}
                    suffix={"suffix" in item ? item.suffix : undefined}
                  />
                </span>{" "}
                <span className="text-xl font-semibold">{item.label}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                {item.personal}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 max-w-2xl">
          <p className="text-sm font-bold tracking-wider text-brand-purple uppercase">
            Verified by research
          </p>
          <p className="mt-2 text-[#555555]">
            Independent surveys with spinners on the ground — not marketing claims.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RESEARCH_HIGHLIGHTS.map((item, index) => (
            <article
              key={item.label}
              className="rounded-xl border border-brand-purple/15 bg-white p-5"
            >
              <p className="text-2xl font-bold text-[#1A1A1A]">
                <span
                  className={`rounded-lg px-2 py-0.5 ${STAT_BADGES[index % STAT_BADGES.length]}`}
                >
                  <AnimatedNumber
                    value={item.value}
                    suffix={"suffix" in item ? item.suffix : undefined}
                  />
                </span>
              </p>
              <p className="mt-2 text-sm font-semibold text-[#1A1A1A]">
                {item.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#555555]">
                {item.detail}
              </p>
            </article>
          ))}
        </div>

        <ul className="mt-8 space-y-1 text-xs text-[#555555]">
          {RESEARCH_SOURCES.map((source) => (
            <li key={source.title}>
              <span className="font-medium text-[#1A1A1A]">{source.title}</span>
              {" — "}
              {source.publisher}
              {source.year ? ` (${source.year})` : ""}
              {source.note ? ` · ${source.note}` : ""}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {IMPACT_PILLARS.map((pillar, index) => (
            <article
              key={pillar.title}
              className={`overflow-hidden rounded-xl border border-[#EEEEEE] border-t-4 bg-white ${PILLAR_BORDERS[index % PILLAR_BORDERS.length]}`}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[#1A1A1A]">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                  {pillar.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
