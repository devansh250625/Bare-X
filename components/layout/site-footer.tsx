import Link from "next/link";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10">
      <Container className="flex flex-col gap-4 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <div>Built for smarter skincare decisions, not empty shelf clutter.</div>
        <div className="flex gap-5">
          <Link href="/quiz" className="transition hover:text-white">
            Quiz
          </Link>
          <Link href="/waitlist" className="transition hover:text-white">
            Waitlist
          </Link>
        </div>
      </Container>
    </footer>
  );
}
