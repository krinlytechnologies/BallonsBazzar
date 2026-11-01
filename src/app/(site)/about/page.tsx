import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "What BalloonBazaar does and how we approach balloon decor and celebration styling.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream-50 py-16 sm:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="About BalloonBazaar" title="What we do" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
              <p>
                BalloonBazaar designs and installs balloon decor for
                celebrations — birthdays, baby showers, milestone moments,
                surprise parties and themed events.
              </p>
              <p>
                Each setup is built on site around the occasion: balloon
                arches and garlands, personalised backdrops, and full-room
                styling assembled piece by piece before guests arrive.
              </p>
              <p>
                Browse the <a href="/celebrations" className="font-semibold text-fiesta-600 underline-offset-4 hover:underline">celebrations</a> we
                style and the <a href="/gallery" className="font-semibold text-fiesta-600 underline-offset-4 hover:underline">gallery</a> of
                past work, then get in touch with your date and vision.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/contact">Get in touch</Button>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-brand-lg">
            <Image
              src="/images/celebrations/surprise-parties/surprise-01.webp"
              alt="BalloonBazaar surprise party balloon decor installation"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
