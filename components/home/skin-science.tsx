"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const ingredients = [
  { name: "Salicylic Acid", formula: "C₈H₈O₃", role: "Dissolves dead skin inside pores, prevents acne at the source", dotColor: "#3A86FF" },
  { name: "Niacinamide", formula: "C₆H₆N₂O", role: "Controls oil, reduces inflammation, strengthens skin barrier", dotColor: "#7C5CFC" },
  { name: "Hyaluronic Acid", formula: "C₁₄H₂₁NO₁₁", role: "Holds 1000× its weight in water, hydrates without oil", dotColor: "#5CB888" },
  { name: "Ceramides", formula: "Lipid Molecules", role: "Rebuilds the skin's protective moisture barrier", dotColor: "#E88C6A" }
];

export function SkinScience() {
  return (
    <section className="section-dark relative py-20 md:py-28">
      <div className="absolute -top-1 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.35em] text-accent">
            The Science
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
            Built on Skin Science
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.18 }}
            className="mx-auto mt-4 max-w-lg text-base text-white/45">
            Every ingredient is selected for a specific clinical function — not marketing trends.
          </motion.p>
        </div>

        {/* Acne formation visual */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border border-white/8 bg-white/[0.03] p-6 md:p-8"
        >
          <h3 className="mb-4 text-center text-[10px] uppercase tracking-[0.2em] text-white/35">How acne forms → How we stop it</h3>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { step: "1", title: "Excess Oil", desc: "Sebaceous glands overproduce sebum", color: "#E88C6A" },
              { step: "2", title: "Clogged Pore", desc: "Dead skin + oil block the follicle", color: "#D4A853" },
              { step: "3", title: "Bacteria", desc: "P. acnes bacteria multiply in the plug", color: "#E85C5C" },
              { step: "4", title: "Inflammation", desc: "Immune response → redness + swelling", color: "#E85C5C" }
            ].map((item, i) => (
              <motion.div key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: item.color + "20" }}>
                  <span className="text-sm font-bold" style={{ color: item.color }}>{item.step}</span>
                </div>
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-white/40">{item.desc}</p>
                {i < 3 && <div className="mx-auto mt-3 hidden h-px w-12 bg-white/10 sm:block" />}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ingredient molecules */}
        <div className="mx-auto mt-10 max-w-3xl">
          <h3 className="mb-6 text-center text-[10px] uppercase tracking-[0.2em] text-white/35">Core active ingredients</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {ingredients.map((ing, i) => (
              <motion.div key={ing.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: ing.dotColor + "15" }}>
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: ing.dotColor }} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{ing.name}</h4>
                  <p className="text-[10px] font-mono text-white/25">{ing.formula}</p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">{ing.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
