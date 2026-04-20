"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const skinFactors = [
  { label: "Genetics", pct: "35%", color: "#3A86FF" },
  { label: "Environment", pct: "25%", color: "#7C5CFC" },
  { label: "Lifestyle", pct: "20%", color: "#E88C6A" },
  { label: "Diet & Stress", pct: "15%", color: "#5CB888" },
  { label: "Products Used", pct: "5%", color: "#D4A853" }
];

export function SkinNotGeneric() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob absolute -left-20 top-[15%] h-[350px] w-[350px] bg-lavender opacity-30" />
        <div className="blob absolute -right-16 bottom-[10%] h-[300px] w-[300px] bg-blush opacity-25" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.35em] text-accent">
              The Problem
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl md:text-[2.8rem]">
              Your skin is not generic.<br />Your skincare shouldn&apos;t be either.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-foreground/50">
              Your skin is shaped by at least 5 unique factors. No two people share the same combination — yet 90% of skincare products treat everyone the same way.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-3 max-w-lg text-base leading-relaxed text-foreground/50">
              Bare-X maps your unique profile across acne risk, oil levels, hydration, and sensitivity — then assigns one of three precision systems built for <em>your</em> exact skin.
            </motion.p>
          </div>

          {/* Right — Skin factor bars */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4 rounded-3xl border border-foreground/6 bg-white p-6 shadow-[0_4px_24px_rgba(26,26,46,0.04)] md:p-8"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/35">What shapes your skin</div>

            {/* Skin cross-section SVG */}
            <div className="relative mx-auto mb-4 h-32 w-full max-w-[280px]">
              <svg viewBox="0 0 280 120" className="h-full w-full" fill="none">
                {/* Epidermis */}
                <path d="M0 30 Q70 20 140 28 Q210 36 280 26 L280 50 Q210 58 140 52 Q70 44 0 52Z" fill="#F8E8E0" stroke="#E8DFD6" strokeWidth="0.5" />
                <text x="14" y="44" fontSize="8" fill="#8E8E9A" fontFamily="sans-serif">Epidermis</text>
                {/* Dermis */}
                <path d="M0 52 Q70 44 140 52 Q210 58 280 50 L280 80 Q210 88 140 82 Q70 76 0 82Z" fill="#EBF2FF" stroke="#D4DEF0" strokeWidth="0.5" />
                <text x="14" y="72" fontSize="8" fill="#8E8E9A" fontFamily="sans-serif">Dermis</text>
                {/* Hypodermis */}
                <path d="M0 82 Q70 76 140 82 Q210 88 280 80 L280 110 Q210 115 140 112 Q70 108 0 112Z" fill="#EEEBF5" stroke="#DDD8EB" strokeWidth="0.5" />
                <text x="14" y="100" fontSize="8" fill="#8E8E9A" fontFamily="sans-serif">Hypodermis</text>
                {/* Pore */}
                <circle cx="140" cy="30" r="3" fill="#3A86FF" opacity="0.7" />
                <line x1="140" y1="33" x2="140" y2="70" stroke="#3A86FF" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                <circle cx="200" cy="28" r="2.5" fill="#3A86FF" opacity="0.5" />
                <line x1="200" y1="30" x2="200" y2="65" stroke="#3A86FF" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
              </svg>
            </div>

            {skinFactors.map((factor, i) => (
              <motion.div key={factor.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
              >
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-foreground/60">{factor.label}</span>
                  <span className="font-medium text-foreground">{factor.pct}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-foreground/[0.05]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: factor.pct }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: factor.color }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
