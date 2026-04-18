"use client";

import { motion } from "framer-motion";

const metrics = [
  ["Acne Risk", "High", "78%"],
  ["Oil Control", "Priority", "72%"],
  ["Hydration", "Needs support", "42%"],
  ["Sensitivity", "Moderate", "56%"]
];

const routine = [
  "BHA + Niacinamide cleanser",
  "Oil-free ceramide moisturizer",
  "Broad-spectrum SPF 50"
];

export function HeroBlueprintCard() {
  return (
    <div
      data-parallax="hero-stage"
      className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-glow backdrop-blur-xl sm:p-6"
    >
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent/10 to-transparent" />
      <div className="relative space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">Skin Blueprint</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-white">
              Your routine logic, before products.
            </h2>
          </div>
          <div className="rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-accent">
            30 sec
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {metrics.map(([label, value, width], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 + index * 0.08 }}
              className="rounded-[24px] border border-white/10 bg-black/30 p-4"
            >
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-white/55">{label}</span>
                <span className="font-medium text-white">{value}</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width }}
                  transition={{ duration: 0.9, delay: 0.25 + index * 0.08 }}
                  className="h-full rounded-full bg-gradient-to-r from-accent to-white"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="rounded-[28px] border border-accent/20 bg-accent/10 p-5">
          <div className="text-xs uppercase tracking-[0.28em] text-accent">Suggested Formula Direction</div>
          <div className="mt-4 space-y-3">
            {routine.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 text-sm text-white/78"
              >
                <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(58,134,255,0.8)]" />
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
