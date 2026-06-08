import type { SemanticTone } from "@/lib/ui/semantic";
import { semanticStyles } from "@/lib/ui/semantic";

type BadgeColor =
  | "gray"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "green"
  | "purple"
  | "yellow"
  | "admin";

const colors: Record<BadgeColor, string> = {
  gray: "bg-gray-100 text-gray-800",
  success: semanticStyles.success.badge,
  warning: semanticStyles.warning.badge,
  error: semanticStyles.error.badge,
  info: semanticStyles.info.badge,
  green: semanticStyles.success.badge,
  purple: semanticStyles.info.badge,
  yellow: semanticStyles.warning.badge,
  admin: semanticStyles.info.badge,
};

export function Badge({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: BadgeColor;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[color]}`}
    >
      {children}
    </span>
  );
}

export type { SemanticTone };
