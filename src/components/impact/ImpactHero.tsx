import Image from "next/image";
import { IMPACT_PAGE_IMAGES } from "@/lib/impact";
import { EYEBROW_GREEN, HIGHLIGHT_YELLOW } from "@/lib/brand-styles";

export function ImpactHero() {
  return (
    <section className="relative min-h-[45vh] overflow-hidden sm:min-h-[50vh]">
      <Image
        src={IMPACT_PAGE_IMAGES.hero}
        alt="Women artisans processing silk cocoons together"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.65)_50%,rgba(255,255,255,0.15)_75%,transparent_90%)]" />

      <div
        className="pointer-events-none absolute bottom-20 left-0 h-40 w-40 rounded-full bg-brand-green/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[45vh] max-w-6xl items-end px-4 pb-12 pt-28 sm:min-h-[50vh] sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="max-w-2xl">
          <p className={EYEBROW_GREEN}>Our Impact</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">
            Behind every number is a{" "}
            <span className={HIGHLIGHT_YELLOW}>woman</span> who changed her life
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[#555555]">
            We measure impact in income uplift, confidence, and communities that
            no longer wait for work to come to them — backed by CEEW and 60
            Decibels field research with hundreds of spinners.
          </p>
        </div>
      </div>
    </section>
  );
}
