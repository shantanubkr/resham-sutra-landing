"use client";

import { Suspense } from "react";
import AdminOnboardPageInner from "./AdminOnboardPageInner";

export default function OnboardPage() {
  return (
    <Suspense fallback={<p className="text-muted">Loading…</p>}>
      <AdminOnboardPageInner />
    </Suspense>
  );
}
