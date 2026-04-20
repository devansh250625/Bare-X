"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, AlertTriangle, Sparkles, Activity, Brain, FileText } from "lucide-react";
import { AnalysisPayload, SystemProduct } from "@/lib/types";
import { useSkinReport } from "@/lib/skin-report";
import { useQuizStore } from "@/store/quiz-store";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist/waitlist-form";

function ScoreBar({ label, value, max = 10, color }: { label: string; value: number; max?: number; color: string }) {
  const pct = (value / max) * 100;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-foreground/50">{label}</span>
        <span className="font-medium text-foreground">{value}/{max}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-foreground/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: SystemProduct }) {
  return (
    <div className="rounded-2xl border border-foreground/6 bg-white p-5 shadow-[0_2px_16px_rgba(26,26,46,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-base font-semibold text-foreground">{product.name}</h4>
          <p className="mt-0.5 text-[12px] text-foreground/40">{product.subtitle}</p>
        </div>
        <span className="shrink-0 rounded-full border border-accent/20 bg-accent-soft px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-accent">
          {product.format.split("·")[0].trim()}
        </span>
      </div>

      {/* Ingredients */}
      <div className="mt-4 space-y-2.5">
        {product.keyIngredients.map((ing) => (
          <div key={ing.name} className="rounded-xl border border-foreground/5 bg-background p-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm font-medium text-foreground">
                {ing.name}{ing.concentration ? ` ${ing.concentration}` : ""}
              </span>
            </div>
            <p className="mt-1 pl-4 text-[12px] leading-relaxed text-foreground/40">{ing.role}</p>
          </div>
        ))}
      </div>

      {/* AI Reason */}
      {product.aiReason && (
        <div className="mt-4 rounded-xl border border-accent/10 bg-accent-soft p-3">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-accent/60">
            <Brain className="h-3 w-3" /> Why AI selected this
          </div>
          <p className="mt-1.5 text-[12px] leading-relaxed text-foreground/50">{product.aiReason}</p>
        </div>
      )}
    </div>
  );
}

