import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { HERO_IMAGE, HERO_STATS } from "@/lib/constants";

const STAT_ACCENTS = [
  "border-[#FCE900] text-[#1A1A1A]",
  "border-brand-green text-brand-green",
  "border-brand-purple text-brand-purple",
  "border-[#FCE900] text-[#1A1A1A]",
] as const;

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Women artisans processing silk cocoons together"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.55)_38%,rgba(255,255,255,0.12)_58%,transparent_72%)]" />

      <div
        className="pointer-events-none absolute top-32 left-0 h-56 w-56 rounded-full bg-brand-green/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-8 bottom-32 h-48 w-48 rounded-full bg-brand-purple/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-20">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#EEEEEE] bg-white/80 px-3 py-1 text-sm font-medium text-[#555555] backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-brand-green" aria-hidden />
            Social enterprise · 16 states · Since 2012
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            <span className="block">We build</span>
            <span className="mt-1 block w-fit rounded-lg bg-[#FCE900] px-2 py-0.5 text-[#1A1A1A]">
              silk livelihood ecosystems
            </span>
            <span className="mt-1 block">for rural women</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#555555] sm:text-xl sm:leading-relaxed">
            Training, solar-powered machinery, and market access, enabling
            artisan communities to become financially independent.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact">Partner With Us</Button>
            <Button href="/impact" variant="secondary">
              See Our Impact
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
            {HERO_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`border-l-2 pl-3 ${STAT_ACCENTS[index]}`}
              >
                <dt className="text-3xl font-bold tracking-tight sm:text-4xl">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={"suffix" in stat ? stat.suffix : undefined}
                  />
                </dt>
                <dd className="mt-2 text-sm leading-snug text-[#555555]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
