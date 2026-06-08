import Image from "next/image";
import { TEAM, TEAM_NOTE } from "@/lib/about";
import { ABOUT_IMAGES } from "@/lib/images";
import { EYEBROW_PURPLE, ICON_BG_CYCLE } from "@/lib/brand-styles";

export function AboutTeam() {
  return (
    <section className="relative border-t border-[#EEEEEE] bg-[#FAFAFA]">
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-brand-green/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className={EYEBROW_PURPLE}>Leadership</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Our team
          </h2>
          <p className="mt-4 text-[#555555]">
            A team with deep field experience in rural livelihoods, clean energy,
            and silk textile production.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-[#EEEEEE]">
          <div className="relative aspect-[21/9] min-h-[200px]">
            <Image
              src={ABOUT_IMAGES.teamGroup}
              alt="Resham Sutra team and partners"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, index) => (
            <article
              key={member.name}
              className="rounded-xl border border-[#EEEEEE] bg-white p-6 text-center transition-colors hover:border-brand-purple/20"
            >
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold ${ICON_BG_CYCLE[index % ICON_BG_CYCLE.length]}`}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="mt-4 font-semibold text-[#1A1A1A]">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-brand-purple">
                {member.role}
              </p>
              <p className="mt-2 text-left text-xs leading-relaxed text-[#555555]">
                {member.bio}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[#555555]">{TEAM_NOTE}</p>

        <div className="mt-10 overflow-hidden rounded-xl border border-[#EEEEEE] bg-white">
          <div className="relative aspect-[16/10] sm:aspect-[2/1]">
            <Image
              src={ABOUT_IMAGES.teamLeadership}
              alt="Leadership with Buniyaad and Unnati machines"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <p className="border-t border-[#EEEEEE] px-4 py-3 text-center text-sm text-[#555555]">
            Demonstrating solar silk machines with partners and stakeholders
          </p>
        </div>
      </div>
    </section>
  );
}
