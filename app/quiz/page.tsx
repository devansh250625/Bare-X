import type { Metadata } from "next";
import { QuizShell } from "@/components/quiz/quiz-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Skin Quiz",
  description:
    "Take the Bare-X skincare quiz to analyze skin type, concerns, sensitivity, and lifestyle before receiving your personalized routine.",
  alternates: {
    canonical: "/quiz"
  }
};

export default function QuizPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Container className="py-10 md:py-20">
        <div className="mb-10 max-w-3xl space-y-5">
          <div className="text-xs uppercase tracking-[0.24em] text-accent">Bare-X Analysis</div>
          <h1 className="font-display text-3xl font-bold tracking-[-0.05em] text-white sm:text-4xl md:text-6xl">
            Build your skin profile with a quiz designed to feel effortless.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
            Every answer sharpens the score, the routine logic, and the insight users leave with.
          </p>
        </div>
        <QuizShell />
      </Container>
    </main>
  );
}
