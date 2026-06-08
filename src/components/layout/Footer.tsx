import Link from "next/link";
import { LogoLink } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { CONTACT, NAV_LINKS } from "@/lib/constants";

const SOCIAL = [
  { label: "Facebook", href: "https://facebook.com/ReshamSutra" },
  { label: "Twitter", href: "https://twitter.com/ReshamSutra" },
  { label: "LinkedIn", href: "https://linkedin.com/company/reshamsutra" },
  { label: "Instagram", href: "https://instagram.com/ReshamSutra" },
  { label: "YouTube", href: "https://www.youtube.com/@reshamsutra" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[#EEEEEE] bg-white">
      <div className="h-1 bg-[linear-gradient(90deg,#FCE900,#04B648,#615EAA)]" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <LogoLink className="h-16 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#555555]">
              Building silk livelihood ecosystems for rural women across India.
            </p>
            <div className="mt-6">
              <Button href="/contact">Partner With Us</Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#1A1A1A]">Navigate</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#555555] transition-colors hover:text-brand-purple"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#1A1A1A]">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-[#555555]">
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-brand-green"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-brand-green"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-green"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#1A1A1A]">Follow</h3>
            <ul className="mt-4 space-y-2">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#555555] transition-colors hover:text-brand-purple"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#EEEEEE] pt-8 text-center text-xs text-[#555555] sm:text-left">
          <p>
            FCRA Registered · CSR Compliant · GuideStar Transparency Verified
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} Resham Sutra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
