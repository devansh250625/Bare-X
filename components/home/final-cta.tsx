import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function FinalCta() {
  return (
    <section className="motion-section py-24">
      <Container>
        <div data-section-child className="relative overflow-hidden rounded-[40px] border border-accent/20 bg-[radial-gradient(circle_at_top,rgba(58,134,255,0.24),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-8 md:p-12">
          <div className="absolute inset-0 bg-grid-fade bg-[size:48px_48px] opacity-10" />
          <div className="relative max-w-3xl">
            <div className="text-xs uppercase tracking-[0.28em] text-accent">Early Access</div>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-[-0.05em] text-white md:text-6xl">
              Get your routine first. Be first in line when Bare-X launches.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Capture demand, qualify intent, and let users leave with something valuable before they ever buy.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/quiz">Analyze My Skin</Button>
              <Button href="/waitlist" variant="ghost">
                Join Early Access
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
