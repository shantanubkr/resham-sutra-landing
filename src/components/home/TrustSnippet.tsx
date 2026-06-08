import { TRUST_ITEMS } from "@/lib/constants";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { CHECKMARK_CYCLE, EYEBROW_GREEN, EYEBROW_PURPLE, HIGHLIGHT_PURPLE } from "@/lib/brand-styles";

export function TrustSnippet() {
  return (
    <section className="relative border-t border-[#EEEEEE] bg-[#FAFAFA]">
      <div
        className="pointer-events-none absolute top-20 right-0 h-72 w-72 rounded-full bg-brand-purple/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className={EYEBROW_PURPLE}>Credibility</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            Why institutions trust us
          </h2>
          <p className="mt-4 leading-relaxed text-[#555555] sm:text-lg">
            We&apos;re not a charity or a government scheme. We&apos;re a social
            enterprise with 10+ years on the ground, active MoUs with state
            governments, and third-party verified impact data.
          </p>
          <blockquote className="mt-6 border-l-4 border-brand-green pl-4">
            <p className="text-lg font-medium text-[#1A1A1A] italic">
              &ldquo;We don&apos;t hand out machines. We build ecosystems.&rdquo;
            </p>
          </blockquote>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_ITEMS.map((item, index) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-[#EEEEEE] bg-white p-4 transition-colors hover:border-brand-purple/20"
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${CHECKMARK_CYCLE[index % CHECKMARK_CYCLE.length]}`}
              >
                ✓
              </span>
              <span className="text-sm leading-snug text-[#1A1A1A]">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-[#EEEEEE] pt-16">
          <div className="max-w-2xl">
            <p className={EYEBROW_GREEN}>Stories from the field</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#1A1A1A] sm:text-3xl">
              Real women.{" "}
              <span className={HIGHLIGHT_PURPLE}>Real impact.</span>
            </h3>
            <p className="mt-3 text-[#555555]">
              Hear from the artisan communities we work with across India.
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
}
