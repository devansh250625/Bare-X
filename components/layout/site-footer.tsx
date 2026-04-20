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
    <footer className="relative border-t border-foreground/6 bg-white py-12 sm:py-16">
      <Container>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-5">
              <Link href="/" className="font-display text-xl font-bold tracking-[0.22em] text-foreground">
                BARE-X
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-foreground/40">
                Formula-first skincare intelligence. Understand your skin before products ever ship.
              </p>
              <div className="flex gap-3">
                <Button href="/quiz" className="px-5 py-2.5 text-[11px]">Analyze Skin</Button>
                <Button href="/waitlist" variant="ghost" className="px-5 py-2.5 text-[11px]">Early Access</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {footerGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/30">
                    {group.title}
                  </h3>
                  <div className="mt-4 grid gap-2.5 text-sm text-foreground/45">
                    {group.links.map((link) => (
                      <Link key={`${group.title}-${link.label}`} href={link.href}
                        className="animated-underline w-fit transition hover:text-foreground">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col gap-2 border-t border-foreground/6 pt-6 text-[10px] uppercase tracking-[0.18em] text-foreground/20 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Bare-X. All rights reserved.</p>
          <p>AI-powered skincare intelligence.</p>
        </div>
      </Container>
    </footer>
  );
}
