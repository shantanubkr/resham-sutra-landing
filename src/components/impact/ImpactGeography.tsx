import { ACTIVE_STATES } from "@/lib/impact";
import { EYEBROW_GREEN, HIGHLIGHT_YELLOW } from "@/lib/brand-styles";

export function ImpactGeography() {
  return (
    <section className="border-t border-[#EEEEEE] bg-[#FAFAFA]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className={EYEBROW_GREEN}>Where we work</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Active across{" "}
            <span className={HIGHLIGHT_YELLOW}>16 states</span>
          </h2>
          <p className="mt-4 text-[#555555] sm:text-lg">
            From tribal belts in the Northeast to silk clusters in central India.
            If you work in one of these regions, we may already have a presence
            near you.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {ACTIVE_STATES.map((state, index) => (
            <span
              key={state}
              className={`rounded-lg border bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:border-brand-purple/30 ${
                index % 3 === 0
                  ? "border-brand-green/20 text-brand-green"
                  : index % 3 === 1
                    ? "border-[#FCE900]/40 text-[#1A1A1A]"
                    : "border-brand-purple/20 text-brand-purple"
              }`}
            >
              {state}
            </span>
          ))}
        </div>

        <p className="mt-8 text-sm text-[#555555]">
          Active MoUs with state governments in Jharkhand, Odisha, Chhattisgarh,
          Meghalaya, and other states.{" "}
          <span className="font-medium text-brand-purple">
            Exploring a new region? Get in touch.
          </span>
        </p>
      </div>
    </section>
  );
}
