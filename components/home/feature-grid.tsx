import { Brain, ShieldCheck, Sparkles, TimerReset } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const features = [
  {
    icon: Brain,
    title: "Personalization without guesswork",
    description:
      "Most skincare starts with trend-chasing. Bare-X starts with your skin signals and maps a routine around them."
  },
  {
    icon: TimerReset,
    title: "Fast enough to convert",
    description:
      "The flow is deliberately compact so users complete it on mobile, understand the output, and join early access."
  },
  {
    icon: ShieldCheck,
    title: "Deterministic analysis core",
    description:
      "Scores come from transparent logic, while AI is reserved for premium explanations rather than hidden recommendations."
  },
  {
    icon: Sparkles,
    title: "Designed like a luxury product",
    description:
      "High-contrast surfaces, motion systems, and layered depth create the premium feel your brand promise needs."
  }
];

export function FeatureGrid() {
  return (
    <section id="problem" className="motion-section py-24">
      <Container className="space-y-12">
        <div data-section-child>
        <SectionHeading
          eyebrow="The Problem"
          title="Skincare feels noisy, generic, and expensive before it ever feels useful."
          description="Users are overwhelmed by routines they do not understand. Bare-X removes that confusion by replacing random product discovery with a guided analysis engine."
        />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.05}>
              <div className="group h-full rounded-[32px] border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:border-accent/40 hover:bg-white/[0.06]">
                <feature.icon className="h-10 w-10 text-accent transition duration-300 group-hover:scale-105" />
                <h3 className="mt-8 text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-4 text-base leading-7 text-white/60">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
