"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession } from "@/lib/api-client";
import { useSession } from "@/components/layout/RoleGuard";
import { LanguageSwitcher, useI18n } from "@/lib/i18n/provider";
import { NAV_BY_ROLE } from "@/lib/i18n/nav";
import { Button } from "@/components/ui/Button";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useSession();
  const { tr } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const role = session?.user.role ?? "admin";
  const links = NAV_BY_ROLE[role] ?? [];
  const border = "border-black";

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    clearSession();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`border-b-4 bg-white ${border}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="font-bold text-lg">
            <span className="text-foreground">{tr("reshamSutra")}</span>{" "}
            <span className="text-muted font-normal text-sm">{tr("appSubtitle")}</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          {session && (
            <>
              <span className="hidden text-sm text-muted sm:block">
                {session.user.name}
              </span>
              <Button variant="ghost" onClick={logout} className="text-sm">
                {tr("logout")}
              </Button>
            </>
          )}
          </div>
        </div>
        {session && (
          <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                  pathname.startsWith(link.href)
                    ? "bg-info-bg text-info-foreground ring-1 ring-info-border"
                    : "text-muted hover:bg-gray-50"
                }`}
              >
                {tr(link.labelKey)}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="mt-1 text-muted text-sm">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
