import Image from "next/image";
import { ABOUT_IMAGES, ABOUT_INTRO } from "@/lib/about";

export function AboutIntro() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            {ABOUT_INTRO.headline}
          </h2>
          <div className="mt-6 space-y-4">
            {ABOUT_INTRO.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="leading-relaxed text-[#555555]">
                {paragraph}
              </p>
            ))}
          </div>
          <blockquote className="mt-8 border-l-4 border-brand-green pl-4">
            <p className="text-lg font-medium text-[#1A1A1A] italic">
              &ldquo;We don&apos;t hand out machines. We build ecosystems.&rdquo;
            </p>
          </blockquote>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-xl sm:aspect-[3/4]">
          <div
            className="absolute -top-3 -left-3 z-10 h-16 w-1 rounded-full bg-brand-purple"
            aria-hidden
          />
          <Image
            src={ABOUT_IMAGES.artisan}
            alt="Artisan woman holding mulberry branches with silk cocoons"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
