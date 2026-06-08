"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher, useI18n } from "@/lib/i18n/provider";

export function LandingHeader() {
  const { tr } = useI18n();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <span className="font-bold text-lg">
          <span className="text-foreground">{tr("reshamSutra")}</span>{" "}
          {tr("appSubtitle")}
        </span>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/login">
            <Button variant="secondary">{tr("login")}</Button>
          </Link>
          <Link href="/register">
            <Button variant="green">{tr("getStarted")}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
