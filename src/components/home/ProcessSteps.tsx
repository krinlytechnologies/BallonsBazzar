import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Confetti } from "@/components/ui/Confetti";

const steps = [
  {
    number: "01",
    title: "Tell us about your celebration",
    description: "Share the date, occasion and the look you have in mind through our enquiry form.",
    numberColor: "text-fiesta-500",
    dotColor: "bg-fiesta-500",
  },
  {
    number: "02",
    title: "We confirm the details",
    description: "We get back to you to talk through styling, scope and availability for your date.",
    numberColor: "text-marigold-500",
    dotColor: "bg-marigold-500",
  },
  {
    number: "03",
    title: "We style it on the day",
    description: "Our team installs the decor on site, so it's ready before your guests arrive.",
    numberColor: "text-lagoon-500",
    dotColor: "bg-lagoon-500",
  },
];

export function ProcessSteps() {
  return (
    <section className="relative overflow-hidden bg-lagoon-100 py-20 sm:py-28">
      <Confetti className="-right-12 -top-12 scale-125 rotate-12 opacity-90" />
      <Confetti className="-left-12 -bottom-12 scale-110 -rotate-12 opacity-70" />
      <Container className="relative">
        <SectionHeading
          eyebrow="How it works"
          title="Simple, from enquiry to install"
          align="center"
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.1} className="text-center">
              <span className={`inline-block h-3 w-3 rounded-full ring-4 ring-cream-50 ${step.dotColor}`} />
              <span className={`mt-2 block font-[family-name:var(--font-display)] text-5xl ${step.numberColor}`}>
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
