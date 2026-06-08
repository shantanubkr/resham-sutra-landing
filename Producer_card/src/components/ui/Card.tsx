export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

type StatAccent = "green" | "purple" | "yellow" | "admin" | "success" | "warning" | "info";

const statBorders: Record<StatAccent, string> = {
  green: "border-t-success",
  purple: "border-t-info",
  yellow: "border-t-warning",
  admin: "border-t-black",
  success: "border-t-success",
  warning: "border-t-warning",
  info: "border-t-info",
};

export function StatCard({
  label,
  value,
  accent = "green",
}: {
  label: string;
  value: string | number;
  accent?: StatAccent;
}) {
  return (
    <Card className={`border-t-4 ${statBorders[accent]}`}>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
    </Card>
  );
}
