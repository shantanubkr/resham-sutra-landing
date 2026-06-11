import { AWARDS } from "@/lib/awards";
import { SITE_METRICS } from "@/lib/metrics";
import {
  EYEBROW_PURPLE,
  HIGHLIGHT_GREEN,
  ICON_BG_CYCLE,
} from "@/lib/brand-styles";

const CARD_BORDERS = [
  "border-t-brand-green",
  "border-t-[#FCE900]",
  "border-t-brand-purple",
] as const;

export function AwardsSection() {
  return (
    <section className="relative border-t border-[#EEEEEE] bg-white">
      <div
        className="pointer-events-none absolute top-0 left-0 h-48 w-48 rounded-full bg-brand-green/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className={EYEBROW_PURPLE}>Recognition</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Awards &{" "}
            <span className={HIGHLIGHT_GREEN}>grants</span>
          </h2>
          <p className="mt-4 text-[#555555] sm:text-lg">
            National and international recognition for agri-tech innovation,
            climate impact, and rural livelihoods at scale.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#EEEEEE] border-t-4 border-t-brand-green bg-[#FAFAFA] p-5">
            <p className="text-3xl font-bold text-brand-green">
              {SITE_METRICS.recsSetup}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#1A1A1A]">
              Rural Experience Centres
            </p>
            <p className="mt-1 text-xs text-[#555555]">
              Training, demos, and machine access hubs (RECs)
            </p>
          </div>
          <div className="rounded-xl border border-[#EEEEEE] border-t-4 border-t-[#FCE900] bg-[#FAFAFA] p-5">
            <p className="text-3xl font-bold text-[#1A1A1A]">
              {SITE_METRICS.rfcsSetup}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#1A1A1A]">
              Rural Facility Centres
            </p>
            <p className="mt-1 text-xs text-[#555555]">
              Shared village production spaces (RFCs)
            </p>
          </div>
          <div className="rounded-xl border border-[#EEEEEE] border-t-4 border-t-brand-purple bg-[#FAFAFA] p-5">
            <p className="text-3xl font-bold text-brand-purple">
              {AWARDS.length}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#1A1A1A]">
              Major awards & grants
            </p>
            <p className="mt-1 text-xs text-[#555555]">
              Since 2019 across innovation and climate
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AWARDS.map((award, index) => {
            const border = CARD_BORDERS[index % CARD_BORDERS.length];
            const badge = ICON_BG_CYCLE[index % ICON_BG_CYCLE.length];
            const yearDisplay =
              "yearLabel" in award && award.yearLabel
                ? award.yearLabel
                : String(award.year);

            return (
              <article
                key={award.id}
                className={`flex flex-col rounded-xl border border-[#EEEEEE] border-t-4 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${border}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold ${badge}`}
                  >
                    {yearDisplay}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-[#555555]">
                    {award.type === "grant" ? "Grant" : "Award"}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold leading-snug text-[#1A1A1A]">
                  {award.title}
                </h3>
                <p className="mt-2 text-sm text-[#555555]">{award.organization}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
