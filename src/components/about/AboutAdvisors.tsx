import Image from "next/image";
import { ADVISORS } from "@/lib/about";
import { EYEBROW_GREEN } from "@/lib/brand-styles";

export function AboutAdvisors() {
  return (
    <section className="border-t border-[#EEEEEE] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className={EYEBROW_GREEN}>Guidance</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Our advisors
          </h2>
          <p className="mt-4 text-[#555555]">
            Experienced mentors who help shape our strategy in rural livelihoods,
            textiles, and social enterprise.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {ADVISORS.map((advisor) => (
            <article
              key={advisor.name}
              className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] text-center"
            >
              <div className="relative aspect-[4/5] bg-white">
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#1A1A1A]">{advisor.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-green">
                  {advisor.role}
                </p>
                {"bio" in advisor && advisor.bio ? (
                  <p className="mt-2 text-xs leading-relaxed text-[#555555]">
                    {advisor.bio}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
