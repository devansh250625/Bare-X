import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

export const metadata: Metadata = {
  title: "Early Access Waitlist",
  description:
    "Join the Bare-X early access waitlist. Get a personalized skincare system + 15% off coupon at launch.",
  alternates: { canonical: "/waitlist" }
};

export default function WaitlistPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Container className="flex min-h-[80vh] items-center justify-center pb-16 pt-28 sm:pt-32">
        <div className="grid w-full max-w-4xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <div className="text-[10px] uppercase tracking-[0.25em] text-accent">Early Access</div>
            <h1 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl">
              Get your personalized routine + 15% off.
            </h1>
            <p className="max-w-md text-base leading-relaxed text-foreground/50">
              Join the waitlist. We&apos;ll send you an exclusive launch coupon and first access to your AI-matched skincare system.
            </p>
            <div className="flex flex-wrap gap-4 text-[12px] text-foreground/35">
              <span>✓ No payment required</span>
              <span>✓ Coupon sent instantly</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
          <WaitlistForm />
        </div>
      </Container>
      <SiteFooter />
    </main>
  );
}
