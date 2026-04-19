"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const highlights = [
  { icon: Zap, text: "30-second skin analysis" },
  { icon: Shield, text: "No inventory pressure" },
  { icon: Sparkles, text: "6 precision formulas" }
];

export function FinalCta() {
  return (
    <section className="relative py-20 md:py-32 z-[2]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-border relative overflow-hidden rounded-[32px] bg-[radial-gradient(ellipse_at_top,rgba(58,134,255,0.15),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8 md:p-14"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-fade bg-[size:48px_48px] opacity-[0.06]" />
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-[80px]"
          />
          <motion.div
            animate={{
              x: [0, -20, 30, 0],
              y: [0, 30, -20, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-indigo-500/8 blur-[80px]"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[10px] uppercase tracking-[0.3em] text-accent"
            >
              Early Access
            </motion.div>

            {/* Direct h2 instead of TextSplitReveal for reliable rendering */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-sheen mt-6 font-display text-3xl font-bold tracking-[-0.04em] sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Ready to know your skin?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base"
            >
              Be first in line when Bare-X launches. Your personalized routine is waiting.
            </motion.p>

            {/* Highlight badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.5 }}
                  className="glass flex items-center gap-2.5 rounded-full px-4 py-2.5"
                >
                  <item.icon className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs text-white/60">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
            >
              <MagneticButton strength={0.15}>
                <Button href="/quiz" className="cta-glow glow-pulse group gap-2 px-8 py-4 text-sm">
                  Analyze My Skin
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.15}>
                <Button href="/waitlist" variant="ghost" className="px-8 py-4 text-sm">
                  Join Early Access
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-[11px] uppercase tracking-[0.2em] text-white/25"
            >
              No payment required · Free skin analysis · Cancel anytime
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
