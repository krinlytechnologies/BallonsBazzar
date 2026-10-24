"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type AmbientVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

export function AmbientVideo({ src, poster, className }: AmbientVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldReduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- poster needs no layout/optimization logic separate from the video it stands in for */}
      <img
        src={poster}
        alt=""
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
          inView ? "opacity-0" : "opacity-100",
        )}
      />
      {inView ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      ) : null}
    </div>
  );
}
