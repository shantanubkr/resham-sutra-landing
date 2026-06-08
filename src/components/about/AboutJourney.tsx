import Image from "next/image";
import { ABOUT_IMAGES, ECOSYSTEM_PILLARS, JOURNEY_MILESTONES } from "@/lib/about";
import {
  DOT_CYCLE,
  EYEBROW_GREEN,
  HIGHLIGHT_PURPLE,
  ICON_BG_CYCLE,
} from "@/lib/brand-styles";

export function AboutJourney() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className={EYEBROW_GREEN}>Our Journey</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Since 2012, building{" "}
            <span className={HIGHLIGHT_PURPLE}>what works</span>
          </h2>
          <p className="mt-4 text-[#555555] sm:text-lg">
            From a single innovation to a nationwide model trusted by governments,
            NGOs, and CSR partners.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {JOURNEY_MILESTONES.map((milestone, index) => (
            <article
              key={milestone.title}
              className="relative rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] p-6"
            >
              <span
                className={`inline-block rounded-lg px-2 py-0.5 text-sm font-bold ${ICON_BG_CYCLE[index % ICON_BG_CYCLE.length]}`}
              >
                {milestone.year}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#1A1A1A]">
                {milestone.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                {milestone.description}
              </p>
              {index < JOURNEY_MILESTONES.length - 1 && (
                <span className="absolute -right-4 top-1/2 hidden h-px w-8 bg-[#EEEEEE] lg:block" />
              )}
            </article>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            <div
              className="absolute top-4 left-4 z-10 h-12 w-1 rounded-full bg-brand-green"
              aria-hidden
            />
            <Image
              src={ABOUT_IMAGES.facility}
              alt="Rural facility centre in a village setting"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className={EYEBROW_GREEN}>Farm to fabric</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
              We integrate the full rural textile value chain
            </h3>
            <p className="mt-4 text-[#555555]">
              Production, certification, and market access in one ecosystem. Not
              a single machine or training session, but everything a community
              needs to become self-sufficient.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {ECOSYSTEM_PILLARS.map((pillar, index) => (
                <li
                  key={pillar}
                  className="flex items-start gap-2 text-sm text-[#1A1A1A]"
                >
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${DOT_CYCLE[index % DOT_CYCLE.length]}`}
                  />
                  {pillar}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-xl">
          <div className="relative aspect-[21/9] min-h-[220px]">
            <Image
              src={ABOUT_IMAGES.journeyHighlight}
              alt="Women trained on solar-powered silk reeling machines"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,26,26,0.75)_0%,transparent_60%)]" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8">
              <p className="max-w-lg text-lg font-medium text-white sm:text-xl">
                Every machine deployed comes with training, support, and a path
                to market. That is how livelihoods stick.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
