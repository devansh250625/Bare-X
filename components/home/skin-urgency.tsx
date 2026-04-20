"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const timeline = [
  { year: "Now", title: "Invisible Damage", desc: "UV exposure, pollution, and oil buildup silently degrade your skin barrier every day.", severity: 1 },
  { year: "6 months", title: "Visible Signs", desc: "Persistent acne, dullness, enlarged pores, and uneven texture start becoming noticeable.", severity: 2 },
  { year: "1-2 years", title: "Accelerated Aging", desc: "Premature fine lines, dark spots, and chronic sensitivity that's harder to reverse.", severity: 3 },
  { year: "5+ years", title: "Permanent Changes", desc: "Deep scarring, pigmentation damage, and structural skin changes that require clinical intervention.", severity: 4 }
];

export function SkinUrgency() {
  return (
    <section className="section-dark relative py-20 md:py-28">
      <div className="absolute -top-1 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent" />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.35em] text-red-400/70">
            Don&apos;t Ignore This
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
            What happens if you ignore your skin
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-14 max-w-2xl">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-accent via-red-400/50 to-red-500/80 md:left-1/2" />

          {timeline.map((item, i) => (
            <motion.div key={item.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative mb-8 pl-16 md:pl-0"
            >
              {/* Dot */}
              <div className="absolute left-4 top-1 h-4 w-4 rounded-full border-2 md:left-[calc(50%-8px)]"
                style={{
                  borderColor: item.severity <= 2 ? "#3A86FF" : "#EF4444",
                  backgroundColor: item.severity <= 2 ? "#3A86FF20" : "#EF444420"
                }}
              />

              <div className={`rounded-2xl border border-white/8 bg-white/[0.04] p-4 md:max-w-[45%] ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                <div className="text-[10px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: item.severity <= 2 ? "#3A86FF" : "#EF4444" }}>
                  {item.year}
                </div>
                <h3 className="mt-1 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <Button href="/quiz" variant="dark" className="group gap-2">
            Check Your Skin Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </Container>

      <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
