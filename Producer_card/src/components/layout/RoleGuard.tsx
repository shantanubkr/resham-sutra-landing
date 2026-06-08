"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  apiFetch,
  clearSession,
  getSession,
  type ClientSession,
} from "@/lib/api-client";
import { useI18n } from "@/lib/i18n/provider";

export function useSession(required = false) {
  const [session, setSessionState] = useState<ClientSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const local = getSession();
    if (!local) {
      setLoading(false);
      if (required) router.replace("/login");
      return;
    }

    apiFetch<{ user: ClientSession["user"] }>("/api/auth/me")
      .then((data) => {
        setSessionState({ token: local.token, user: data.user });
      })
      .catch(() => {
        clearSession();
        if (required) router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [required, router]);

  return { session, loading };
}

export function RoleGuard({
  roles,
  children,
}: {
  roles: string[];
  children: React.ReactNode;
}) {
  const { session, loading } = useSession(true);
  const { tr } = useI18n();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session && !roles.includes(session.user.role)) {
      router.replace("/");
    }
  }, [loading, session, roles, router]);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-muted">
        {tr("loading")}
      </div>
    );
  }
  if (!session || !roles.includes(session.user.role)) return null;
  return <>{children}</>;
}
