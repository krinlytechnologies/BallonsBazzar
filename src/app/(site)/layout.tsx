import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/data/site";
import { SiteHeader } from "@/components/brand/SiteHeader";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: ["/images/hero/hero-desktop.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/hero/hero-desktop.webp"],
  },
  icons: {
    icon: [
      { url: "/images/brand/favicon/favicon.ico" },
      { url: "/images/brand/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/brand/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/brand/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/brand/favicon/apple-touch-icon.png",
  },
  manifest: "/images/brand/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${plusJakartaSans.variable} flex min-h-screen flex-col`}
      >
        <ScrollProgressBar />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
