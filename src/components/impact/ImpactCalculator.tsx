"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CALCULATOR_RATES } from "@/lib/impact";
import {
  EYEBROW_GREEN,
  HIGHLIGHT_PURPLE,
} from "@/lib/brand-styles";

const PRESETS = [100000, 500000, 1000000, 5000000] as const;

const RESULT_ACCENTS = [
  "border-l-brand-green",
  "border-l-[#FCE900]",
  "border-l-brand-purple",
] as const;

function formatINR(amount: number) {
  return amount.toLocaleString("en-IN");
}

function calculate(amount: number) {
  const lakhs = amount / 100000;
  return {
    trees: Math.round(lakhs * CALCULATOR_RATES.treesPerLakh),
    women: Math.round(lakhs * CALCULATOR_RATES.womenPerLakh),
    machines: Math.round(lakhs * CALCULATOR_RATES.machinesPerLakh * 10) / 10,
  };
}

export function ImpactCalculator() {
  const [amount, setAmount] = useState(100000);

  const results = useMemo(() => calculate(amount), [amount]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <p className={EYEBROW_GREEN}>Make it tangible</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
              What your partnership{" "}
              <span className={HIGHLIGHT_PURPLE}>could create</span>
            </h2>
            <p className="mt-4 text-[#555555] sm:text-lg">
              Enter an amount to see illustrative on-the-ground outcomes. Figures
              are planning estimates, not audited projections.
            </p>
            <p className="mt-4 rounded-lg border border-brand-green/20 bg-brand-green/5 px-4 py-3 text-sm font-medium text-[#1A1A1A]">
              {CALCULATOR_RATES.impactTimeline}
            </p>
          </div>

          <div className="rounded-xl border border-[#EEEEEE] bg-[#FAFAFA] p-6 sm:p-8">
            <label htmlFor="amount" className="text-sm font-semibold text-[#1A1A1A]">
              Partnership amount (₹)
            </label>
            <input
              id="amount"
              type="range"
              min={10000}
              max={5000000}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-4 w-full accent-brand-green"
            />
            <p className="mt-2 text-2xl font-bold text-[#1A1A1A]">
              ₹{formatINR(amount)}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    amount === preset
                      ? "border-brand-purple bg-brand-purple/10 text-brand-purple"
                      : "border-[#EEEEEE] bg-white text-[#555555] hover:border-brand-green/30"
                  }`}
                >
                  ₹{preset >= 100000 ? `${preset / 100000}L` : formatINR(preset)}
                </button>
              ))}
            </div>

            <dl className="mt-8 space-y-4">
              {[
                { label: "Women trained", value: formatINR(results.women) },
                { label: "Machines installed", value: String(results.machines) },
                { label: "Trees planted", value: formatINR(results.trees) },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-lg border-l-4 bg-white p-4 ${RESULT_ACCENTS[index]}`}
                >
                  <dt className="text-sm text-[#555555]">{item.label}</dt>
                  <dd className="mt-1 text-2xl font-bold text-[#1A1A1A]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Button href="/contact" className="mt-6 w-full">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
