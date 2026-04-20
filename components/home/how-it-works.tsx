"use client";

import { motion } from "framer-motion";
import { ArrowRight, Scan, BarChart3, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const steps = [
  { icon: Scan, number: "01", title: "Take the skin quiz", description: "Answer 8 quick questions about your skin type, concerns, and goals." },
  { icon: BarChart3, number: "02", title: "Get your Skin Score", description: "AI maps your profile across acne risk, oil level, hydration, and sensitivity." },
  { icon: Sparkles, number: "03", title: "Unlock your routine", description: "Receive a personalized formula direction built around your exact profile." }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-32">
      {/* Organic background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob absolute -right-32 top-[20%] h-[400px] w-[400px] bg-sage opacity-40" />
        <div className="blob absolute -left-20 bottom-[10%] h-[350px] w-[350px] bg-lavender opacity-35" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.35em] text-accent">
            How It Works
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 font-display text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl"
          >
            Three steps to clarity
          </motion.h2>
        </div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-foreground/10 to-transparent lg:block" />

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div key={step.number}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-3xl border border-foreground/6 bg-white p-7 shadow-[0_4px_24px_rgba(26,26,46,0.04)] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(26,26,46,0.08)]">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.12, type: "spring", stiffness: 200 }}
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft"
                  >
                    <step.icon className="h-6 w-6 text-accent" />
                  </motion.div>

                  <div className="text-[10px] tracking-[0.35em] text-accent/50">{step.number}</div>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/45">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <MagneticButton strength={0.15}>
            <Button href="/quiz" className="group gap-2 px-7 py-3.5">
              Start Analysis
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </MagneticButton>
        </motion.div>
      </Container>
    </section>
  );
}
