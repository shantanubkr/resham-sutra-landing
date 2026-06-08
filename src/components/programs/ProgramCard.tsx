import Image from "next/image";
import Link from "next/link";
import { ProgramIcon } from "@/components/programs/ProgramIcon";
import { PROGRAM_SLUG_ACCENTS } from "@/lib/brand-styles";
import { PROGRAM_DETAILS, type ProgramSlug } from "@/lib/programs";

type ProgramCardProps = {
  slug: ProgramSlug;
};

export function ProgramCard({ slug }: ProgramCardProps) {
  const program = PROGRAM_DETAILS[slug];
  const accent = PROGRAM_SLUG_ACCENTS[slug];

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-xl border border-[#EEEEEE] border-t-4 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] ${accent.border} ${accent.hover}`}
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
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${accent.icon}`}
        >
          <ProgramIcon name={program.icon} className="h-5 w-5" />
        </div>

        <h3 className="mt-4 text-xl font-bold text-[#1A1A1A] sm:text-2xl">
          {program.title}
        </h3>
        <p className="mt-2 text-[#555555]">{program.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {program.forAudience.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] px-2.5 py-1 text-xs font-medium text-[#555555]"
            >
              {tag}
            </span>
          ))}
        </div>

        <ul className="mt-5 space-y-2">
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

        <div className="mt-auto pt-6">
          <Link
            href={`/programs/${slug}`}
            className="inline-flex text-sm font-semibold text-[#1A1A1A] underline-offset-4 hover:text-brand-purple hover:underline"
          >
            Learn more
          </Link>
        </div>
      </div>
    </article>
  );
}
