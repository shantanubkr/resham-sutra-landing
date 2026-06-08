import { InputHTMLAttributes } from "react";

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-info focus:ring-2 focus:ring-info/20 ${className}`}
      {...props}
    />
  );
}

export function Select({
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-info focus:ring-2 focus:ring-info/20 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function Textarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-info focus:ring-2 focus:ring-info/20 ${className}`}
      rows={3}
      {...props}
    />
  );
}

export function Label({
  children,
  htmlFor,
  className = "",
}: {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1 block text-sm font-medium ${className}`}
    >
      {children}
    </label>
  );
}
