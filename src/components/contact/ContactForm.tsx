"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ACTIVE_STATES } from "@/lib/impact";
import {
  VISITOR_TYPES,
  type VisitorTypeId,
} from "@/lib/contact";
import { GRAMSOOTRA_URL } from "@/lib/constants";
import { getProgramLabel } from "@/lib/programs";
import { getProductItemLabel } from "@/lib/products";
import { INPUT_FOCUS } from "@/lib/brand-styles";

type FormData = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  state: string;
  message: string;
};

const emptyForm: FormData = {
  name: "",
  organization: "",
  email: "",
  phone: "",
  state: "",
  message: "",
};

const inputClass = `mt-1.5 w-full rounded-lg border border-[#EEEEEE] bg-white px-4 py-2.5 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#555555]/60 ${INPUT_FOCUS}`;

const TYPE_ACCENTS = [
  "border-brand-green bg-brand-green/10 ring-2 ring-brand-green/30",
  "border-[#FCE900] bg-[#FCE900]/10 ring-2 ring-[#FCE900]/40",
  "border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30",
  "border-brand-green bg-brand-green/10 ring-2 ring-brand-green/30",
] as const;

function isValidType(value: string | null): value is VisitorTypeId {
  return VISITOR_TYPES.some((type) => type.id === value);
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const initialProgram = searchParams.get("program");
  const initialCategory = searchParams.get("category");
  const initialItem = searchParams.get("item");
  const programLabel = getProgramLabel(initialProgram);
  const productLabel = getProductItemLabel(initialCategory, initialItem);
  const hasPrefill = Boolean(programLabel || productLabel);

  useEffect(() => {
    if (initialItem === "gramsootra" || initialProgram === "gramsootra") {
      window.location.replace(GRAMSOOTRA_URL);
    }
  }, [initialItem, initialProgram]);

  const [step, setStep] = useState<1 | 2>(
    isValidType(initialType) && hasPrefill ? 2 : 1,
  );
  const [visitorType, setVisitorType] = useState<VisitorTypeId | null>(
    isValidType(initialType) ? initialType : null,
  );
  const [form, setForm] = useState<FormData>(() => {
    let message = "";
    if (programLabel) {
      message = `I'm interested in the ${programLabel} program.`;
    } else if (productLabel) {
      message = `I'm interested in ${productLabel}.`;
    }
    return { ...emptyForm, message };
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const selectedType = useMemo(
    () => VISITOR_TYPES.find((type) => type.id === visitorType),
    [visitorType],
  );

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!visitorType || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorType,
          name: form.name,
          organization: form.organization || undefined,
          email: form.email,
          phone: form.phone || undefined,
          state: form.state || undefined,
          message: form.message,
          program: programLabel,
          product: productLabel,
          category: initialCategory,
          website: honeypot,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Something went wrong. Please email info@reshamsutra.com or message us on WhatsApp.",
        );
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or contact us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-[#EEEEEE] bg-white p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-2xl font-bold text-white">
          ✓
        </div>
        <h2 className="mt-6 text-2xl font-bold text-[#1A1A1A]">
          Thank you for reaching out
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[#555555]">
          We&apos;ve received your message and will get back to you within 2
          business days. For urgent enquiries, WhatsApp is fastest.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-8"
          onClick={() => {
            setSubmitted(false);
            setStep(1);
            setVisitorType(null);
            setForm(emptyForm);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#EEEEEE] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-8">
      {step === 1 ? (
        <>
          <p className="text-sm font-bold tracking-wider text-brand-purple uppercase">
            Step 1 of 2
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#1A1A1A]">
            Who are you?
          </h2>
          <p className="mt-2 text-sm text-[#555555]">
            Choose the option that best describes you so we can tailor our
            response.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {VISITOR_TYPES.map((type, index) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setVisitorType(type.id)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  visitorType === type.id
                    ? TYPE_ACCENTS[index % TYPE_ACCENTS.length]
                    : "border-[#EEEEEE] bg-[#FAFAFA] hover:border-brand-purple/20"
                }`}
              >
                <p className="font-semibold text-[#1A1A1A]">{type.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#555555]">
                  {type.description}
                </p>
              </button>
            ))}
          </div>

          <Button
            type="button"
            className="mt-8 w-full sm:w-auto"
            disabled={!visitorType}
            onClick={() => setStep(2)}
          >
            Continue
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold tracking-wider text-brand-green uppercase">
                Step 2 of 2
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#1A1A1A]">
                Tell us a bit more
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm font-medium text-[#555555] underline-offset-4 hover:text-[#1A1A1A] hover:underline"
            >
              Change type
            </button>
          </div>

          {selectedType && (
            <p className="mt-4 rounded-lg bg-[#FAFAFA] px-4 py-3 text-sm leading-relaxed text-[#555555]">
              {selectedType.prompt}
            </p>
          )}

          {(programLabel || productLabel) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {programLabel && (
                <p className="inline-flex rounded-lg bg-brand-purple/10 px-3 py-1.5 text-sm font-semibold text-brand-purple">
                  Program: {programLabel}
                </p>
              )}
              {productLabel && (
                <p className="inline-flex rounded-lg bg-brand-green/10 px-3 py-1.5 text-sm font-semibold text-brand-green">
                  Product: {productLabel}
                </p>
              )}
            </div>
          )}

          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="pointer-events-none absolute h-0 w-0 opacity-0"
            aria-hidden
          />

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="name" className="text-sm font-medium text-[#1A1A1A]">
                Name <span className="text-[#555555]">*</span>
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={inputClass}
                placeholder="Your full name"
              />
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="organization"
                className="text-sm font-medium text-[#1A1A1A]"
              >
                Organization
              </label>
              <input
                id="organization"
                value={form.organization}
                onChange={(e) => updateField("organization", e.target.value)}
                className={inputClass}
                placeholder="Company, NGO, or department"
              />
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
                Email <span className="text-[#555555]">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClass}
                placeholder="you@organization.com"
              />
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="phone" className="text-sm font-medium text-[#1A1A1A]">
                Phone <span className="text-[#555555]">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={inputClass}
                placeholder="+91"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="text-sm font-medium text-[#1A1A1A]">
                State or region of interest
              </label>
              <select
                id="state"
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                className={inputClass}
              >
                <option value="">Select a state</option>
                {ACTIVE_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
                <option value="Other">Other / Not sure yet</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-[#1A1A1A]"
              >
                What are you looking to achieve?{" "}
                <span className="text-[#555555]">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className={`${inputClass} resize-y min-h-[120px]`}
                placeholder="Share your goals, timeline, or any questions you have."
              />
            </div>
          </div>

          {submitError && (
            <p
              className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              role="alert"
            >
              {submitError}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              className="sm:min-w-[180px]"
              disabled={submitting}
            >
              {submitting ? "Sending…" : "Partner With Us"}
            </Button>
            <p className="text-xs text-[#555555]">
              We typically respond within 2 business days.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
