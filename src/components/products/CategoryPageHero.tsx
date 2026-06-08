import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CATEGORY_ACCENTS } from "@/lib/brand-styles";
import type { ProductCategory } from "@/lib/products";
import { EYEBROW_GREEN } from "@/lib/brand-styles";

type CategoryPageHeroProps = {
  category: ProductCategory;
  title: string;
  description: string;
  image?: string;
};

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  machines: "Machines",
  items: "Products",
  services: "Services",
};

export function CategoryPageHero({
  category,
  title,
  description,
  image,
}: CategoryPageHeroProps) {
  const accent = PRODUCT_CATEGORY_ACCENTS[category];

  if (image) {
    return (
      <section className="relative min-h-[40vh] overflow-hidden sm:min-h-[45vh]">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.93)_0%,rgba(255,255,255,0.75)_45%,rgba(255,255,255,0.2)_70%,transparent_90%)]" />

        <div className="relative mx-auto flex min-h-[40vh] max-w-6xl items-end px-4 pb-12 pt-28 sm:min-h-[45vh] sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
          <div className="max-w-2xl">
            <Link
              href="/products"
              className="text-sm font-medium text-[#555555] underline-offset-4 hover:text-brand-purple hover:underline"
            >
              ← All products
            </Link>
            <p className={`mt-4 ${EYEBROW_GREEN}`}>{CATEGORY_LABELS[category]}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[#555555]">{description}</p>
            <div
              className={`mt-6 h-1 w-16 rounded-full ${accent.dot}`}
              aria-hidden
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative border-b border-[#EEEEEE] bg-[#FAFAFA]">
      <div
        className={`pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full blur-3xl ${
          category === "machines"
            ? "bg-[#FCE900]/10"
            : category === "items"
              ? "bg-brand-green/5"
              : "bg-brand-purple/5"
        }`}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-16">
        <Link
          href="/products"
          className="text-sm font-medium text-[#555555] underline-offset-4 hover:text-brand-purple hover:underline"
        >
          ← All products
        </Link>
        <p className={`mt-4 ${EYEBROW_GREEN}`}>{CATEGORY_LABELS[category]}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#555555]">{description}</p>
        <div
          className={`mt-6 inline-block h-1 w-16 rounded-full ${accent.dot}`}
          aria-hidden
        />
      </div>
    </section>
  );
}
