"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { apiFetch, roleHomePath, setSession } from "@/lib/api-client";
import { DEMO_OTP } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { LanguageSwitcher, useI18n } from "@/lib/i18n/provider";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tr } = useI18n();
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(searchParams.get("role") ?? "admin");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiFetch<{
        token: string;
        user: {
          id: string;
          phone: string;
          email: string | null;
          role: string;
          name: string;
          clusterIds: string[];
          producerId: string | null;
          buyerId: string | null;
        };
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ phone, role, otp }),
      });
      setSession({ token: data.token, user: data.user });
      router.push(roleHomePath(data.user.role));
    } catch (err) {
      setError(err instanceof Error ? err.message : tr("loginFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <div className="mb-4 flex justify-end">
          <LanguageSwitcher />
        </div>
        <h1 className="text-xl font-bold">{tr("login")}</h1>
        <p className="mt-1 text-sm text-muted">
          {tr("producerRegDisabled").split(".")[0]}.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <Label>{tr("roleLabel")}</Label>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">{tr("centralAdminRole")}</option>
              <option value="cluster_head">{tr("clusterHeadRole")}</option>
              <option value="field_operator">{tr("reshamDootRole")}</option>
              <option value="producer">{tr("producerViewOnly")}</option>
              <option value="buyer">{tr("buyer")}</option>
            </Select>
          </div>
          <div>
            <Label>{tr("phoneLabel")}</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit phone number"
              required
            />
          </div>
          <div>
            <Label>{tr("otpLabel")}</Label>
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
            />
          </div>
          {error && <Alert tone="error">{error}</Alert>}
          <Button
            type="submit"
            variant="green"
            className="w-full"
            disabled={loading}
          >
            {loading ? tr("signingIn") : tr("signIn")}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          {tr("noAccount")}{" "}
          <Link
            href="/register"
            className="text-info font-medium hover:underline"
          >
            {tr("registerLink")}
          </Link>
        </p>

        <p className="mt-6 border-t border-gray-100 pt-4 text-center text-xs text-muted">
          Pilot environment &middot; OTP:{" "}
          <code className="rounded bg-gray-100 px-1">{DEMO_OTP}</code>
        </p>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
