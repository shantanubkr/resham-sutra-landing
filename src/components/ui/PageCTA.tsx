import { Button } from "@/components/ui/Button";
import { PAGE_CTA_INNER, PAGE_CTA_WRAPPER } from "@/lib/brand-styles";

type PageCTAProps = {
  badge?: string;
  badgeDot?: "green" | "purple";
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function PageCTA({
  badge,
  badgeDot = "purple",
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: PageCTAProps) {
  const dotClass =
    badgeDot === "green" ? "bg-brand-green" : "bg-brand-purple";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className={PAGE_CTA_WRAPPER}>
          <div className={PAGE_CTA_INNER}>
            <div
              className="pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-[#FCE900]/20 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-brand-green/10 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute top-1/2 right-1/4 h-28 w-28 rounded-full bg-brand-purple/10 blur-xl"
              aria-hidden
            />

            <div className="relative">
              {badge && (
                <span className="inline-flex items-center gap-2 rounded-full border border-[#EEEEEE] bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium text-[#555555]">
                  <span className={`h-2 w-2 rounded-full ${dotClass}`} aria-hidden />
                  {badge}
                </span>
              )}

              <h2
                className={`text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl ${badge ? "mt-5" : ""}`}
              >
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[#555555]">{description}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href={primaryHref}>{primaryLabel}</Button>
                {secondaryHref && secondaryLabel && (
                  <Button
                    href={secondaryHref}
                    variant="secondary"
                    className="border-brand-purple/20 hover:border-brand-purple/40 hover:bg-brand-purple/5"
                  >
                    {secondaryLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
