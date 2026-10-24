"use client";

import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type Variant = "primary" | "secondary" | "ghost" | "light";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-fiesta-500 to-fiesta-600 text-cream-50 shadow-sm shadow-fiesta-500/30 hover:from-fiesta-600 hover:to-fiesta-700 active:from-fiesta-700 active:to-fiesta-800",
  secondary:
    "bg-transparent text-ink-800 border border-ink-800/30 hover:border-ink-800 hover:bg-ink-800/5",
  ghost:
    "bg-transparent text-cream-50 border border-cream-50/40 hover:border-cream-50 hover:bg-cream-50/10",
  light:
    "bg-cream-50 text-fiesta-600 hover:bg-cream-100",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fiesta-500";

type MotionConflictKeys = "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd";

type ButtonProps = {
  variant?: Variant;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, MotionConflictKeys>)
  | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, MotionConflictKeys>)
);

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);
  const shouldReduceMotion = useReducedMotion();
  const tapHover = shouldReduceMotion
    ? {}
    : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

  if (props.href !== undefined) {
    return <MotionLink {...props} {...tapHover} className={classes} />;
  }

  return <motion.button {...props} {...tapHover} className={classes} />;
}
