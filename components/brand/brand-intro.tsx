"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function BrandIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => setVisible(false),
      prefersReducedMotion ? 200 : 800
    );
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] grid place-items-center overflow-hidden bg-[#020204]"
        >
          {/* Background particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0
              }}
              animate={{
                opacity: [0, 0.6, 0],
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 0.7,
                delay: 0.1 + Math.random() * 0.3,
                ease: "easeOut"
              }}
              className="absolute h-1 w-1 rounded-full bg-accent shadow-[0_0_12px_rgba(58,134,255,0.8)]"
              style={{
                left: "50%",
                top: "50%"
              }}
            />
          ))}

          {/* Horizontal glow line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute h-px w-[80vw] origin-left bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_40px_rgba(58,134,255,0.9)]"
          />

          {/* Brand name */}
          <motion.div
            initial={{
              opacity: 0,
              letterSpacing: "0.8em",
              y: 16,
              filter: "blur(14px)",
              scale: 0.85
            }}
            animate={{
              opacity: 1,
              letterSpacing: "0.28em",
              y: 0,
              filter: "blur(0px)",
              scale: 1
            }}
            exit={{
              opacity: 0,
              letterSpacing: "0.5em",
              scale: 1.08,
              filter: "blur(12px)"
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-display text-5xl font-bold uppercase text-white sm:text-7xl md:text-8xl"
          >
            Bare-X
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute bottom-16 text-[10px] uppercase tracking-[0.5em] text-white/35"
          >
            Skin Intelligence
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
