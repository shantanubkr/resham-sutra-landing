import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CATEGORY_ACCENTS } from "@/lib/brand-styles";
import { getProductActionLabel, getProductContactHref, isGramsootraSlug, type ProductCategory } from "@/lib/products";

type OfferingCardProps = {
  category: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  highlights: readonly string[];
  slug: string;
  image: string;
};

export function OfferingCard({
  category,
  name,
  tagline,
  description,
  highlights,
  slug,
  image,
}: OfferingCardProps) {
  const accent = PRODUCT_CATEGORY_ACCENTS[category];
  const href = getProductContactHref(category, slug);
  const actionLabel = getProductActionLabel(slug);
  const external = isGramsootraSlug(slug);
  const linkClass =
    "text-xs font-semibold text-[#1A1A1A] underline-offset-4 hover:text-brand-purple hover:underline sm:text-sm";

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-lg border border-[#EEEEEE] border-t-[3px] bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${accent.border} ${accent.hover}`}
    >
      <div className="relative h-36 shrink-0 overflow-hidden bg-white sm:h-40">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain object-center p-3"
          sizes="(max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-bold text-[#1A1A1A] sm:text-lg">{name}</h3>
        <p className="mt-1 text-xs font-medium text-[#555555] sm:text-sm">
          {tagline}
        </p>
        <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-[#555555] sm:text-sm">
          {description}
        </p>

        <ul className="mt-3 space-y-1">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-1.5 text-xs text-[#1A1A1A] sm:text-sm"
            >
              <span
                className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${accent.dot}`}
              />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-3 pt-1">
          {external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {actionLabel} →
            </a>
          ) : (
            <Link href={href} className={linkClass}>
              {actionLabel}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
