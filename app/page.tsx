import type { Metadata } from "next";
import ExploreProducts from "@/components/ExploreProducts";
import { FinalCta } from "@/components/home/final-cta";
import { HeroSection } from "@/components/home/hero-section";
import { HomeScrollEffects } from "@/components/home/home-scroll-effects";
import { HowItWorks } from "@/components/home/how-it-works";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ParticleField } from "@/components/animations/particle-field";
import { ScrollProgress } from "@/components/animations/scroll-progress";

export const metadata: Metadata = {
  title: "AI Skincare Analysis and Personalized Routine",
  description:
    "Take the Bare-X skin quiz, get your skin score, and explore premium skincare product prototypes tailored to your profile.",
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bare-X",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://barex.skin",
    description:
      "AI-powered skincare analysis platform with personalized routines and premium product prototypes.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://barex.skin"}/quiz`,
      query: "skin quiz"
    }
  };

  return (
    <main className="relative overflow-hidden">
      <HomeScrollEffects />
      <ParticleField />
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />
      <HeroSection />
      <ExploreProducts />
      <HowItWorks />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
