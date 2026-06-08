import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProgramIcon } from "@/components/programs/ProgramIcon";
import { PROGRAMS } from "@/lib/constants";
import { GRAMSOOTRA } from "@/lib/programs";

const CARD_ACCENTS = [
  {
    border: "border-t-brand-green",
    icon: "bg-brand-green text-white",
    hover: "hover:border-brand-green/30",
  },
  {
    border: "border-t-[#FCE900]",
    icon: "bg-[#FCE900] text-[#1A1A1A]",
    hover: "hover:border-[#FCE900]/50",
  },
  {
    border: "border-t-brand-purple",
    icon: "bg-brand-purple text-white",
    hover: "hover:border-brand-purple/30",
  },
] as const;

export function ProgramsTeaser() {
  return (
    <section className="relative border-t border-[#EEEEEE] bg-white">
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-green/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-wider text-brand-green uppercase">
              Our Programs
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
              Three programs.{" "}
              <span className="rounded-lg bg-brand-purple/15 px-1.5 text-brand-purple">
                One
              </span>{" "}
              proven model.
            </h2>
            <p className="mt-3 text-[#555555]">
              A clear path for NGOs, CSR teams, and government bodies.
            </p>
          </div>
          <Button href="/programs" variant="secondary" className="shrink-0">
            View All Programs
          </Button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PROGRAMS.map((program, index) => {
            const accent = CARD_ACCENTS[index];
            return (
              <article
                key={program.href}
                className={`group flex flex-col overflow-hidden rounded-xl border border-[#EEEEEE] border-t-4 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] ${accent.border} ${accent.hover}`}
              >
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${accent.icon}`}
                  >
                    <ProgramIcon name={program.icon} />
                  </div>

                  <h3 className="mt-5 text-lg leading-snug font-bold text-[#1A1A1A]">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#555555]">{program.tagline}</p>

                  <ul className="mt-6 space-y-3 border-t border-[#EEEEEE] pt-6">
                    {program.highlights.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center gap-3 text-sm text-[#1A1A1A]"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FAFAFA] text-[#555555]">
                          <ProgramIcon name={item.icon} className="h-4 w-4" />
                        </span>
                        {item.label}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Link
                      href={program.href}
                      className="inline-flex text-sm font-semibold text-[#1A1A1A] underline-offset-4 hover:text-brand-purple hover:underline"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-[#EEEEEE] bg-brand-purple/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-purple text-white">
              <ProgramIcon name="platform" className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-[#1A1A1A]">{GRAMSOOTRA.title}</p>
              <p className="mt-1 text-sm text-[#555555]">{GRAMSOOTRA.tagline}</p>
            </div>
          </div>
          <a
            href={GRAMSOOTRA.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-purple underline-offset-4 hover:underline sm:shrink-0"
          >
            Visit GramSootra
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
