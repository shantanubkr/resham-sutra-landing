import Image from "next/image";
import { IMPACT_STORIES } from "@/lib/impact";
import { EYEBROW_GREEN, HIGHLIGHT_PURPLE } from "@/lib/brand-styles";

const QUOTE_BORDERS = [
  "border-brand-green",
  "border-[#FCE900]",
  "border-brand-purple",
] as const;

const BAR_COLORS = ["bg-brand-green", "bg-[#FCE900]", "bg-brand-purple"] as const;

export function ImpactStories() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className={EYEBROW_GREEN}>Stories from the field</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Real women.{" "}
            <span className={HIGHLIGHT_PURPLE}>Real change.</span>
          </h2>
          <p className="mt-4 text-[#555555] sm:text-lg">
            These are the people behind our work. Not beneficiaries. Partners
            building their own livelihoods.
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {IMPACT_STORIES.map((story, index) => (
            <article
              key={story.name}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <div
                  className={`absolute top-4 left-4 z-10 h-10 w-1 rounded-full ${BAR_COLORS[index % BAR_COLORS.length]}`}
                  aria-hidden
                />
                <Image
                  src={story.image}
                  alt={`${story.name} from ${story.location}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-brand-purple">
                  {story.location}
                </p>
                <h3 className="mt-1 text-2xl font-bold text-[#1A1A1A]">
                  {story.name}
                </h3>
                <p className="mt-4 leading-relaxed text-[#555555]">
                  {story.context}
                </p>
                <blockquote
                  className={`mt-6 border-l-4 pl-4 ${QUOTE_BORDERS[index % QUOTE_BORDERS.length]}`}
                >
                  <p className="text-lg leading-relaxed text-[#1A1A1A] italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </blockquote>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {"before" in story && story.before ? (
                    <>
                      <span className="rounded-lg bg-[#FAFAFA] px-3 py-1.5 text-sm text-[#555555]">
                        Before: {story.before}
                      </span>
                      <span className="text-[#555555]">→</span>
                      <span className="rounded-lg bg-brand-green/15 px-3 py-1.5 text-sm font-semibold text-brand-green">
                        After: {story.after}
                      </span>
                    </>
                  ) : (
                    <span className="rounded-lg bg-brand-purple/10 px-3 py-1.5 text-sm font-medium text-brand-purple">
                      {"detail" in story ? story.detail : null}
                    </span>
                  )}
                  <span className="text-sm text-[#555555]">· {story.timeline}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
