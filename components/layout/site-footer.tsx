import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const footerGroups = [
  {
    title: "Platform",
    links: [
      { label: "Skin quiz", href: "/quiz" },
      { label: "Formula logic", href: "/#problem" },
      { label: "Product preview", href: "/#explore-products" },
      { label: "Results", href: "/#social-proof" }
    ]
  },
  {
    title: "Routine",
    links: [
      { label: "Face wash", href: "/#explore-products" },
      { label: "Moisturizer", href: "/#explore-products" },
      { label: "Sunscreen", href: "/#explore-products" },
      { label: "Body care", href: "/#explore-products" }
    ]
  },
  {
    title: "Launch",
    links: [
      { label: "Early access", href: "/waitlist" },
      { label: "Sample priority", href: "/waitlist" },
      { label: "Demand preview", href: "/result" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#050607] py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <div className="pointer-events-none absolute -bottom-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <Container className="relative">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 shadow-[0_24px_100px_rgba(0,0,0,0.35)] sm:p-8 lg:grid-cols-[1.15fr_1.6fr] lg:p-10">
          <div className="space-y-6">
            <div>
              <Link href="/" className="font-display text-2xl font-bold tracking-[0.26em] text-white">
                BARE-X
              </Link>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/58">
                A formula-first skincare intelligence platform built to help people understand what their skin needs before launch inventory goes live.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.22em] text-white/45 sm:max-w-md">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <span className="block text-lg font-semibold tracking-normal text-white">30 sec</span>
                Skin analysis
              </div>
              <div className="rounded-2xl border border-accent/25 bg-accent/10 p-4">
                <span className="block text-lg font-semibold tracking-normal text-white">6</span>
                Planned products
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/quiz" className="px-5 py-3 text-[11px]">
                Analyze Skin
              </Button>
              <Button href="/waitlist" variant="ghost" className="px-5 py-3 text-[11px]">
                Join Early Access
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/35">{group.title}</h3>
                <div className="mt-4 grid gap-3 text-sm text-white/58">
                  {group.links.map((link) => (
                    <Link key={`${group.title}-${link.label}`} href={link.href} className="transition hover:text-white">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-xs uppercase tracking-[0.22em] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Bare-X. Demand validation phase.</p>
          <p>AI explanation layer. Deterministic skin scoring. No inventory pressure.</p>
        </div>
      </Container>
    </footer>
  );
}
