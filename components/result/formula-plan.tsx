"use client";

import { motion } from "framer-motion";
import { FormulaRecommendation } from "@/lib/types";

export function FormulaPlan({ formulas }: { formulas: FormulaRecommendation[] }) {
  return (
    <div className="space-y-5">
      {formulas.map((formula, index) => (
        <motion.div
          key={`${formula.category}-${formula.title}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: index * 0.06 }}
          className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-accent">{formula.category}</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                {formula.title}
              </h3>
            </div>
            <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/60">
              Formula First
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {formula.ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="rounded-full border border-accent/20 bg-accent/10 px-3 py-2 text-sm text-accent"
              >
                {ingredient}
              </span>
            ))}
          </div>
          <div className="mt-5 rounded-[20px] border border-white/10 bg-black/25 p-4">
            <div className="text-xs uppercase tracking-[0.24em] text-white/40">Suggested Range</div>
            <p className="mt-2 text-base leading-7 text-white/78">{formula.concentration}</p>
          </div>
          <p className="mt-5 text-base leading-7 text-white/65">{formula.why}</p>
          <p className="mt-3 text-sm leading-6 text-white/45">{formula.usage}</p>
        </motion.div>
      ))}
    </div>
  );
}
