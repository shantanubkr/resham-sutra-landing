"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";

function StarIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      {direction === "left" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      )}
    </svg>
  );
}

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const count = TESTIMONIALS.length;
  const testimonial = TESTIMONIALS[active];

  const goTo = useCallback(
    (index: number) => {
      setActive((index + count) % count);
    },
    [count],
  );

  const subtitle =
    "detail" in testimonial && testimonial.detail
      ? `${testimonial.role}, ${testimonial.location} · ${testimonial.detail}`
      : `${testimonial.role}, ${testimonial.location}`;

  return (
    <div className="relative mt-10 overflow-hidden rounded-3xl border border-[#EEEEEE] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:p-10 lg:p-12">
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-brand-green/10 blur-2xl"
        aria-hidden
      />

      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10 lg:gap-12">
        <div className="relative mx-auto shrink-0 md:mx-0">
          <div
            className="absolute inset-0 scale-110 rounded-full bg-[linear-gradient(135deg,#04B648,#615EAA)] opacity-80"
            aria-hidden
          />
          <div className="relative m-1 h-32 w-32 overflow-hidden rounded-full ring-4 ring-white sm:h-36 sm:w-36 md:h-40 md:w-40">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover object-center"
              sizes="160px"
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 pb-16 md:pb-0">
          <div className="flex gap-1" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={index === 4 ? "text-brand-green" : "text-[#FCE900]"}
              >
                <StarIcon />
              </span>
            ))}
          </div>

          <p className="mt-4 text-lg leading-relaxed text-[#1A1A1A] sm:text-xl">
            {testimonial.quote}
          </p>

          <div className="mt-6">
            <p className="font-semibold text-[#1A1A1A]">— {testimonial.name}</p>
            <p className="mt-1 text-sm text-[#555555]">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="absolute right-6 bottom-6 flex items-center gap-3 sm:right-8 sm:bottom-8">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Previous testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EEEEEE] text-[#555555] transition-colors hover:border-brand-purple/30 hover:text-brand-purple"
        >
          <ChevronIcon direction="left" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
          {TESTIMONIALS.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show testimonial from ${item.name}`}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full transition-all ${
                index === active
                  ? "w-6 bg-brand-purple"
                  : "w-2 bg-[#EEEEEE] hover:bg-[#CCCCCC]"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Next testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EEEEEE] text-[#555555] transition-colors hover:border-brand-purple/30 hover:text-brand-purple"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    </div>
  );
}
