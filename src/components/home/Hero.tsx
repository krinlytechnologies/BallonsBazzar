"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FloatingBalloons } from "@/components/ui/FloatingBalloons";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : { opacity: 0, y: 20 };

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[640px] items-end overflow-hidden sm:min-h-[720px]"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="/images/hero/hero-mobile.webp"
          alt="A pastel balloon and floral arch installation with a styled dessert table, set at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src="/images/hero/hero-desktop.webp"
          alt="A pastel balloon and floral arch installation with a styled dessert table, set at golden hour"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-fiesta-900/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-fiesta-500 via-marigold-400 to-lagoon-400" />

      <FloatingBalloons className="right-6 top-10 hidden sm:block sm:right-10 sm:top-14" />
      <FloatingBalloons className="left-6 top-10 hidden sm:block lg:left-10" />

      <motion.div style={{ opacity: contentOpacity }}>
        <Container className="relative py-14 sm:py-20">
        <motion.p
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-fiesta-500 px-4 py-1.5 text-sm font-semibold tracking-wide text-cream-50"
        >
          <span className="h-2 w-2 rounded-full bg-marigold-300" />
          Balloon decor &amp; celebration styling
        </motion.p>
        <motion.h1
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-tight text-cream-50 sm:text-5xl md:text-6xl"
        >
          Celebrations, styled to be <span className="text-marigold-300">remembered</span>
        </motion.h1>
        <motion.p
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-lg text-base text-cream-100/90 sm:text-lg"
        >
          BalloonBazaar designs and installs balloon decor for birthdays, baby
          showers and milestone moments — built around your celebration, not
          a catalogue.
        </motion.p>
        <motion.div
          initial={initial}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Button href="/contact">Plan your celebration</Button>
          <Button href="/gallery" variant="ghost">
            See our work
          </Button>
        </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
