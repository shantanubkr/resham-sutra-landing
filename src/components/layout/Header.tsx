"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div
          className={`rounded-lg border border-[#EEEEEE] bg-white/95 shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-sm ${
            mobileOpen ? "overflow-hidden" : "overflow-visible"
          }`}
        >
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              onClick={() => setMobileOpen(false)}
            >
              <Logo className="h-12 w-auto sm:h-14" />
            </Link>

            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Main"
            >
              {NAV_LINKS.map((link) =>
                "children" in link && link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#1A1A1A]/5 ${
                        isActive(link.href)
                          ? "text-[#1A1A1A] ring-1 ring-brand-green/30 ring-inset"
                          : "text-[#555555] hover:text-[#1A1A1A]"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {openDropdown === link.label && (
                      <div className="absolute left-0 top-full z-50 pt-2">
                        <div className="min-w-[220px] rounded-lg border border-[#EEEEEE] bg-white py-1 shadow-lg">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-[#555555] transition-colors hover:bg-brand-green/10 hover:text-[#1A1A1A]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[#1A1A1A]/5 ${
                      isActive(link.href)
                        ? "text-[#1A1A1A] ring-1 ring-brand-green/30 ring-inset"
                        : "text-[#555555] hover:text-[#1A1A1A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-3">
              <Button href="/contact" className="hidden sm:inline-flex">
                Partner With Us
              </Button>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-[#1A1A1A] hover:bg-[#1A1A1A]/5 lg:hidden"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((open) => !open)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  {mobileOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="border-t border-[#EEEEEE] lg:hidden">
              <nav className="flex flex-col px-4 py-4 sm:px-6" aria-label="Mobile">
                {NAV_LINKS.map((link) =>
                  "children" in link && link.children ? (
                    <div
                      key={link.label}
                      className="border-b border-[#EEEEEE] py-2"
                    >
                      <Link
                        href={link.href}
                        className="block py-2 text-sm font-semibold text-[#1A1A1A]"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <div className="pb-2 pl-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-1.5 text-sm text-[#555555]"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="border-b border-[#EEEEEE] py-3 text-sm font-medium text-[#1A1A1A]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
                <div className="pt-4">
                  <Button href="/contact" className="w-full">
                    Partner With Us
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
