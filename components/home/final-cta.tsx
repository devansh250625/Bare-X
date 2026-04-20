"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const highlights = [
  { icon: Zap, text: "30-second analysis" },
  { icon: Shield, text: "No payment required" },
  { icon: Sparkles, text: "6 precision formulas" }
];

export function FinalCta() {
  return (
    <section className="relative py-20 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-foreground/6 bg-white p-8 shadow-[0_8px_48px_rgba(26,26,46,0.06)] md:p-14"
        >
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent-soft opacity-60 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blush opacity-50 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-[10px] uppercase tracking-[0.3em] text-accent">
              Early Access
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.7 }}
              className="mt-5 font-display text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl">
              Ready to know your skin?
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.25 }}
              className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/45 sm:text-base">
              Be first in line when Bare-X launches. Your personalized routine is waiting.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.35 }}
              className="mt-7 flex flex-wrap justify-center gap-2.5">
              {highlights.map((item) => (
                <div key={item.text} className="flex items-center gap-2 rounded-full border border-foreground/8 bg-background px-4 py-2">
                  <item.icon className="h-3.5 w-3.5 text-accent" />
                  <span className="text-[11px] text-foreground/50">{item.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.45 }}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <MagneticButton strength={0.15}>
                <Button href="/quiz" className="group gap-2 px-8 py-3.5 text-[12px]">
                  Analyze My Skin
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.15}>
                <Button href="/waitlist" variant="ghost" className="px-8 py-3.5 text-[12px]">
                  Join Early Access
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.55 }}
              className="mt-7 text-[11px] text-foreground/25">
              Free skin analysis · No credit card · Coupon on signup
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
