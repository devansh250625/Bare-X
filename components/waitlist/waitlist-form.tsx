"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Gift, Sparkles, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

type CouponData = { code: string; discountPercent: number };

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "returning" | "error">("idle");
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState<CouponData | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to join.");

      if (data.coupon) setCoupon({ code: data.coupon.code, discountPercent: data.coupon.discountPercent });
      setStatus(data.alreadyJoined ? "returning" : "success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again in a moment.");
    }
  }

  function handleCopy() {
    if (!coupon) return;
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Returning User ──
  if (status === "returning" && coupon) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-5 rounded-3xl border border-foreground/6 bg-white p-6 shadow-[0_8px_40px_rgba(26,26,46,0.06)] md:p-8"
      >
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
            <Heart className="h-6 w-6 text-amber-500" />
          </motion.div>
          <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">Welcome back! 👋</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/45">
            You&apos;re already on the list — we saved your spot. Here&apos;s your coupon again, just in case.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="rounded-2xl border border-accent/12 bg-accent-soft p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Gift className="h-5 w-5 text-accent" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-accent/60">Your Saved Coupon</div>
                <div className="font-display text-xl font-bold text-foreground">{coupon.discountPercent}% OFF</div>
              </div>
            </div>
            <span className="rounded-full border border-accent/20 bg-white px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-accent">
              Sitewide
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 rounded-lg border border-dashed border-accent/25 bg-white px-3 py-2.5 text-center font-mono text-base font-bold tracking-[0.12em] text-foreground">
              {coupon.code}
            </div>
            <button onClick={handleCopy} aria-label="Copy"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/8 bg-white text-foreground/40 transition hover:text-accent">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div key="p" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Copy className="h-3.5 w-3.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
          <p className="mt-3 text-[11px] text-foreground/30">Single use · No expiry · Valid on all Bare-X products</p>
        </motion.div>

        <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-center">
          <p className="text-[12px] leading-relaxed text-foreground/45">
            🧡 Good things take time. We&apos;re building something special for your skin — stay tuned for launch updates.
          </p>
        </div>

        <div className="flex gap-2.5">
          <Button href="/" className="flex-1 text-center text-[11px]">Home</Button>
          <Button href="/quiz" variant="ghost" className="flex-1 text-center text-[11px]">Take Quiz</Button>
        </div>
      </motion.div>
    );
  }

  // ── New User Success ──
  if (status === "success" && coupon) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-5 rounded-3xl border border-foreground/6 bg-white p-6 shadow-[0_8px_40px_rgba(26,26,46,0.06)] md:p-8"
      >
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft">
            <Sparkles className="h-6 w-6 text-accent" />
          </motion.div>
          <h3 className="font-display text-xl font-bold text-foreground sm:text-2xl">You&apos;re in! 🎉</h3>
          <p className="mt-1.5 text-sm text-foreground/45">Check your email — we sent your coupon there too.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="rounded-2xl border border-accent/12 bg-accent-soft p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Gift className="h-5 w-5 text-accent" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-accent/60">Launch Reward</div>
                <div className="font-display text-xl font-bold text-foreground">{coupon.discountPercent}% OFF</div>
              </div>
            </div>
            <span className="rounded-full border border-accent/20 bg-white px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-accent">
              Sitewide
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 rounded-lg border border-dashed border-accent/25 bg-white px-3 py-2.5 text-center font-mono text-base font-bold tracking-[0.12em] text-foreground">
              {coupon.code}
            </div>
            <button onClick={handleCopy} aria-label="Copy"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/8 bg-white text-foreground/40 transition hover:text-accent">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div key="p" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Copy className="h-3.5 w-3.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
          <p className="mt-3 text-[11px] text-foreground/30">Single use · No expiry · Valid on all Bare-X products</p>
        </motion.div>

        <div className="flex gap-2.5">
          <Button href="/" className="flex-1 text-center text-[11px]">Home</Button>
          <Button href="/quiz" variant="ghost" className="flex-1 text-center text-[11px]">Take Quiz</Button>
        </div>
      </motion.div>
    );
  }

  // ── Form ──
  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-foreground/6 bg-white p-6 shadow-[0_8px_40px_rgba(26,26,46,0.06)] md:p-8">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">Get your personalized routine + {15}% off</h3>
        <p className="mt-1.5 text-sm text-foreground/40">Join 500+ people waiting for smarter skincare.</p>
      </div>

      <div className="flex gap-2.5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-xl border border-foreground/8 bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/10 placeholder:text-foreground/25"
          placeholder="your@email.com"
        />
        <Button type="submit" disabled={status === "loading"} className="shrink-0 gap-1.5 px-5 py-3 text-[11px]">
          {status === "loading" ? (
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Joining...
            </span>
          ) : (
            <>Join <ArrowRight className="h-3.5 w-3.5" /></>
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2.5 rounded-xl border border-accent/10 bg-accent-soft/50 px-3 py-2.5">
        <Gift className="h-4 w-4 shrink-0 text-accent" />
        <p className="text-[12px] text-foreground/45">
          <span className="font-medium text-accent">15% off coupon</span> sent to your email instantly.
        </p>
      </div>

      {status === "error" && message && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-center">
          <p className="text-[13px] leading-relaxed text-amber-800">{message}</p>
          <p className="mt-1 text-[11px] text-amber-600/60">Your spot is safe — just try again shortly.</p>
        </motion.div>
      )}
    </form>
  );
}
