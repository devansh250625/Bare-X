import { FinalCta } from "@/components/home/final-cta";
import { FeatureGrid } from "@/components/home/feature-grid";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { SocialProof } from "@/components/home/social-proof";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <SiteHeader />
      <HeroSection />
      <FeatureGrid />
      <HowItWorks />
      <SocialProof />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
