"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function BrandIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] grid place-items-center overflow-hidden bg-[#030303]"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute h-px w-[82vw] origin-left bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_38px_rgba(58,134,255,0.9)]"
          />
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.8em", y: 24, filter: "blur(18px)" }}
            animate={{ opacity: 1, letterSpacing: "0.28em", y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, letterSpacing: "0.55em", scale: 1.08, filter: "blur(14px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-display text-5xl font-bold uppercase text-white sm:text-7xl md:text-8xl"
          >
            Bare-X
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="absolute bottom-16 text-xs uppercase tracking-[0.45em] text-white/45"
          >
            Skin intelligence initializing
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
