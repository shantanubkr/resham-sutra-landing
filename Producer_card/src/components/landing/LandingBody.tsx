"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/provider";
import { GOV_DEMO_TOKEN } from "@/lib/constants";

const FEATURE_KEYS = [
  { titleKey: "featureProducerCardTitle", descKey: "featureProducerCardDesc" },
  { titleKey: "featureSkillsTitle", descKey: "featureSkillsDesc" },
  { titleKey: "featureSchemesTitle", descKey: "featureSchemesDesc" },
  { titleKey: "featureStakeholdersTitle", descKey: "featureStakeholdersDesc" },
] as const;

export function LandingBody() {
  const { tr } = useI18n();

  return (
    <>
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-foreground">
            {tr("landingTagline")}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            {tr("landingHeadingPrefix")}{" "}
            <span className="rounded-lg bg-gray-200 px-2">
              {tr("landingHeadingProducers")}
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted">{tr("landingSubtitle")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register?role=buyer">
              <Button variant="purple">{tr("registerAsBuyer")}</Button>
            </Link>
            <Link href="/login">
              <Button variant="green">{tr("staffLoginCta")}</Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">{tr("producerOnboardNote")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold">{tr("problemTitle")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
          {tr("problemDesc")}
        </p>
      </section>

      <section className="bg-gray-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_KEYS.map((item) => (
            <div
              key={item.titleKey}
              className="rounded-2xl border-t-4 border-black bg-white p-6 shadow-sm"
            >
              <h3 className="font-bold">{tr(item.titleKey)}</h3>
              <p className="mt-2 text-sm text-muted">{tr(item.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">{tr("govDashTitle")}</h2>
        <p className="mt-2 text-muted">{tr("govDashDesc")}</p>
        <Link href={`/gov/${GOV_DEMO_TOKEN}`} className="mt-4 inline-block">
          <Button variant="secondary">{tr("viewDemoDashboard")}</Button>
        </Link>
      </section>
    </>
  );
}

export function LandingFooter() {
  const { tr } = useI18n();
  return (
    <footer className="border-t border-gray-200 py-8 text-center text-sm text-muted">
      {tr("footerCopy")}
    </footer>
  );
}
