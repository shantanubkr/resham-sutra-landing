export type SemanticTone = "success" | "warning" | "error" | "info";

export const semanticStyles: Record<
  SemanticTone,
  { alert: string; badge: string; text: string; button: string; link: string }
> = {
  success: {
    alert: "border-success-border bg-success-bg text-success-foreground",
    badge: "bg-success-bg text-success-foreground ring-1 ring-success-border",
    text: "text-success",
    button: "bg-success text-white hover:opacity-90",
    link: "text-success hover:underline",
  },
  warning: {
    alert: "border-warning-border bg-warning-bg text-warning-foreground",
    badge: "bg-warning-bg text-warning-foreground ring-1 ring-warning-border",
    text: "text-warning",
    button: "bg-warning text-white hover:opacity-90",
    link: "text-warning hover:underline",
  },
  error: {
    alert: "border-error-border bg-error-bg text-error-foreground",
    badge: "bg-error-bg text-error-foreground ring-1 ring-error-border",
    text: "text-error",
    button: "bg-error text-white hover:opacity-90",
    link: "text-error hover:underline",
  },
  info: {
    alert: "border-info-border bg-info-bg text-info-foreground",
    badge: "bg-info-bg text-info-foreground ring-1 ring-info-border",
    text: "text-info",
    button: "bg-info text-white hover:opacity-90",
    link: "text-info hover:underline",
  },
};
