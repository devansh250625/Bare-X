"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AnimatedCounter } from "@/components/animations/animated-counter";

const metrics = [
  { label: "Acne Risk", percent: 78 },
  { label: "Oil Control", percent: 72 },
  { label: "Hydration", percent: 42 },
  { label: "Sensitivity", percent: 56 }
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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative w-full overflow-hidden rounded-3xl border border-foreground/6 bg-white p-5 shadow-[0_8px_40px_rgba(26,26,46,0.08)] sm:p-7"
    >
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="text-[10px] uppercase tracking-[0.28em] text-foreground/35">
              Skin Blueprint
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }}
              className="mt-2 font-display text-xl font-bold tracking-[-0.03em] text-foreground sm:text-2xl">
              Your routine logic
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, type: "spring" }}
            className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 text-[10px] font-medium text-accent">
            30 sec
          </motion.div>
        </div>

        {/* Metrics */}
        <div className="grid gap-2.5 sm:grid-cols-2">
          {metrics.map((metric, index) => (
            <motion.div key={metric.label}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.3 + index * 0.07 }}
              className="rounded-2xl border border-foreground/6 bg-background p-3.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground/45">{metric.label}</span>
                <span className="font-medium text-foreground">
                  <AnimatedCounter value={metric.percent} suffix="%" />
                </span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-foreground/6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.percent}%` }}
                  transition={{ duration: 0.7, delay: 1.5 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent/60"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Routine */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="rounded-2xl border border-accent/12 bg-accent-soft p-4"
        >
          <div className="text-[10px] uppercase tracking-[0.25em] text-accent">Suggested Formula</div>
          <div className="mt-3 space-y-2.5">
            {routine.map((item, index) => (
              <motion.div key={item}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 1.65 + index * 0.07 }}
                className="flex items-center gap-3 text-sm text-foreground/65"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
