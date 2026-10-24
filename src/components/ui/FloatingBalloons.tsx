"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type FloatingBalloonsProps = {
  className?: string;
};

const balloons = [
  { color: "fill-fiesta-400", size: 46, x: 0, duration: 4.5, delay: 0 },
  { color: "fill-marigold-400", size: 34, x: 36, duration: 3.8, delay: 0.3 },
  { color: "fill-lagoon-300", size: 28, x: -32, duration: 5.2, delay: 0.6 },
];

export function FloatingBalloons({ className }: FloatingBalloonsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute z-10", className)}>
      {balloons.map((balloon, index) => (
        <motion.svg
          key={index}
          width={balloon.size}
          height={balloon.size * 1.3}
          viewBox="0 0 40 52"
          className="absolute origin-bottom drop-shadow-md"
          style={{ left: balloon.x, top: index * 14 }}
          animate={
            shouldReduceMotion
              ? undefined
              : { y: [0, -14, 0], x: [0, 6, -4, 0], rotate: [-4, 4, -3, 0] }
          }
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ellipse cx="20" cy="20" rx="18" ry="20" className={balloon.color} />
          <ellipse cx="14" cy="13" rx="4" ry="6" className="fill-cream-50/30" />
          <path d="M20 40 L16 46 L24 46 Z" className={balloon.color} />
          <path d="M20 46v6" stroke="currentColor" className="text-cream-50/70" strokeWidth="1" />
        </motion.svg>
      ))}
    </div>
  );
}
