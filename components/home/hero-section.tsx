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
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.95]);

  return (
    <section className="motion-section relative min-h-svh overflow-hidden pt-24 md:pt-0">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute left-[5%] top-[15%] h-[400px] w-[400px] rounded-full bg-accent/8 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.8, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute right-[5%] top-[20%] h-[350px] w-[350px] rounded-full bg-indigo-500/6 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -20, 40, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] left-[40%] h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px]"
        />
      </div>

      {/* Grid background */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-grid-fade bg-[size:60px_60px] opacity-15 [mask-image:linear-gradient(to_bottom,white_30%,transparent)]" />

      <motion.div style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}>
        <Container className="relative grid min-h-svh items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Left content */}
          <div className="flex flex-col items-center space-y-8 text-center lg:items-start lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glass inline-flex rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] text-white/70"
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_rgba(58,134,255,0.8)]" />
              AI-Powered Skin Intelligence
            </motion.div>

            {/* Headline with split text animation */}
            <TextSplitReveal
              as="h1"
              delay={0.9}
              animateOnLoad
              className="text-sheen font-display text-[2.5rem] font-bold leading-[1.05] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Stop Guessing Your Skincare
            </TextSplitReveal>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="max-w-lg text-base leading-relaxed text-white/55 sm:text-lg"
            >
              Analyze your skin in 30 seconds. Get a precision routine built around your exact profile.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.35 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <MagneticButton strength={0.15}>
                <Button href="/quiz" className="cta-glow group gap-2 px-7 py-4 text-sm">
                  Analyze My Skin
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.15}>
                <Button href="/waitlist" variant="ghost" className="px-7 py-4 text-sm">
                  Join Early Access
                </Button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right - Blueprint card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl justify-self-end"
          >
            <HeroBlueprintCard />
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="scroll-indicator flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          <ChevronDown className="h-4 w-4 text-white/30" />
        </div>
      </motion.div>
    </section>
  );
}
