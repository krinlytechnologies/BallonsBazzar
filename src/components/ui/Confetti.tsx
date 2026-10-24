import { cn } from "@/lib/utils";

type ConfettiProps = {
  className?: string;
  tone?: "brand" | "light";
};

const toneColors = {
  brand: [
    "fill-marigold-400", "fill-fiesta-500", "fill-lagoon-400", "fill-fiesta-300",
    "fill-marigold-300", "fill-lagoon-500", "fill-marigold-500", "fill-fiesta-400",
    "fill-lagoon-300", "fill-marigold-400", "fill-fiesta-300", "fill-lagoon-400",
  ],
  light: [
    "fill-cream-50/80", "fill-cream-50/60", "fill-cream-50/90", "fill-marigold-200/90",
    "fill-cream-50/70", "fill-cream-50/60", "fill-marigold-200/80", "fill-cream-50/80",
    "fill-marigold-100/70", "fill-cream-50/90", "fill-cream-50/60", "fill-marigold-200/70",
  ],
};

/**
 * Decorative scatter of dots and balloon shapes. Purely ornamental:
 * aria-hidden, pointer-events-none, and never placed over text or
 * photography that needs to stay legible. Use tone="light" on saturated
 * or dark section backgrounds so the dots stay visible.
 */
export function Confetti({ className, tone = "brand" }: ConfettiProps) {
  const colors = toneColors[tone];
  const balloonColor = tone === "light" ? "fill-cream-50/80" : "fill-fiesta-400";
  const balloonColor2 = tone === "light" ? "fill-marigold-200/80" : "fill-lagoon-400";
  const balloonColor3 = tone === "light" ? "fill-cream-50/70" : "fill-marigold-400";

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      width="280"
      height="220"
      viewBox="0 0 280 220"
      fill="none"
    >
      <circle cx="18" cy="24" r="12" className={colors[0]} />
      <circle cx="58" cy="6" r="7" className={colors[1]} />
      <circle cx="104" cy="32" r="16" className={colors[2]} />
      <circle cx="166" cy="12" r="8" className={colors[3]} />
      <circle cx="214" cy="42" r="13" className={colors[4]} />
      <circle cx="258" cy="16" r="6" className={colors[5]} />
      <circle cx="24" cy="100" r="8" className={colors[6]} />
      <circle cx="140" cy="112" r="6" className={colors[7]} />
      <circle cx="230" cy="124" r="10" className={colors[8]} />
      <circle cx="90" cy="150" r="5" className={colors[9]} />
      <circle cx="10" cy="170" r="9" className={colors[10]} />
      <circle cx="260" cy="180" r="7" className={colors[11]} />
      <path
        d="M72 58c0 12-9 21-20 21s-20-9-20-21 9-21 20-21 20 9 20 21Z"
        className={balloonColor}
      />
      <path d="M52 79v24" className={tone === "light" ? "stroke-cream-50/80" : "stroke-fiesta-400"} strokeWidth="1.5" />
      <path
        d="M210 72c0 11-8 19-18 19s-18-8-18-19 8-19 18-19 18 8 18 19Z"
        className={balloonColor2}
      />
      <path d="M192 91v22" className={tone === "light" ? "stroke-marigold-200/80" : "stroke-lagoon-400"} strokeWidth="1.5" />
      <path
        d="M132 150c0 10-7 18-16 18s-16-8-16-18 7-18 16-18 16 8 16 18Z"
        className={balloonColor3}
      />
      <path d="M116 168v20" className={tone === "light" ? "stroke-cream-50/70" : "stroke-marigold-400"} strokeWidth="1.5" />
    </svg>
  );
}
