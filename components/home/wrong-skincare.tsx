"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.span ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      className="tabular-nums"
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}{suffix}
        </motion.span>
      ) : "0" + suffix}
    </motion.span>
  );
}

const stats = [
  { value: 90, suffix: "%", label: "use products wrong for their skin type" },
  { value: 73, suffix: "%", label: "have never had a skin analysis" },
  { value: 4, suffix: "x", label: "more effective when matched to your profile" }
];

const mistakes = [
  { wrong: "Using harsh cleansers", right: "pH-balanced, type-specific formulas", icon: "✕" },
  { wrong: "Skipping moisturizer for oily skin", right: "Oil-free hydration prevents rebound oil", icon: "✕" },
  { wrong: "Random product stacking", right: "Ingredient-conflict-free systems", icon: "✕" },
  { wrong: "Ignoring SPF daily", right: "SPF 50 as non-negotiable last step", icon: "✕" }
];

export function WrongSkincare() {
  return (
    <section className="section-dark relative py-20 md:py-28">
      <div className="absolute -top-1 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.35em] text-accent">
            The Reality
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
            90% of people use the wrong skincare.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.18 }}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/45">
            Generic products aren&apos;t built for you. Wrong ingredients can make your skin worse — not better.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="rounded-2xl border border-white/8 bg-white/[0.04] p-5 text-center"
            >
              <div className="font-display text-4xl font-bold text-accent">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/45">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mistakes table */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/8 bg-white/[0.03] p-5 md:p-7"
        >
          <h3 className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/35">Common mistakes vs. Bare-X approach</h3>
          <div className="space-y-4">
            {mistakes.map((item, i) => (
              <motion.div key={item.wrong}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.06 }}
                className="grid gap-3 sm:grid-cols-2"
              >
                <div className="flex items-start gap-2.5 rounded-xl bg-red-500/8 p-3">
                  <span className="mt-0.5 text-xs font-bold text-red-400">{item.icon}</span>
                  <span className="text-sm text-white/55">{item.wrong}</span>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl bg-accent/8 p-3">
                  <span className="mt-0.5 text-xs font-bold text-accent">✓</span>
                  <span className="text-sm text-white/55">{item.right}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
