"use client";

import { create } from "zustand";
import { AnalysisPayload, QuizAnswers } from "@/lib/types";
import { defaultAnswers } from "@/lib/constants";

type QuizStore = {
  answers: QuizAnswers;
  result: AnalysisPayload | null;
  setAnswers: (answers: QuizAnswers) => void;
  updateAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  setResult: (result: AnalysisPayload) => void;
  reset: () => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  answers: defaultAnswers,
  result: null,
  setAnswers: (answers) => set({ answers }),
  updateAnswer: (key, value) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [key]: value
      }
    })),
  setResult: (result) => set({ result }),
  reset: () => set({ answers: defaultAnswers, result: null })
}));
