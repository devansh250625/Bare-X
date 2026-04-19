"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type CouponData = {
  code: string;
  discountPercent: number;
};

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [skinGoal, setSkinGoal] = useState("");
  const [sampleConsent, setSampleConsent] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [coupon, setCoupon] = useState<CouponData | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          city,
          postalCode,
          skinGoal,
          sampleConsent
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to join waitlist.");
      }

      setStatus("success");
      if (data.coupon) {
        setCoupon({
          code: data.coupon.code,
          discountPercent: data.coupon.discountPercent
        });
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  function handleCopy() {
    if (!coupon) return;
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Success state with coupon reveal ──
  if (status === "success" && coupon) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6 rounded-[32px] border border-accent/20 bg-[radial-gradient(ellipse_at_top,rgba(58,134,255,0.1),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 md:p-8"
      >
        {/* Success header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10"
          >
            <Sparkles className="h-7 w-7 text-accent" />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-2xl font-bold text-white"
          >
            You&apos;re on the list!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-sm text-white/55"
          >
            As a thank you, here&apos;s your exclusive early access reward.
          </motion.p>
        </div>

        {/* Coupon card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="gradient-border shimmer relative overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,rgba(58,134,255,0.12),rgba(99,102,241,0.08))] p-5 md:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                <Gift className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-accent/70">
                  Early Access Reward
                </div>
                <div className="mt-1 font-display text-2xl font-bold text-white">
                  {coupon.discountPercent}% OFF
                </div>
              </div>
            </div>
            <div className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-accent">
              Sitewide
            </div>
          </div>

          <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Coupon code display */}
          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              Your Coupon Code
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex-1 rounded-xl border border-dashed border-accent/30 bg-black/30 px-4 py-3 text-center font-mono text-lg font-bold tracking-[0.15em] text-white">
                {coupon.code}
              </div>
              <button
                onClick={handleCopy}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
                aria-label="Copy coupon code"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="h-4 w-4 text-green-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-4 space-y-1.5 text-[11px] text-white/35">
            <p>• Valid on all Bare-X products at launch</p>
            <p>• Single use per account · No expiry</p>
            <p>• Cannot be combined with other offers</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button href="/" className="flex-1 text-center">
            Back to Home
          </Button>
          <Button href="/quiz" variant="ghost" className="flex-1 text-center">
            Take the Quiz
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  // ── Form state ──
  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[32px] border border-white/10 bg-white/[0.04] p-5 md:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="Aman Verma"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Phone</span>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="+91 98765 43210"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Skin Goal</span>
          <input
            value={skinGoal}
            onChange={(event) => setSkinGoal(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="Acne, glow, oil control..."
          />
        </label>
      </div>
      <label className="space-y-2">
        <span className="text-xs uppercase tracking-[0.24em] text-white/45">Address for future samples</span>
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
          placeholder="House / apartment / street"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">City</span>
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="Mumbai"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-white/45">Postal Code</span>
          <input
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent/60"
            placeholder="400001"
          />
        </label>
      </div>
      <label className="flex gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/65">
        <input
          type="checkbox"
          checked={sampleConsent}
          onChange={(event) => setSampleConsent(event.target.checked)}
          className="mt-1 h-4 w-4 accent-[#3A86FF]"
        />
        I&apos;m interested in Bare-X launch updates and possible sample delivery when products are ready.
      </label>

      {/* Coupon teaser */}
      <div className="flex items-center gap-3 rounded-2xl border border-accent/15 bg-accent/5 p-4">
        <Gift className="h-5 w-5 shrink-0 text-accent" />
        <p className="text-sm text-white/60">
          <span className="font-medium text-accent">15% off sitewide</span> — Join now and get an exclusive coupon code for Bare-X launch.
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Saving..." : "Join & Get My Coupon"}
      </Button>
      {status === "error" && message ? <p className="text-sm text-red-400/80">{message}</p> : null}
    </form>
  );
}
