import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProgramIcon } from "@/components/programs/ProgramIcon";
import { PROGRAM_SLUG_ACCENTS, STEP_BADGE_CYCLE } from "@/lib/brand-styles";
import {
  getProgramContactHref,
  PROGRAM_DETAILS,
  PROGRAM_SLUGS,
  type ProgramSlug,
} from "@/lib/programs";

type ProgramDetailProps = {
  slug: ProgramSlug;
};

export function ProgramDetail({ slug }: ProgramDetailProps) {
  const program = PROGRAM_DETAILS[slug];
  const accent = PROGRAM_SLUG_ACCENTS[slug];
  const otherPrograms = PROGRAM_SLUGS.filter((s) => s !== slug);

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden sm:min-h-[45vh]">
        <Image
          src={program.image}
          alt={program.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.93)_0%,rgba(255,255,255,0.75)_45%,rgba(255,255,255,0.2)_70%,transparent_90%)]" />

        <div className="relative mx-auto flex min-h-[40vh] max-w-6xl items-end px-4 pb-12 pt-28 sm:min-h-[45vh] sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
          <div className="max-w-2xl">
            <Link
              href="/programs"
              className="text-sm font-medium text-[#555555] underline-offset-4 hover:text-brand-purple hover:underline"
            >
              ← All programs
            </Link>
            <div
              className={`mt-4 flex h-12 w-12 items-center justify-center rounded-lg ${accent.icon}`}
            >
              <ProgramIcon name={program.icon} />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
              {program.title}
            </h1>
            <p className="mt-3 text-lg text-[#555555]">{program.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {program.forAudience.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-white/80 px-3 py-1 text-xs font-semibold text-[#1A1A1A] backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A]">Overview</h2>
              <div className="mt-4 space-y-4">
                {program.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="leading-relaxed text-[#555555]">
                    {paragraph}
                  </p>
                ))}
              </div>

              {"machines" in program && program.machines && (
                <div className="mt-8">
                  <h3 className="font-semibold text-[#1A1A1A]">Machine models</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {program.machines.map((machine) => (
                      <span
                        key={machine}
                        className="rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-3 py-1.5 text-sm font-medium text-[#1A1A1A]"
                      >
                        {machine}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className={`rounded-xl border border-[#EEEEEE] border-t-4 bg-[#FAFAFA] p-6 ${accent.border}`}
            >
              <h3 className="font-semibold text-[#1A1A1A]">Key outcomes</h3>
              <ul className="mt-4 space-y-3">
                {program.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-start gap-2 text-sm text-[#1A1A1A]"
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`}
                    />
                    {outcome}
                  </li>
                ))}
              </ul>
              <Button href={getProgramContactHref(slug)} className="mt-6 w-full">
                Get in touch
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">How it works</h2>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {program.steps.map((step, index) => (
                <li
                  key={step}
                  className="rounded-xl border border-[#EEEEEE] bg-white p-5"
                >
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${STEP_BADGE_CYCLE[index % STEP_BADGE_CYCLE.length]}`}
                  >
                    {index + 1}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-[#EEEEEE] bg-[#FAFAFA]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-sm font-bold tracking-wider text-brand-green uppercase">
            Other programs
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            {otherPrograms.map((otherSlug) => {
              const other = PROGRAM_DETAILS[otherSlug];
              const otherAccent = PROGRAM_SLUG_ACCENTS[otherSlug];
              return (
                <Link
                  key={otherSlug}
                  href={`/programs/${otherSlug}`}
                  className={`flex-1 rounded-xl border border-[#EEEEEE] border-t-4 bg-white p-4 transition-colors ${otherAccent.border} ${otherAccent.hover}`}
                >
                  <p className="font-semibold text-[#1A1A1A]">{other.title}</p>
                  <p className="mt-1 text-sm text-[#555555]">{other.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
