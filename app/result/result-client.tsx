"use client";

import { useState } from "react";
import Link from "next/link";
import { AnalysisPayload } from "@/lib/types";
import { useQuizStore } from "@/store/quiz-store";
import { ScoreBars } from "@/components/result/score-bars";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductPrototype } from "@/components/product/product-prototype";

export function ResultClient() {
  const storeResult = useQuizStore((state) => state.result);
  const [cachedResult] = useState<AnalysisPayload | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const cached = window.sessionStorage.getItem("barex-result");
    return cached ? (JSON.parse(cached) as AnalysisPayload) : null;
  });

  const result = storeResult ?? cachedResult;

  if (!result) {
    return (
      <Container className="py-24">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center">
          <h1 className="font-display text-3xl font-bold text-white">No analysis found yet.</h1>
          <p className="mt-4 text-white/60">Run the Bare-X quiz first to unlock your skin score and routine.</p>
          <div className="mt-8">
            <Button href="/quiz">Start Quiz</Button>
          </div>
        </div>
      </Container>
    );
  }

  const compositeScore = Math.round(
    ((10 - result.skinScore.acneRisk) +
      (10 - Math.abs(result.skinScore.oilLevel - 5)) +
      result.skinScore.hydration +
      (10 - result.skinScore.sensitivity)) *
      2.5
  );

  return (
    <Container className="py-10 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 rounded-[30px] border border-white/10 bg-white/[0.04] p-5 md:rounded-[36px] md:p-7">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-accent">Skin Score</div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
              {compositeScore}
              <span className="text-white/40">/100</span>
            </h1>
            <p className="mt-4 text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              {result.explanation}
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-black/35 p-4 md:rounded-[28px] md:p-5">
            <p className="mb-5 text-sm uppercase tracking-[0.22em] text-white/45">Metric Breakdown</p>
            <ScoreBars score={result.skinScore} />
          </div>

          <div className="flex flex-wrap gap-3">
            {result.profile.map((item) => (
              <div key={item} className="rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm text-accent">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-5 md:rounded-[36px] md:p-7">
            <div className="text-xs uppercase tracking-[0.24em] text-accent">Your Routine</div>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">
              Personalized to your skin profile
            </h2>
            <p className="mt-4 text-base leading-7 text-white/60">
              This routine is mapped with deterministic rules from your quiz responses, then explained in a more human way by the AI layer.
            </p>
          </div>

          <div className="grid gap-5">
            {result.routine.map((product) => (
              <div key={product.name} className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.025] p-4 md:rounded-[32px] md:p-6">
                <div className="grid gap-4 md:grid-cols-[220px_1fr] md:items-center">
                  <ProductPrototype product={product} compact className="mx-auto md:mx-0" />
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-white/45">{product.category}</div>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{product.name}</h3>
                    <p className="mt-2 text-sm text-white/55">{product.subtitle}</p>
                      </div>
                      <div className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-accent">
                        Selected
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {product.ingredients.map((ingredient) => (
                        <div key={ingredient} className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/70">
                          {ingredient}
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-base leading-7 text-white/65">{product.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] border border-accent/20 bg-accent/10 p-5 md:rounded-[32px] md:p-6">
            <div className="text-xs uppercase tracking-[0.24em] text-accent">Next Step</div>
            <h3 className="mt-3 text-3xl font-semibold text-white">Get your routine first.</h3>
            <p className="mt-4 text-base leading-7 text-white/70">
              Bare-X is collecting early demand before launch. Join the waitlist to secure first access when these routines go live.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/waitlist">Join Early Access</Button>
              <Link href="/quiz" className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm uppercase tracking-[0.16em] text-white/70 transition hover:bg-white/[0.06] hover:text-white">
                Retake Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
