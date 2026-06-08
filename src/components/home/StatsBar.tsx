import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { HERO_STATS } from "@/lib/constants";
import { SITE_METRICS } from "@/lib/metrics";

export function StatsBar() {
  const yearsOnGround = new Date().getFullYear() - SITE_METRICS.foundedYear;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-lg leading-relaxed text-[#555555] sm:text-xl sm:leading-relaxed">
          A social enterprise with{" "}
          <AnimatedNumber
            value={yearsOnGround}
            suffix="+"
            className="font-bold text-[#1A1A1A]"
          />{" "}
          years on the ground, deploying{" "}
          <AnimatedNumber
            value={SITE_METRICS.machinesDeployed}
            suffix="+"
            className="font-bold text-[#1A1A1A]"
          />{" "}
          solar machines, creating{" "}
          <AnimatedNumber
            value={SITE_METRICS.jobsCreated}
            suffix="+"
            className="font-bold text-[#1A1A1A]"
          />{" "}
          direct jobs through{" "}
          <AnimatedNumber
            value={SITE_METRICS.recsSetup}
            className="font-bold text-[#1A1A1A]"
          />{" "}
          experience centres and{" "}
          <AnimatedNumber
            value={SITE_METRICS.rfcsSetup}
            className="font-bold text-[#1A1A1A]"
          />{" "}
          facility centres across{" "}
          <AnimatedNumber
            value={SITE_METRICS.states}
            className="font-bold text-[#1A1A1A]"
          />{" "}
          states of India.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-12 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {HERO_STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">
              <AnimatedNumber
                value={stat.value}
                suffix={"suffix" in stat ? stat.suffix : undefined}
              />
            </p>
            <p className="mx-auto mt-3 max-w-[140px] text-sm leading-snug text-[#555555]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
