import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { BRAND_IMAGES } from "@/lib/images";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Resham Sutra | Silk Livelihood Ecosystems for Rural Women",
    template: "%s · Resham Sutra",
  },
  description:
    "Resham Sutra builds silk livelihood ecosystems for rural women across India through training, solar-powered machinery, and market access.",
  openGraph: {
    images: [{ url: BRAND_IMAGES.og, width: 1200, height: 630, alt: "Resham Sutra" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-[#1A1A1A]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
