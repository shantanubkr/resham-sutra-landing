import { RoleGuard } from "@/components/layout/RoleGuard";
import { AppShell } from "@/components/layout/AppShell";

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard roles={["buyer"]}>
      <AppShell>{children}</AppShell>
    </RoleGuard>
  );
}
