"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api-client";
import { useSession } from "@/components/layout/RoleGuard";
import { PageHeader } from "@/components/layout/AppShell";
import { categoryLabel } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import type { Buyer } from "@/lib/types";
import { PRODUCER_CATEGORIES } from "@/lib/constants";

export default function BuyerProfilePage() {
  const { session } = useSession(true);
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!session?.user.id) return;
    apiFetch<{ buyer: Buyer }>(
      `/api/buyers/profile?userId=${session.user.id}`
    ).then((d) => setBuyer(d.buyer));
  }, [session]);

  async function save() {
    if (!buyer) return;
    setSaving(true);
    await apiFetch("/api/buyers/profile", {
      method: "PATCH",
      body: JSON.stringify(buyer),
    });
    setSaving(false);
  }

  if (!buyer) return <p className="text-muted">Loading…</p>;

  return (
    <div>
      <PageHeader title="Buyer profile" description="Your account details" />
      <Card className="max-w-lg">
        <div className="space-y-4">
          <div>
            <Label>Full name</Label>
            <Input
              value={buyer.fullName}
              onChange={(e) =>
                setBuyer({ ...buyer, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Buyer type</Label>
            <Select
              value={buyer.buyerType}
              onChange={(e) =>
                setBuyer({
                  ...buyer,
                  buyerType: e.target.value as Buyer["buyerType"],
                })
              }
            >
              <option value="individual">Individual</option>
              <option value="organisation">Organisation</option>
            </Select>
          </div>
          {buyer.buyerType === "organisation" && (
            <div>
              <Label>Organisation name</Label>
              <Input
                value={buyer.organisationName ?? ""}
                onChange={(e) =>
                  setBuyer({ ...buyer, organisationName: e.target.value })
                }
              />
            </div>
          )}
          <div>
            <Label>Phone</Label>
            <Input
              value={buyer.phone}
              onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              value={buyer.email}
              onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
            />
          </div>
          <div>
            <Label>Interest categories</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {PRODUCER_CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => {
                    const cats = buyer.interestCategories;
                    setBuyer({
                      ...buyer,
                      interestCategories: cats.includes(c.value)
                        ? cats.filter((x) => x !== c.value)
                        : [...cats, c.value],
                    });
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    buyer.interestCategories.includes(c.value)
                      ? "bg-info text-white"
                      : "bg-gray-100 text-muted"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <Button variant="purple" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save profile"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
