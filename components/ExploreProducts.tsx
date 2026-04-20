"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { skinSystems, universalSunscreen } from "@/lib/constants";
import { SkinSystem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const systemColors: Record<string, { bg: string; border: string; badge: string; image: string }> = {
  "acne-control": { bg: "bg-blue-50", border: "border-blue-100", badge: "bg-blue-100 text-blue-700", image: "/products/acne-system.png" },
  "oil-balance": { bg: "bg-emerald-50", border: "border-emerald-100", badge: "bg-emerald-100 text-emerald-700", image: "/products/oil-system.png" },
  "hydration":   { bg: "bg-violet-50", border: "border-violet-100", badge: "bg-violet-100 text-violet-700", image: "/products/hydration-system.png" }
};

function SystemCard({ system }: { system: SkinSystem }) {
  const colors = systemColors[system.id] || systemColors["hydration"];

  return (
    <div className={`rounded-3xl border ${colors.border} ${colors.bg} p-6 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(26,26,46,0.08)] md:p-7`}>
      {/* Product mockup image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={colors.image} alt={system.name} className="mx-auto mb-5 h-40 w-full rounded-2xl object-cover" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">{system.name}</h3>
          <p className="mt-1 text-sm text-foreground/45">{system.tagline}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] ${colors.badge}`}>
          {system.id === "acne-control" ? "Most Popular" : system.id === "oil-balance" ? "Balanced" : "Gentle"}
        </span>
      </div>

      <div className="mt-1 text-[11px] text-foreground/35">For: {system.forWhom}</div>

      <div className="mt-5 space-y-3">
        {system.products.map((product) => (
          <div key={product.name} className="rounded-2xl border border-foreground/6 bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-foreground">{product.name}</h4>
              <span className="text-[10px] text-foreground/30">{product.format}</span>
            </div>
            <p className="mt-1 text-[12px] text-foreground/40">{product.subtitle}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.keyIngredients.map((ing) => (
                <span key={ing.name} className="rounded-full border border-foreground/6 bg-background px-2.5 py-1 text-[10px] text-foreground/50">
                  {ing.name}{ing.concentration ? ` ${ing.concentration}` : ""}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExploreProducts() {
  const systems = Object.values(skinSystems);

  return (
    <section id="explore-products" className="relative py-20 md:py-28">
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.35em] text-accent">
            3 Precision Systems
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-foreground sm:text-4xl md:text-5xl">
            Engineered for Your Skin
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.18 }}
            className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-foreground/45">
            Not random products. Complete solutions — each system is a cleanser + moisturizer pair designed to work together.
          </motion.p>
        </div>

        {/* System cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {systems.map((system, i) => (
            <motion.div key={system.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <SystemCard system={system} />
            </motion.div>
          ))}
        </div>

        {/* Universal sunscreen */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl rounded-2xl border border-foreground/6 bg-white p-5 shadow-[0_2px_16px_rgba(26,26,46,0.04)] md:p-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl">☀️</div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{universalSunscreen.name}</h4>
              <p className="mt-0.5 text-sm text-foreground/40">Added to every system. {universalSunscreen.subtitle}</p>
            </div>
            <span className="hidden rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-medium text-amber-700 sm:inline-block">
              Universal
            </span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center"
        >
          <Button href="/quiz" className="group gap-2">
            Find Your System
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

export default ExploreProducts;
