import Image from "next/image";
import type { ReactNode } from "react";
import { EYEBROW_GREEN } from "@/lib/brand-styles";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageAlt?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section className="relative min-h-[40vh] overflow-hidden sm:min-h-[45vh]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.7)_45%,rgba(255,255,255,0.2)_70%,transparent_85%)]" />

      <div className="relative mx-auto flex min-h-[40vh] max-w-6xl items-end px-4 pb-12 pt-28 sm:min-h-[45vh] sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="max-w-2xl">
          <p className={EYEBROW_GREEN}>{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[#555555]">{description}</p>
        </div>
      </div>
    </section>
  );
}
