"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

export function FounderStory() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob absolute -left-20 bottom-[10%] h-[280px] w-[280px] bg-warm opacity-40" />
      </div>

      <Container className="relative">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl rounded-3xl border border-foreground/6 bg-white p-7 shadow-[0_4px_24px_rgba(26,26,46,0.04)] md:p-10"
        >
          <div className="text-[10px] uppercase tracking-[0.25em] text-accent">The Story</div>

          <h2 className="mt-4 font-display text-2xl font-bold tracking-[-0.03em] text-foreground sm:text-3xl">
            &ldquo;I was tired of guessing.&rdquo;
          </h2>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/50">
            <p>
              I spent years buying skincare that didn&apos;t work. Random face washes, moisturizers that made my skin worse, sunscreens that left white cast. Every product was a gamble.
            </p>
            <p>
              When I finally saw a dermatologist, they told me something simple: &ldquo;You&apos;re using the wrong products for your skin type.&rdquo; My oily, acne-prone skin needed specific actives at specific concentrations — not what the ads were selling.
            </p>
            <p>
              That&apos;s when I realized: most people — especially guys — don&apos;t know the first thing about their skin. They don&apos;t need more choices. They need <strong>one right system</strong>.
            </p>
            <p>
              Bare-X is that system. We analyze your skin in 30 seconds and match you with a cleanser + moisturizer + SPF combination that actually makes sense for <em>your</em> specific profile.
            </p>
            <p className="text-foreground/70">
              No guessing. No trial-and-error. Just science.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-4 border-t border-foreground/6 pt-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground font-display text-lg font-bold text-white">
              B
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Bare-X Team</div>
              <div className="text-[12px] text-foreground/35">Founded on frustration. Built on science.</div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
