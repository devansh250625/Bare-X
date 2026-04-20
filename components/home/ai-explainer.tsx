"use client";

import { motion } from "framer-motion";
import { Scan, Brain, Package } from "lucide-react";
import { Container } from "@/components/ui/container";

const steps = [
  {
    icon: Scan,
    number: "01",
    title: "Input",
    subtitle: "8 questions about your skin",
    details: ["Skin type & concerns", "Oil levels & hydration", "Lifestyle & current routine"],
    accent: "#3A86FF"
  },
  {
    icon: Brain,
    number: "02",
    title: "Analysis",
    subtitle: "AI maps your skin profile",
    details: ["Score acne risk, oil, hydration, sensitivity", "Calculate skin age & routine quality", "Identify root causes, not just symptoms"],
    accent: "#7C5CFC"
  },
  {
    icon: Package,
    number: "03",
    title: "System Match",
    subtitle: "Your exact skincare system",
    details: ["Assign 1 of 3 precision systems", "Personalize ingredient reasons", "Generate your complete routine"],
    accent: "#5CB888"
  }
];

export function AiExplainer() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob absolute -right-16 top-[20%] h-[300px] w-[300px] bg-sage opacity-30" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.35em] text-accent">
            Under the Hood
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl">
            How Our AI Works
          </motion.h2>
        </div>

        <div className="relative mt-14">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-20 hidden h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent lg:block" />

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-3xl border border-foreground/6 bg-white p-6 shadow-[0_4px_24px_rgba(26,26,46,0.04)] transition-shadow duration-500 hover:shadow-[0_8px_40px_rgba(26,26,46,0.08)]"
              >
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.12, type: "spring" }}
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: step.accent + "12" }}
                >
                  <step.icon className="h-5 w-5" style={{ color: step.accent }} />
                </motion.div>

                <div className="text-[10px] tracking-[0.3em]" style={{ color: step.accent + "80" }}>{step.number}</div>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm text-foreground/40">{step.subtitle}</p>

                <ul className="mt-4 space-y-2">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-[12px] leading-relaxed text-foreground/45">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: step.accent }} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
