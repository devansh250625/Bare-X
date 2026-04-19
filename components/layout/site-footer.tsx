"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const footerGroups = [
  {
    title: "Platform",
    links: [
      { label: "Skin Quiz", href: "/quiz" },
      { label: "Products", href: "/#explore-products" },
      { label: "How It Works", href: "/#how-it-works" }
    ]
  },
  {
    title: "Launch",
    links: [
      { label: "Early Access", href: "/waitlist" },
      { label: "Results", href: "/result" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="relative z-[2] overflow-hidden border-t border-white/5 bg-[#030305] py-12 sm:py-16">
      {/* Top gradient line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-[24px] p-6 sm:p-8 lg:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            {/* Brand section */}
            <div className="space-y-6">
              <Link href="/" className="font-display text-2xl font-bold tracking-[0.26em] text-white">
                BARE-X
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-white/45">
                Formula-first skincare intelligence. Understand your skin before products ever ship.
              </p>

              <div className="flex gap-3">
                <Button href="/quiz" className="cta-glow px-5 py-3 text-[11px]">
                  Analyze Skin
                </Button>
                <Button href="/waitlist" variant="ghost" className="px-5 py-3 text-[11px]">
                  Early Access
                </Button>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30">
                    {group.title}
                  </h3>
                  <div className="mt-4 grid gap-3 text-sm text-white/50">
                    {group.links.map((link) => (
                      <Link
                        key={`${group.title}-${link.label}`}
                        href={link.href}
                        className="animated-underline w-fit transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col gap-3 text-[10px] uppercase tracking-[0.2em] text-white/25 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Bare-X. All rights reserved.</p>
          <p>AI-powered skincare intelligence platform.</p>
        </div>
      </Container>
    </footer>
  );
}
