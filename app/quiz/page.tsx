import type { Metadata } from "next";
import { QuizShell } from "@/components/quiz/quiz-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Skin Quiz",
  description:
    "Take the Bare-X skin quiz to analyze your skin type, concerns, and lifestyle — then get your personalized skincare system.",
  alternates: { canonical: "/quiz" }
};

export default function QuizPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Container className="py-10 pt-28 md:py-20 md:pt-32">
        <div className="mb-10 max-w-3xl space-y-4">
          <div className="text-[10px] uppercase tracking-[0.24em] text-accent">Bare-X Analysis</div>
          <h1 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl">
            Build your skin profile in 30 seconds.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/50 sm:text-lg">
            Every answer sharpens your score, your system match, and the routine you leave with.
          </p>
        </div>
        <QuizShell />
      </Container>
    </main>
  );
}
