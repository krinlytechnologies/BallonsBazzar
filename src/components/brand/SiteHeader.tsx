"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { navLinks, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/8 bg-cream-50">
      <Container className="flex items-center justify-between py-3">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-colors",
                  active ? "text-fiesta-600" : "text-ink-800 hover:text-fiesta-600",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={siteConfig.contact.phoneHref}
            className="text-sm font-semibold text-ink-800 transition-colors hover:text-fiesta-600"
          >
            {siteConfig.contact.phone}
          </a>
          <Button href="/contact" className="px-5 py-2.5 text-sm">
            Enquire now
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-900 md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform duration-200",
                menuOpen && "translate-y-[7px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity duration-200",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform duration-200",
                menuOpen && "-translate-y-[7px] -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink-900/8 bg-cream-50 md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-semibold",
                    pathname === link.href
                      ? "bg-fiesta-50 text-fiesta-600"
                      : "text-ink-800",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={siteConfig.contact.phoneHref}
                className="rounded-lg px-3 py-3 text-base font-semibold text-ink-800"
              >
                {siteConfig.contact.phone}
              </a>
              <Button href="/contact" onClick={() => setMenuOpen(false)} className="mt-2 w-full">
                Enquire now
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
