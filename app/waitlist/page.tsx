import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Container className="grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-6">
          <div className="text-xs uppercase tracking-[0.24em] text-accent">Launch Queue</div>
          <h1 className="font-display text-4xl font-bold tracking-[-0.05em] text-white md:text-6xl">
            Join early access and capture your highest-intent users now.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/65">
            Bare-X is designed for pre-demand validation. Every email becomes signal for future launches, subscriptions, and smarter product prioritization.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Personalized routine", "Delivered first"],
              ["Priority launch access", "No noise, just updates"],
              ["Demand signal captured", "Ready for growth"]
            ].map(([title, detail]) => (
              <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-base font-medium text-white">{title}</div>
                <div className="mt-2 text-sm text-white/55">{detail}</div>
              </div>
            ))}
          </div>
        </div>
        <WaitlistForm />
      </Container>
    </main>
  );
}
