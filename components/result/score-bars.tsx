"use client";

import { motion } from "framer-motion";
import { SkinScore } from "@/lib/types";

const labels: Array<[keyof SkinScore, string]> = [
  ["acneRisk", "Acne Risk"],
  ["oilLevel", "Oil Level"],
  ["hydration", "Hydration"],
  ["sensitivity", "Sensitivity"]
];

export function ScoreBars({ score }: { score: SkinScore }) {
  return (
    <div className="space-y-5">
      {labels.map(([key, label], index) => {
        const value = score[key];
        return (
          <div key={key}>
            <div className="mb-2 flex items-center justify-between text-sm text-white/60">
              <span>{label}</span>
              <span>{value}/10</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value * 10}%` }}
                transition={{ duration: 0.9, delay: index * 0.08, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-accent to-white"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