export function ResultClient() {
  const storeResult = useQuizStore((state) => state.result);
  const [cachedResult, setCachedResult] = useState<AnalysisPayload | null>(null);

  useEffect(() => {
    const cached = window.sessionStorage.getItem("barex-result");
    if (cached) setCachedResult(JSON.parse(cached) as AnalysisPayload);
  }, []);

  const result = storeResult ?? cachedResult;

  if (!result) {
    return (
      <Container className="py-24 pt-28">
        <div className="mx-auto max-w-lg rounded-3xl border border-foreground/6 bg-white p-8 text-center shadow-[0_4px_24px_rgba(26,26,46,0.04)]">
          <h1 className="font-display text-2xl font-bold text-foreground">No analysis found yet.</h1>
          <p className="mt-3 text-foreground/45">Take the Bare-X quiz first to unlock your skin score and system.</p>
          <div className="mt-6"><Button href="/quiz">Start Quiz</Button></div>
        </div>
      </Container>
    );
  }

  const cs = result.compositeScore ?? 0;
  const skinAge = result.skinAge ?? 25;
  const routineScore = result.routineScore ?? 50;
  const interp = result.interpretation;
  const system = result.assignedSystem;
  const sunscreen = result.sunscreen;

  const scoreColor = cs >= 70 ? "#22C55E" : cs >= 45 ? "#EAB308" : "#EF4444";
  const { generateReport, generating } = useSkinReport();

  return (
    <Container className="space-y-8 pb-16 pt-28 md:pt-32">

      {/* Download Report Bar */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-between rounded-2xl border border-accent/12 bg-accent-soft p-4"
      >
        <div className="flex items-center gap-2.5">
          <FileText className="h-4 w-4 text-accent" />
          <span className="text-sm text-foreground/50">Your full skin analysis is ready to download.</span>
        </div>
        <button onClick={() => generateReport(result)} disabled={generating}
          className="flex items-center gap-1.5 rounded-full border border-accent/20 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-accent transition hover:bg-accent hover:text-white disabled:opacity-50">
          <Download className="h-3.5 w-3.5" />
          {generating ? "Generating..." : "Download Report"}
        </button>
      </motion.div>

      {/* ── Section 1: Skin Profile ── */}
      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="grid gap-6 lg:grid-cols-[1fr_1.2fr]"
      >
        {/* Score card */}
        <div className="rounded-3xl border border-foreground/6 bg-white p-6 shadow-[0_4px_24px_rgba(26,26,46,0.04)] md:p-7">
          <div className="text-[10px] uppercase tracking-[0.25em] text-accent">Your Skin Score</div>
          <div className="mt-3 flex items-end gap-3">
            <span className="font-display text-6xl font-bold" style={{ color: scoreColor }}>{cs}</span>
            <span className="mb-2 text-2xl text-foreground/25">/100</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/50">{result.explanation}</p>

          {/* Profile tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {result.profile.map((tag) => (
              <span key={tag} className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1.5 text-[11px] font-medium text-accent">
                {tag}
              </span>
            ))}
          </div>

          {/* Skin Age + Routine Score */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-foreground/6 bg-background p-3.5 text-center">
              <Activity className="mx-auto h-4 w-4 text-foreground/30" />
              <div className="mt-1 font-display text-2xl font-bold text-foreground">{skinAge}</div>
              <div className="text-[10px] text-foreground/35">Skin Age</div>
            </div>
            <div className="rounded-2xl border border-foreground/6 bg-background p-3.5 text-center">
              <Sparkles className="mx-auto h-4 w-4 text-foreground/30" />
              <div className="mt-1 font-display text-2xl font-bold text-foreground">{routineScore}%</div>
              <div className="text-[10px] text-foreground/35">Routine Score</div>
            </div>
          </div>
        </div>

        {/* ── Section 2: Metric Breakdown ── */}
        <div className="rounded-3xl border border-foreground/6 bg-white p-6 shadow-[0_4px_24px_rgba(26,26,46,0.04)] md:p-7">
          <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/35">Metric Breakdown</div>
          <div className="mt-5 space-y-4">
            <ScoreBar label="Acne Risk" value={result.skinScore.acneRisk} color={result.skinScore.acneRisk >= 7 ? "#EF4444" : result.skinScore.acneRisk >= 4 ? "#EAB308" : "#22C55E"} />
            <ScoreBar label="Oil Level" value={result.skinScore.oilLevel} color={result.skinScore.oilLevel >= 7 ? "#EF4444" : "#3A86FF"} />
            <ScoreBar label="Hydration" value={result.skinScore.hydration} color={result.skinScore.hydration <= 4 ? "#EF4444" : "#22C55E"} />
            <ScoreBar label="Sensitivity" value={result.skinScore.sensitivity} color={result.skinScore.sensitivity >= 6 ? "#EAB308" : "#22C55E"} />
          </div>

          <div className="mt-5 text-[11px] text-foreground/30">
            Skin type: {result.answers.skinType} · Concerns: {result.answers.concerns.join(", ") || "None selected"}
          </div>
        </div>
      </motion.section>

      {/* ── Section 3: Interpretation ── */}
      {interp && (
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          <div className="rounded-3xl border border-foreground/6 bg-white p-6 shadow-[0_4px_24px_rgba(26,26,46,0.04)] md:p-7">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-accent">
              <Brain className="h-3.5 w-3.5" /> What this means
            </div>
            <div className="mt-4 space-y-3">
              {interp.whatThisMeans.map((item, i) => (
                <p key={i} className="text-sm leading-relaxed text-foreground/55">{item}</p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-red-100 bg-red-50/50 p-6 md:p-7">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-red-500/70">
              <AlertTriangle className="h-3.5 w-3.5" /> What happens if ignored
            </div>
            <div className="mt-4 space-y-3">
              {interp.whatHappensIfIgnored.map((item, i) => (
                <p key={i} className="text-sm leading-relaxed text-foreground/55">{item}</p>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Section 4: Your Bare-X System ── */}
      {system && (
        <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
        >
          <div className="rounded-3xl border border-foreground/6 bg-white p-6 shadow-[0_4px_24px_rgba(26,26,46,0.04)] md:p-7">
            <div className="text-[10px] uppercase tracking-[0.25em] text-accent">Your Assigned System</div>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">{system.name}</h2>
            <p className="mt-2 text-sm text-foreground/45">{system.tagline} — {system.forWhom}</p>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {system.products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>

          {/* Sunscreen */}
          {sunscreen && (
            <div className="mt-4">
              <ProductCard product={sunscreen} />
            </div>
          )}
        </motion.section>
      )}

      {/* ── Section 5: CTA ── */}
      <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="rounded-3xl border border-accent/12 bg-accent-soft p-6 md:p-7">
          <div className="text-[10px] uppercase tracking-[0.25em] text-accent">Next Step</div>
          <h3 className="mt-3 font-display text-2xl font-bold text-foreground">Get this routine at launch.</h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground/50">
            Your {system?.name || "personalized system"} is ready. Join the waitlist to get first access + an exclusive 15% discount coupon.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/quiz" variant="ghost" className="gap-2 text-[11px]">
              Retake Quiz
            </Button>
            <Button href="/" variant="ghost" className="gap-2 text-[11px]">
              Back to Home
            </Button>
          </div>
        </div>
        <WaitlistForm />
      </motion.section>
    </Container>
  );
}
