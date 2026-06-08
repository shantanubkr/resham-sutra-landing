import type { SemanticTone } from "@/lib/ui/semantic";
import { semanticStyles } from "@/lib/ui/semantic";

export function Alert({
  tone,
  children,
  className = "",
}: {
  tone: SemanticTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${semanticStyles[tone].alert} ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
}

export function InlineMessage({
  tone,
  children,
  className = "",
}: {
  tone: SemanticTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-sm ${semanticStyles[tone].text} ${className}`}>
      {children}
    </p>
  );
}
