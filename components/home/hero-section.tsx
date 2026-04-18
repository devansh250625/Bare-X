import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { HeroProductStage } from "@/components/home/hero-product-stage";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  return (
    <section className="motion-section relative overflow-hidden py-18 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(58,134,255,0.28),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_18%)]" />
      <div className="absolute inset-x-0 top-0 h-[520px] bg-grid-fade bg-[size:52px_52px] opacity-20 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div data-orb className="absolute left-[8%] top-24 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
      <div data-orb className="absolute right-[10%] top-40 h-28 w-28 rounded-full bg-white/8 blur-3xl" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8" data-parallax-section>
          <Reveal>
            <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70">
              AI Skin Analysis. Premium Routine Intelligence.
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-sheen max-w-4xl font-display text-4xl font-bold tracking-[-0.06em] sm:text-5xl md:text-7xl">
              Stop Guessing Your Skincare
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-base leading-7 text-white/65 sm:text-lg md:text-xl">
              Bare-X analyzes your skin, scores your profile, and builds a routine in 30 seconds
              with precision-first logic and an editorial-grade experience.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col gap-4 sm:flex-row">
            <Button href="/quiz" className="group gap-2">
              Analyze My Skin
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Button>
            <Button href="/waitlist" variant="ghost">
              Join Early Access
            </Button>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-6 text-sm text-white/45">
              <span>30-second analysis</span>
              <span>Deterministic skin scoring</span>
              <span>No inventory pressure</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div
            data-parallax-section
            className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 shadow-glow backdrop-blur-xl sm:p-6"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent/10 to-transparent" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Launch Preview</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Original Bare-X Packaging</p>
                </div>
                <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-accent">
                  Future Inventory
                </div>
              </div>
              <HeroProductStage />
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Acne Control", "Matte black tube"],
                  ["Oil-Free Moisturizer", "Airless pump bottle"],
                  ["SPF 50", "Protected daily tube"]
                ].map(([item, detail]) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-black/30 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">{detail}</p>
                    <p className="mt-2 text-sm font-medium text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
