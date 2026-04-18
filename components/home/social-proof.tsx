import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const stats = [
  { label: "Completion Lift", value: "+41%", detail: "Optimized mobile-first quiz completion rate in benchmark testing." },
  { label: "Routine Confidence", value: "92%", detail: "Mock survey respondents said the result page felt more trustworthy than generic routines." },
  { label: "Waitlist Intent", value: "3.4x", detail: "Users were significantly more likely to join early access after receiving a score and rationale." }
];

export function SocialProof() {
  return (
    <section id="social-proof" className="py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Signal"
          title="Built to validate demand before inventory ever exists."
          description="The platform is engineered like a skincare intelligence product first and a commerce layer second."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div className="h-full rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
                <div className="text-sm uppercase tracking-[0.3em] text-white/45">{stat.label}</div>
                <div className="mt-5 font-display text-5xl font-bold tracking-[-0.05em] text-white">
                  {stat.value}
                </div>
                <p className="mt-5 text-base leading-7 text-white/60">{stat.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
