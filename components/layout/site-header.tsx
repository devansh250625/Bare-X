import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/75 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl font-bold tracking-[0.22em] text-white md:text-2xl">
          BARE-X
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
          <a href="#problem" className="transition hover:text-white">
            Why it works
          </a>
          <a href="#products" className="transition hover:text-white">
            Products
          </a>
          <a href="#how-it-works" className="transition hover:text-white">
            Flow
          </a>
          <a href="#social-proof" className="transition hover:text-white">
            Results
          </a>
        </nav>
        <Button href="/quiz" className="px-3 py-2 text-[11px] sm:px-4 sm:text-xs">
          Analyze My Skin
        </Button>
      </Container>
    </header>
  );
}
