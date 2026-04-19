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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-2xl"
      >
        <Container className="flex h-14 items-center justify-between gap-4">
          <MagneticButton strength={0.15}>
            <Link
              href="/"
              className="font-display text-xl font-bold tracking-[0.22em] text-white transition-all duration-300 hover:text-accent md:text-2xl"
            >
              BARE-X
            </Link>
          </MagneticButton>

          <nav className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
            {navLinks.map((link) => (
              <MagneticButton key={link.label} strength={0.2}>
                <Link
                  href={link.href}
                  className="animated-underline py-1 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </MagneticButton>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <MagneticButton strength={0.15}>
              <Button href="/quiz" className="cta-glow px-4 py-2.5 text-[11px] sm:px-5 sm:text-xs">
                Analyze My Skin
              </Button>
            </MagneticButton>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-overlay fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-3xl font-bold tracking-[0.1em] text-white transition hover:text-accent"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Button href="/quiz" onClick={() => setMenuOpen(false)} className="mt-4 px-8 py-4 text-sm">
                Analyze My Skin
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
