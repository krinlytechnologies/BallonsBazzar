import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]",
            align === "center" && "justify-center",
            inverse ? "text-marigold-300" : "text-fiesta-600",
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", inverse ? "bg-marigold-300" : "bg-fiesta-500")} />
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl md:text-5xl",
          inverse ? "text-cream-50" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            inverse ? "text-cream-100/80" : "text-foreground-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
