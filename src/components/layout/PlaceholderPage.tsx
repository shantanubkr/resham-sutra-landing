import { EYEBROW_GREEN } from "@/lib/brand-styles";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <p className={EYEBROW_GREEN}>Coming soon</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1A1A1A]">
        {title}
      </h1>
      <p className="mt-4 max-w-xl text-[#555555]">{description}</p>
    </div>
  );
}
