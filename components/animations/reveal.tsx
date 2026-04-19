"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealVariant = "slide-up" | "slide-left" | "slide-right" | "scale" | "blur";

const variantConfig: Record<RevealVariant, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  "slide-up": {
    from: { y: 48, opacity: 0, filter: "blur(6px)" },
    to: { y: 0, opacity: 1, filter: "blur(0px)" }
  },
  "slide-left": {
    from: { x: 60, opacity: 0, filter: "blur(4px)" },
    to: { x: 0, opacity: 1, filter: "blur(0px)" }
  },
  "slide-right": {
    from: { x: -60, opacity: 0, filter: "blur(4px)" },
    to: { x: 0, opacity: 1, filter: "blur(0px)" }
  },
  scale: {
    from: { scale: 0.88, opacity: 0, filter: "blur(8px)" },
    to: { scale: 1, opacity: 1, filter: "blur(0px)" }
  },
  blur: {
    from: { opacity: 0, filter: "blur(18px)" },
    to: { opacity: 1, filter: "blur(0px)" }
  }
};

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "slide-up"
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const config = variantConfig[variant];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        config.from,
        {
          ...config.to,
          duration: 1.1,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%"
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, variant]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
