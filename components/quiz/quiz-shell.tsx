"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { quizQuestions } from "@/lib/constants";
import { QuizAnswers } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/store/quiz-store";

function isAnswered(question: (typeof quizQuestions)[number], answers: QuizAnswers) {
  const value = answers[question.key as keyof QuizAnswers];

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return Boolean(value);
}

export function QuizShell() {
  const router = useRouter();
  const { answers, updateAnswer, setResult } = useQuizStore();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const question = quizQuestions[step];
  const progress = useMemo(() => ((step + 1) / quizQuestions.length) * 100, [step]);

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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(answers)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to analyze skin right now.");
      }

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
    <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-5 shadow-glow md:p-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/45">
          <span>{question.step}</span>
          <span>
            {step + 1}/{quizQuestions.length}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-accent to-white"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          <motion.div
            key={question.key}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-accent">Skin Intelligence Quiz</p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">
                {question.prompt}
              </h2>
            </div>

            <div className="grid gap-3">
              {question.options.map((option) => {
                const selected =
                  question.type === "multi"
                    ? (answers[question.key as keyof QuizAnswers] as string[]).includes(option)
                    : answers[question.key as keyof QuizAnswers] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      question.type === "multi" ? toggleOption(option) : handleSingleValue(option)
                    }
                    className={`rounded-[24px] border px-5 py-4 text-left transition duration-300 ${
                      selected
                        ? "border-accent bg-accent/10 text-white shadow-glow"
                        : "border-white/10 bg-black/35 text-white/70 hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {error ? <p className="mt-6 text-sm text-red-400">{error}</p> : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            className="gap-2"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          {step < quizQuestions.length - 1 ? (
            <Button
              type="button"
              className="gap-2"
              onClick={() => setStep((current) => Math.min(current + 1, quizQuestions.length - 1))}
              disabled={!isAnswered(question, answers)}
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="gap-2" disabled={loading || !isAnswered(question, answers)}>
              {loading ? "Analyzing..." : "Reveal My Routine"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
