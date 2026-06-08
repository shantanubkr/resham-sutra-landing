import { ButtonHTMLAttributes } from "react";
import { semanticStyles } from "@/lib/ui/semantic";

type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "ghost"
  | "green"
  | "purple"
  | "admin";

const variants: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "border border-gray-300 bg-white text-foreground hover:bg-gray-50",
  success: semanticStyles.success.button,
  info: semanticStyles.info.button,
  warning: semanticStyles.warning.button,
  danger: semanticStyles.error.button,
  ghost: "text-muted hover:bg-gray-100",
  green: semanticStyles.success.button,
  purple: semanticStyles.info.button,
  admin: "bg-gray-800 text-white hover:bg-gray-700",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
