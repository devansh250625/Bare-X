"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { quizQuestions } from "@/lib/constants";
import { QuizAnswers } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quiz-store";

function isAnswered(question: (typeof quizQuestions)[number], answers: QuizAnswers) {
  const value = answers[question.key as keyof QuizAnswers];
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value);
}

export function QuizShell() {
  const router = useRouter();
  const { answers, updateAnswer, setResult, reset } = useQuizStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const question = quizQuestions[step];
  const progress = useMemo(() => ((step + 1) / quizQuestions.length) * 100, [step]);

  useEffect(() => { reset(); }, [reset]);

  function toggleOption(option: string) {
    const key = question.key as keyof QuizAnswers;
    const current = answers[key];
    if (!Array.isArray(current)) return;
    const exists = current.includes(option as never);
    const next = exists ? current.filter((item) => item !== option) : [...current, option];
    updateAnswer(key, next as QuizAnswers[keyof QuizAnswers]);
  }

  function handleSingleValue(option: string) {
    updateAnswer(question.key as keyof QuizAnswers, option as QuizAnswers[keyof QuizAnswers]);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to analyze skin right now.");
      setResult(data);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("barex-result", JSON.stringify(data));
      }
      router.push("/result");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to analyze skin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-foreground/6 bg-white p-5 shadow-[0_4px_24px_rgba(26,26,46,0.04)] md:p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-foreground/35">
          <span>{question.step}</span>
          <span>{step + 1}/{quizQuestions.length}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-foreground/[0.06]">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          <motion.div key={question.key}
            initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.24em] text-accent">Skin Intelligence Quiz</p>
              <h2 className="font-display text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-3xl">
                {question.prompt}
              </h2>
            </div>

            <div className="grid gap-2.5">
              {question.options.map((option) => {
                const selected =
                  question.type === "multi"
                    ? (answers[question.key as keyof QuizAnswers] as string[]).includes(option)
                    : answers[question.key as keyof QuizAnswers] === option;

                return (
                  <button key={option} type="button"
                    onClick={() => question.type === "multi" ? toggleOption(option) : handleSingleValue(option)}
                    className={`rounded-2xl border px-5 py-3.5 text-left text-sm transition-all duration-300 ${
                      selected
                        ? "border-accent/40 bg-accent-soft text-foreground shadow-[0_0_0_1px_rgba(58,134,255,0.15)]"
                        : "border-foreground/8 bg-background text-foreground/60 hover:border-foreground/15 hover:bg-foreground/[0.02]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {error ? <p className="mt-5 text-sm text-red-500/70">{error}</p> : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="button" variant="ghost" className="gap-2 sm:min-w-[120px]"
            onClick={() => setStep((c) => Math.max(c - 1, 0))} disabled={step === 0}>
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>

          {step < quizQuestions.length - 1 ? (
            <Button type="button" className="gap-2 sm:min-w-[180px]"
              onClick={() => setStep((c) => Math.min(c + 1, quizQuestions.length - 1))}
              disabled={!isAnswered(question, answers)}>
              Continue <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="gap-2 sm:min-w-[210px]"
              disabled={loading || !isAnswered(question, answers)}>
              {loading ? "Analyzing..." : "Reveal My Routine"} <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
