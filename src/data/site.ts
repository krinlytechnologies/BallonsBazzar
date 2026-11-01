const whatsappEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const siteConfig = {
  name: "BalloonBazaar",
  tagline: "Birthday parties, balloon decor & celebrations",
  description:
    "BalloonBazaar designs and installs balloon decor and celebration styling for birthdays, baby showers, milestone moments and more.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://balloonbazaar.in",
  logo: "/images/brand/logo-primary.png",
  contact: {
    // Verified from BalloonBazaar's own installation signage (see
    // public/images/celebrations/other-events/other-01.webp).
    phone: "+91 95660 40112",
    phoneHref: "tel:+919566040112",
    // Primary enquiry channel. International format, digits only (e.g. 919566040112).
    // Empty when unset or malformed, which switches the contact form to its fallback.
    whatsappNumber: /^\d{8,15}$/.test(whatsappEnv) ? whatsappEnv : "",
    // No verified public email address exists yet. Set
    // NEXT_PUBLIC_CONTACT_EMAIL to publish one once confirmed.
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Celebrations", href: "/celebrations" },
  { label: "PartyBazaar", href: "/partybazaar" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
