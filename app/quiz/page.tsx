import { QuizShell } from "@/components/quiz/quiz-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

export default function QuizPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Container className="py-14 md:py-20">
        <div className="mb-12 max-w-3xl space-y-5">
          <div className="text-xs uppercase tracking-[0.24em] text-accent">Bare-X Analysis</div>
          <h1 className="font-display text-4xl font-bold tracking-[-0.05em] text-white md:text-6xl">
            Build your skin profile with a quiz designed to feel effortless.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/65">
            Every answer sharpens the score, the routine logic, and the insight users leave with.
          </p>
        </div>
        <QuizShell />
      </Container>
    </main>
  );
}
