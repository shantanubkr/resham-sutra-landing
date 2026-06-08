import { RoleGuard } from "@/components/layout/RoleGuard";
import { AppShell } from "@/components/layout/AppShell";

export default function ProducerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard roles={["producer"]}>
      <AppShell>{children}</AppShell>
    </RoleGuard>
  );
}
