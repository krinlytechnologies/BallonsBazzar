import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { navLinks, siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-cream-50/10 bg-ink-900 text-cream-100">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo inverse />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-100/70">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-marigold-300">
            Explore
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream-100/80 transition-colors hover:text-cream-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-marigold-300">
            Get in touch
          </h3>
          <p className="mt-4 text-sm text-cream-100/80">
            <a href={siteConfig.contact.phoneHref} className="hover:text-cream-50">
              {siteConfig.contact.phone}
            </a>
          </p>
          <p className="mt-2 text-sm text-cream-100/80">
            <Link href="/contact" className="hover:text-cream-50">
              Send an enquiry &rarr;
            </Link>
          </p>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-cream-50/10 py-6 text-xs text-cream-100/50 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
      </Container>
    </footer>
  );
}
