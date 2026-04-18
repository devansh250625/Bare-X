import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    label: "01",
    title: "Answer a short skin intelligence quiz",
    description:
      "We capture skin type, concern mix, barrier sensitivity, lifestyle triggers, and current routine maturity."
  },
  {
    label: "02",
    title: "Get your Skin Score and profile",
    description:
      "The engine transforms your responses into a structured score across acne risk, oil, hydration, and sensitivity."
  },
  {
    label: "03",
    title: "Unlock your personalized routine",
    description:
      "We map the right cleanser, moisturizer, and SPF direction, then convert intent into waitlist demand."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="How It Works"
          title="A premium diagnostic funnel built to feel sharp, fast, and inevitable."
          description="Every screen is designed to move the user toward clarity. Nothing feels clinical, but nothing feels vague either."
          action={
            <Button href="/quiz" className="group gap-2">
              Start Analysis
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Button>
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.label} delay={index * 0.08}>
              <div className="relative h-full rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7">
                <div className="text-xs tracking-[0.4em] text-accent">{step.label}</div>
                <h3 className="mt-8 text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-white/60">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
