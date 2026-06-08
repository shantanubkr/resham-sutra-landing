import Link from "next/link";
import { EYEBROW_PURPLE, HIGHLIGHT_GREEN } from "@/lib/brand-styles";

export function ProgramsCrossLink() {
  return (
    <section className="border-t border-[#EEEEEE] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#EEEEEE] bg-brand-purple/[0.04] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div className="max-w-xl">
            <p className={EYEBROW_PURPLE}>For organisations</p>
            <h2 className="mt-2 text-xl font-bold text-[#1A1A1A] sm:text-2xl">
              Need a full package? See{" "}
              <span className={HIGHLIGHT_GREEN}>Programs</span>
            </h2>
            <p className="mt-2 text-sm text-[#555555]">
              NGOs, CSR teams, and governments deploy clusters, solar machines,
              and district rollouts as integrated programs — not à la carte.
            </p>
          </div>
          <Link
            href="/programs"
            className="mt-4 inline-block shrink-0 text-sm font-semibold text-brand-purple underline-offset-4 hover:underline sm:mt-0"
          >
            View programs →
          </Link>
        </div>
      </div>
    </section>
  );
}
