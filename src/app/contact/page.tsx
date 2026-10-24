import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BalloonBazaar to plan your celebration.",
};

export default function ContactPage() {
  return (
    <section className="bg-cream-50 py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Plan your celebration"
            description="Share your event date and vision below. For anything urgent, you can also call us directly."
          />
          <p className="mt-6 text-sm font-semibold text-ink-800">
            <a href={siteConfig.contact.phoneHref} className="text-fiesta-600 hover:underline">
              {siteConfig.contact.phone}
            </a>
          </p>
        </div>

        <Suspense>
          <ContactForm />
        </Suspense>
      </Container>
    </section>
  );
}
