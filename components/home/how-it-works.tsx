"use client";

import { motion } from "framer-motion";
import { ArrowRight, Scan, BarChart3, Sparkles } from "lucide-react";
import { TextSplitReveal } from "@/components/animations/text-split-reveal";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const steps = [
  {
    icon: Scan,
    number: "01",
    title: "Take the skin quiz",
    description: "Answer 8 quick questions about your skin."
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Get your Skin Score",
    description: "AI maps your profile across 4 key metrics."
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Unlock your routine",
    description: "Receive a personalized formula direction."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-32 z-[2]">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.35em] text-accent"
          >
            How It Works
          </motion.div>

          <TextSplitReveal
            as="h2"
            delay={0.1}
            className="mt-5 font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl"
          >
            Three steps to clarity
          </TextSplitReveal>
        </div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connecting line — desktop */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/20 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group relative"
              >
                <div className="glass relative overflow-hidden rounded-[24px] p-7 transition-all duration-500 hover:border-accent/20 hover:bg-white/[0.06]">
                  {/* Shimmer on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
                  </div>

                  {/* Step number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + index * 0.15,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10"
                  >
                    <step.icon className="h-6 w-6 text-accent" />
                  </motion.div>

                  {/* Number badge */}
                  <div className="text-[10px] tracking-[0.4em] text-accent/60">{step.number}</div>

                  <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <MagneticButton strength={0.15}>
            <Button href="/quiz" className="cta-glow group gap-2 px-7 py-4">
              Start Analysis
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </MagneticButton>
        </motion.div>
      </Container>
    </section>
  );
}
