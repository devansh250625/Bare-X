"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScrollProvider() {
  useEffect(() => {
    const shouldUseNativeScroll =
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldUseNativeScroll) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
      touchMultiplier: 1
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
