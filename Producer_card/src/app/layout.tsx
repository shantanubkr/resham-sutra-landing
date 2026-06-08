import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/provider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Producer System | Resham Sutra",
    template: "%s · Producer System",
  },
  description:
    "Electronic People & Producer System — digital identity and producer database for rural silk livelihood ecosystems.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-[#1A1A1A]">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
