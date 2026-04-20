"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { TextSplitReveal } from "@/components/animations/text-split-reveal";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { HeroBlueprintCard } from "@/components/home/hero-blueprint-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function HeroSection() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 60]);

  return (
    <section className="relative min-h-svh overflow-hidden pt-28 sm:pt-32 md:pt-0">
      {/* Soft organic background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 20, -10, 0], y: [0, -30, 15, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="blob absolute -right-20 top-[10%] h-[500px] w-[500px] bg-accent-soft opacity-60"
        />
        <motion.div
          animate={{ x: [0, -25, 20, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="blob absolute -left-20 bottom-[5%] h-[400px] w-[400px] bg-blush opacity-50"
        />
        <motion.div
          animate={{ x: [0, 15, -20, 0], y: [0, -15, 25, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="blob absolute left-[30%] top-[5%] h-[350px] w-[350px] bg-lavender opacity-40"
        />
      </div>

      <motion.div style={{ opacity: heroOpacity, y: heroY }}>
        <Container className="relative grid min-h-svh items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left content */}
          <div className="flex flex-col items-center space-y-7 text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/8 bg-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-foreground/55 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              AI-Powered Skin Intelligence
            </motion.div>

            <TextSplitReveal
              as="h1"
              delay={1.0}
              animateOnLoad
              className="font-display text-[2.4rem] font-bold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl lg:text-[4.2rem]"
            >
              Stop Guessing Your Skincare
            </TextSplitReveal>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="max-w-lg text-base leading-relaxed text-foreground/50 sm:text-lg"
            >
              Analyze your skin in 30 seconds. Get a precision routine built around your exact profile.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.45 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <MagneticButton strength={0.15}>
                <Button href="/quiz" className="group gap-2 px-7 py-3.5 text-[12px]">
                  Analyze My Skin
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.15}>
                <Button href="/waitlist" variant="ghost" className="px-7 py-3.5 text-[12px]">
                  Join Early Access
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right - Blueprint card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl justify-self-center lg:justify-self-end"
          >
            <HeroBlueprintCard />
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="scroll-indicator flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/25">Scroll</span>
          <ChevronDown className="h-4 w-4 text-foreground/25" />
        </div>
      </motion.div>
    </section>
  );
}
