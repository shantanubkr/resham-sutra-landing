import Image from "next/image";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { IMPACT_IMAGE, IMPACT_STATS } from "@/lib/constants";

const STAT_BADGES = [
  "bg-[#FCE900] text-[#1A1A1A]",
  "bg-brand-green/15 text-brand-green",
  "bg-brand-purple/15 text-brand-purple",
  "bg-[#FCE900] text-[#1A1A1A]",
  "bg-brand-green/15 text-brand-green",
  "bg-brand-purple/15 text-brand-purple",
] as const;

export function ImpactStrip() {
  return (
    <section className="relative border-y border-[#EEEEEE] bg-[#FAFAFA]">
      <div
        className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-brand-purple/5 blur-3xl"
        aria-hidden
      />

      <div className="grid lg:h-[480px] lg:grid-cols-2 xl:h-[520px]">
        <div className="flex flex-col justify-center px-4 py-10 sm:px-8 sm:py-12 lg:overflow-hidden lg:px-10 lg:py-8 xl:px-12">
          <div>
            <p className="text-xs font-bold tracking-wider text-brand-purple uppercase">
              Our Reach
            </p>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
              <span className="rounded-lg bg-brand-green/15 px-1.5 text-brand-green">
                Impact
              </span>{" "}
              at a glance
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#555555] sm:text-base">
              Numbers with context, because scale only matters when you can
              measure what changes for the women we work with.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            {IMPACT_STATS.map((stat, index) => (
              <article
                key={stat.context}
                className="rounded-lg border border-[#EEEEEE] bg-white p-3 transition-colors hover:border-brand-green/20"
              >
                <p className="text-xl font-bold sm:text-2xl">
                  <span
                    className={`inline-block rounded-md px-1.5 py-0.5 ${STAT_BADGES[index]}`}
                  >
                    <AnimatedNumber
                      value={stat.value}
                      prefix={
                        "prefix" in stat
                          ? (stat as { prefix?: string }).prefix
                          : undefined
                      }
                      suffix={
                        "suffix" in stat
                          ? (stat as { suffix?: string }).suffix
                          : undefined
                      }
                    />
                  </span>
                </p>
                <p className="mt-1 text-xs leading-snug font-medium text-[#1A1A1A]">
                  {stat.context}
                </p>
                <p className="mt-1 text-xs leading-snug text-[#555555]">
                  {stat.detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative h-52 sm:h-60 lg:h-full lg:min-h-0">
          <div
            className="absolute top-4 left-4 z-10 h-12 w-1 rounded-full bg-brand-green"
            aria-hidden
          />
          <Image
            src={IMPACT_IMAGE}
            alt="Women operating solar-powered silk reeling machines at a rural facility"
            fill
            className="object-cover object-[35%_center]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
