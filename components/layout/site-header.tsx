"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const navLinks = [
  { label: "Products", href: "/#explore-products" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Early Access", href: "/waitlist" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 z-50 w-full"
      >
        <div className="mx-auto max-w-7xl px-5 pt-4 sm:px-6">
          <div className="glass-light flex h-14 items-center justify-between gap-4 rounded-2xl px-5 shadow-[0_2px_20px_rgba(26,26,46,0.06)]">
            <MagneticButton strength={0.15}>
              <Link
                href="/"
                className="font-display text-lg font-bold tracking-[0.2em] text-foreground transition-colors hover:text-accent sm:text-xl"
              >
                BARE-X
              </Link>
            </MagneticButton>

            <nav className="hidden items-center gap-7 text-[13px] text-foreground/55 lg:flex">
              {navLinks.map((link) => (
                <MagneticButton key={link.label} strength={0.2}>
                  <Link
                    href={link.href}
                    className="animated-underline py-1 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </MagneticButton>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <MagneticButton strength={0.15}>
                <Button href="/quiz" className="hidden px-5 py-2.5 text-[11px] sm:inline-flex">
                  Analyze My Skin
                </Button>
              </MagneticButton>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground/60 transition hover:bg-foreground/5 lg:hidden"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-menu-overlay fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 lg:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, delay: index * 0.07 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl font-bold tracking-[0.08em] text-foreground transition hover:text-accent"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, delay: 0.25 }}
            >
              <Button href="/quiz" onClick={() => setMenuOpen(false)} className="mt-3 px-8 py-3.5">
                Analyze My Skin
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
