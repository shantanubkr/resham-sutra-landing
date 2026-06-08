import Image from "next/image";
import { ABOUT_IMAGES } from "@/lib/about";
import { EYEBROW_PURPLE, HIGHLIGHT_YELLOW } from "@/lib/brand-styles";

export function AboutHero() {
  return (
    <section className="relative min-h-[50vh] overflow-hidden sm:min-h-[55vh]">
      <Image
        src={ABOUT_IMAGES.hero}
        alt="Women artisans working together in a rural silk production centre"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.7)_45%,rgba(255,255,255,0.2)_70%,transparent_85%)]" />

      <div
        className="pointer-events-none absolute top-24 right-0 h-48 w-48 rounded-full bg-brand-purple/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[50vh] max-w-6xl items-end px-4 pb-12 pt-28 sm:min-h-[55vh] sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="max-w-2xl">
          <p className={EYEBROW_PURPLE}>Who we are</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">
            About <span className={HIGHLIGHT_YELLOW}>Resham Sutra</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[#555555]">
            A social enterprise building silk livelihood ecosystems for rural
            women across India.
          </p>
        </div>
      </div>
    </section>
  );
}
