"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { apiFetch, setSession, roleHomePath } from "@/lib/api-client";
import { DEMO_OTP } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/provider";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { LanguageSwitcher } from "@/lib/i18n/provider";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tr } = useI18n();
  const [role, setRole] = useState(searchParams.get("role") ?? "buyer");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [buyerType, setBuyerType] = useState("individual");
  const [otp, setOtp] = useState(DEMO_OTP);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (role === "producer") {
      setError(tr("producerRegDisabled"));
      return;
    }
    setError("");
    setLoading(true);
    try {
      await apiFetch("/api/buyers/profile", {
        method: "POST",
        body: JSON.stringify({
          phone,
          role: "buyer",
          name,
          email,
          buyerType,
          organisationName: buyerType === "organisation" ? name : null,
        }),
      });

      const data = await apiFetch<{
        token: string;
        user: {
          id: string;
          role: string;
          name: string;
          phone: string;
          email: string | null;
          clusterIds: string[];
          producerId: string | null;
          buyerId: string | null;
        };
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ phone, role: "buyer", otp, name, email }),
      });

      setSession({ token: data.token, user: data.user });
      router.push(roleHomePath(data.user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : tr("registrationFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="mb-4 flex justify-end">
          <LanguageSwitcher />
        </div>
        <h1 className="text-xl font-bold">{tr("registerAsBuyer")}</h1>
        <p className="mt-2 text-sm text-muted">{tr("producerRegDisabled")}</p>
        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <Label>{tr("fullName")}</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label>{tr("phoneLabel")}</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div>
            <Label>{tr("emailLabel")}</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>{tr("buyerTypeLabel")}</Label>
            <Select value={buyerType} onChange={(e) => setBuyerType(e.target.value)}>
              <option value="individual">{tr("individual")}</option>
              <option value="organisation">{tr("organisation")}</option>
            </Select>
          </div>
          <div>
            <Label>{tr("otpLabel")} ({tr("demoOtp")}: {DEMO_OTP})</Label>
            <Input value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
          {error && (
            <Alert tone={role === "producer" ? "warning" : "error"}>
              {error}
            </Alert>
          )}
          <Button type="submit" variant="purple" className="w-full" disabled={loading}>
            {loading ? tr("creatingAccount") : tr("createBuyerAccount")}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          {tr("alreadyHaveAccount")}{" "}
          <Link href="/login" className="text-info font-medium hover:underline">
            {tr("login")}
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
