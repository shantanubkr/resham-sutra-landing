import { RoleGuard } from "@/components/layout/RoleGuard";
import { AppShell } from "@/components/layout/AppShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard roles={["admin", "cluster_head", "field_operator"]}>
      <AppShell>{children}</AppShell>
    </RoleGuard>
  );
}
