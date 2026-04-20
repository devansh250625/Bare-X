import type { Metadata } from "next";
import ExploreProducts from "@/components/ExploreProducts";
import { FinalCta } from "@/components/home/final-cta";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { SkinNotGeneric } from "@/components/home/skin-not-generic";
import { WrongSkincare } from "@/components/home/wrong-skincare";
import { SkinScience } from "@/components/home/skin-science";
import { AiExplainer } from "@/components/home/ai-explainer";
import { FounderStory } from "@/components/home/founder-story";
import { SkinUrgency } from "@/components/home/skin-urgency";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollProgress } from "@/components/animations/scroll-progress";

export const metadata: Metadata = {
  title: "AI Skincare Analysis and Personalized Routine",
  description:
    "Take the Bare-X skin quiz, get your skin score, and receive a precision skincare system tailored to your exact skin profile.",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <ScrollProgress />
      <SiteHeader />
      <HeroSection />
      <SkinNotGeneric />
      <WrongSkincare />
      <ExploreProducts />
      <SkinScience />
      <HowItWorks />
      <AiExplainer />
      <SkinUrgency />
      <FounderStory />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
