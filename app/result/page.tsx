import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { ResultClient } from "@/app/result/result-client";

export const metadata: Metadata = {
  title: "Your Bare-X Result",
  description:
    "See your Bare-X skin score, skin profile, and personalized skincare routine with recommended product prototypes.",
  alternates: {
    canonical: "/result"
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function ResultPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <ResultClient />
    </main>
  );
}
