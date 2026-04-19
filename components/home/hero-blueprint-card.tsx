"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/animated-counter";

const metrics = [
  { label: "Acne Risk", value: "High", percent: 78 },
  { label: "Oil Control", value: "Priority", percent: 72 },
  { label: "Hydration", value: "Low", percent: 42 },
  { label: "Sensitivity", value: "Moderate", percent: 56 }
];

const routine = [
  "BHA + Niacinamide cleanser",
  "Oil-free ceramide moisturizer",
  "Broad-spectrum SPF 50"
];

export function HeroBlueprintCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 30
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="gradient-border shimmer relative w-full overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-5 shadow-glow-lg sm:p-7"
    >
      {/* Ambient glow effects */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-white/8 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-accent/8 to-transparent" />

      <div className="relative space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="text-[10px] uppercase tracking-[0.3em] text-white/40"
            >
              Skin Blueprint
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.5 }}
              className="mt-2 font-display text-xl font-bold tracking-[-0.04em] text-white sm:text-2xl"
            >
              Your routine logic
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
            className="glow-pulse rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[10px] text-accent"
          >
            30 sec
          </motion.div>
        </div>

        {/* Metric bars */}
        <div className="grid gap-2.5 sm:grid-cols-2">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.08 }}
              className="rounded-[18px] border border-white/8 bg-black/30 p-3.5"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-white/50">{metric.label}</span>
                <span className="font-medium text-white">
                  <AnimatedCounter value={metric.percent} suffix="%" />
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.percent}%` }}
                  transition={{ duration: 0.7, delay: 1.4 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-accent to-white/80"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Suggested routine */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="rounded-[20px] border border-accent/15 bg-accent/8 p-4"
        >
          <div className="text-[10px] uppercase tracking-[0.28em] text-accent">Suggested Formula</div>
          <div className="mt-3 space-y-2.5">
            {routine.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.55 + index * 0.08 }}
                className="flex items-center gap-3 text-sm text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(58,134,255,0.8)]" />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
