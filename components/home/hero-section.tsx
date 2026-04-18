import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { HeroBlueprintCard } from "@/components/home/hero-blueprint-card";
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
          <div data-parallax-section>
            <HeroBlueprintCard />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
