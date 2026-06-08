import { VISION_MISSION } from "@/lib/about";
import { EYEBROW_GREEN, EYEBROW_PURPLE } from "@/lib/brand-styles";

const CARDS = [
  { item: VISION_MISSION.vision, eyebrow: EYEBROW_GREEN, border: "border-t-brand-green" },
  { item: VISION_MISSION.mission, eyebrow: EYEBROW_PURPLE, border: "border-t-brand-purple" },
] as const;

export function VisionMission() {
  return (
    <section className="border-y border-[#EEEEEE] bg-[#FAFAFA]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {CARDS.map(({ item, eyebrow, border }) => (
            <article
              key={item.title}
              className={`rounded-xl border border-[#EEEEEE] border-t-4 bg-white p-8 ${border}`}
            >
              <p className={eyebrow}>{item.title}</p>
              <p className="mt-4 text-lg leading-relaxed text-[#1A1A1A]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
