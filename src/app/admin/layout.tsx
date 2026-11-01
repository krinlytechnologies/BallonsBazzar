import type { Metadata } from "next";

// Intentionally its own root layout: no Tailwind globals.css import, no
// site header/footer. This keeps the embedded Sanity Studio's own styling
// fully isolated from the public storefront's design system, and is also
// what makes /admin cleanly servable from a separate subdomain later (see
// src/proxy.ts) without dragging marketing-site chrome along with it.
export const metadata: Metadata = {
  title: "PartyBazaar Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
