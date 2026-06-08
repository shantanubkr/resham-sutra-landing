import Link from "next/link";
import { ProgramIcon } from "@/components/programs/ProgramIcon";
import {
  AUDIENCE_GUIDE,
  GRAMSOOTRA,
  PROGRAM_DETAILS,
} from "@/lib/programs";
import { PROGRAM_IMAGES } from "@/lib/images";
import Image from "next/image";
import { EYEBROW_PURPLE, HIGHLIGHT_GREEN } from "@/lib/brand-styles";

export function AudienceGuide() {
  return (
    <section className="border-t border-[#EEEEEE] bg-[#FAFAFA]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className={EYEBROW_PURPLE}>Find your fit</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Which program is{" "}
            <span className={HIGHLIGHT_GREEN}>right for you?</span>
          </h2>
          <p className="mt-4 text-[#555555]">
            Not sure where to start? Match your role to the program built for it.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
          <div className="hidden grid-cols-[1fr_1.5fr_1fr] gap-4 border-b border-[#EEEEEE] bg-brand-purple/[0.04] px-6 py-3 text-xs font-bold tracking-wider text-brand-purple uppercase sm:grid">
            <span>You are</span>
            <span>Best fit program</span>
            <span>Why</span>
          </div>
          <ul>
            {AUDIENCE_GUIDE.map((row) => {
              const program = PROGRAM_DETAILS[row.recommended];
              return (
                <li
                  key={row.audience}
                  className="grid gap-3 border-b border-[#EEEEEE] px-6 py-5 last:border-b-0 sm:grid-cols-[1fr_1.5fr_1fr] sm:items-center sm:gap-4"
                >
                  <p className="font-semibold text-[#1A1A1A]">{row.audience}</p>
                  <Link
                    href={`/programs/${row.recommended}`}
                    className="font-medium text-brand-purple underline-offset-4 hover:underline"
                  >
                    {program.title}
                  </Link>
                  <p className="text-sm text-[#555555]">{row.note}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-[#EEEEEE] bg-brand-purple/[0.04] sm:flex sm:items-stretch">
          <div className="relative h-40 shrink-0 sm:h-auto sm:w-48">
            <Image
              src={PROGRAM_IMAGES.gramsootra}
              alt="Gramsootra logo"
              fill
              className="bg-white object-contain object-center p-4"
              sizes="192px"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-purple text-white">
              <ProgramIcon name="platform" className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#1A1A1A]">{GRAMSOOTRA.title}</h3>
              <p className="mt-1 text-sm text-[#555555]">{GRAMSOOTRA.tagline}</p>
            </div>
          </div>
          <a
            href={GRAMSOOTRA.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-brand-purple underline-offset-4 hover:underline sm:mt-0"
          >
            Visit GramSootra →
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}
