"use client";

import { MouseEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProductRecommendation } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductPrototypeProps = {
  product: ProductRecommendation;
  compact?: boolean;
  className?: string;
  scene?: boolean;
};

function getPackagingKind(product: ProductRecommendation) {
  if (product.category === "Moisturizer") return "pump";
  if (product.category === "Sunscreen") return "tube-short";
  return "tube-tall";
}

function getHeroLabel(product: ProductRecommendation) {
  if (product.category === "Sunscreen") {
    return {
      top: "SPF 50",
      bottom: "SUNSCREEN"
    };
  }

  const words = product.name.replace("Bare-X", "").trim().split(" ");
  return {
    top: words.slice(0, 2).join(" "),
    bottom: words.slice(2).join(" ") || product.category
  };
}

function getIngredientLine(product: ProductRecommendation) {
  return product.ingredients.slice(0, 2).join(" + ");
}

export function ProductPrototype({
  product,
  compact = false,
  className,
  scene = true
}: ProductPrototypeProps) {
  const kind = getPackagingKind(product);
  const label = useMemo(() => getHeroLabel(product), [product]);
  const ingredientLine = useMemo(() => getIngredientLine(product), [product]);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setTilt({
      x: ((y - 50) / 50) * -6,
      y: ((x - 50) / 50) * 8,
      glowX: x,
      glowY: y
    });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  }

  const frameHeight = compact ? "min-h-[280px]" : "min-h-[360px]";
  const tubeBody =
    kind === "tube-short"
      ? "h-[248px] w-[158px] rounded-[28px]"
      : "h-[292px] w-[168px] rounded-[30px]";
  const pumpBody = compact ? "h-[255px] w-[155px]" : "h-[305px] w-[170px]";

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className={cn("group relative [perspective:1400px]", className)}
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      {scene ? (
        <>
          <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_center,rgba(58,134,255,0.10),transparent_68%)] blur-2xl" />
          <div
            className="pointer-events-none absolute inset-0 rounded-[34px] opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(58,134,255,0.18), transparent 34%)`
            }}
          />
        </>
      ) : null}

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
        whileHover={{ y: -12, scale: 1.03 }}
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: "preserve-3d"
        }}
        className={cn("relative flex items-end justify-center", frameHeight)}
      >
        {kind === "pump" ? (
          <div className="relative flex flex-col items-center">
            <div className="relative z-20 h-10 w-20 rounded-t-[14px] rounded-b-[8px] bg-[linear-gradient(180deg,#191919_0%,#070707_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_14px_28px_rgba(0,0,0,0.35)]">
              <div className="absolute left-1/2 top-[-8px] h-4 w-7 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#4f4f4f_0%,#141414_100%)]" />
              <div className="absolute right-[-10px] top-[9px] h-[7px] w-10 rounded-full bg-[linear-gradient(90deg,#4b4b4b_0%,#191919_100%)]" />
            </div>
            <div
              className={cn(
                "relative -mt-1 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,#161616_0%,#070707_56%,#000000_100%)] shadow-[inset_1px_1px_0_rgba(255,255,255,0.08),inset_-20px_0_40px_rgba(0,0,0,0.28),0_32px_80px_rgba(0,0,0,0.55)]",
                pumpBody
              )}
            >
              <div className="absolute inset-y-0 left-4 w-[2px] bg-gradient-to-b from-white/0 via-white/22 to-white/0" />
              <div className="absolute inset-y-6 right-3 w-10 rounded-full bg-gradient-to-b from-accent/30 via-transparent to-accent/10 blur-xl" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-accent/10 to-transparent" />
              <div className="absolute inset-2 rounded-[26px] border border-white/6" />
              <div className="relative flex h-full flex-col px-5 pb-5 pt-8 text-center text-white">
                <div className="text-[0.62rem] uppercase tracking-[0.3em] text-white/55">{product.audience}</div>
                <div className="mt-5 font-display text-[2.1rem] font-bold tracking-[0.08em]">BARE-X</div>
                <div className="mt-7 text-[1.05rem] font-semibold leading-5 text-white">{label.top}</div>
                <div className="mt-1 text-[1.05rem] font-semibold leading-5 text-accent">{label.bottom}</div>
                <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
                <div className="mt-5 text-[0.86rem] leading-5 text-white/84">{ingredientLine}</div>
                <div className="mt-4 text-[0.8rem] text-white/74">AI Personalized Formula</div>
                <div className="mt-auto text-[0.96rem] text-white/90">{product.size.toLowerCase()}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col items-center">
            <div className="relative z-20 h-4 w-[92%] rounded-t-[8px] bg-[linear-gradient(180deg,#2a2a2a_0%,#0c0c0c_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
              <div className="absolute inset-x-2 top-0 h-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.12)_0px,rgba(255,255,255,0.12)_1px,transparent_1px,transparent_5px)] opacity-70" />
            </div>
            <div
              className={cn(
                "relative -mt-[1px] overflow-hidden border border-white/10 bg-[linear-gradient(180deg,#1b1b1b_0%,#080808_52%,#000000_100%)] shadow-[inset_1px_1px_0_rgba(255,255,255,0.08),inset_-20px_0_40px_rgba(0,0,0,0.3),0_32px_80px_rgba(0,0,0,0.55)]",
                tubeBody
              )}
              style={{
                clipPath:
                  kind === "tube-short"
                    ? "polygon(11% 0%, 89% 0%, 97% 12%, 92% 88%, 8% 88%, 3% 12%)"
                    : "polygon(9% 0%, 91% 0%, 98% 10%, 93% 86%, 7% 86%, 2% 10%)"
              }}
            >
              <div className="absolute inset-y-0 left-4 w-[2px] bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
              <div className="absolute inset-y-8 right-4 w-9 rounded-full bg-gradient-to-b from-accent/35 via-transparent to-accent/10 blur-xl" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-accent/10 to-transparent" />
              <div className="absolute inset-3 rounded-[24px] border border-white/6" />
              <div className="relative flex h-full flex-col px-6 pb-6 pt-8 text-center text-white">
                <div className="font-display text-[2rem] font-bold tracking-[0.08em]">BARE-X</div>
                <div className="mt-7 text-[1.05rem] font-semibold leading-5 text-white">{label.top}</div>
                <div className="mt-1 text-[1.05rem] font-semibold leading-5 text-accent">{label.bottom}</div>
                <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent" />
                <div className="mt-5 text-[0.84rem] leading-5 text-white/84">{ingredientLine}</div>
                <div className="mt-4 text-[0.8rem] text-white/74">AI Personalized Formula</div>
                <div className="mt-auto text-[0.96rem] text-white/90">{product.size.toLowerCase()}</div>
              </div>
            </div>
            <div className="relative -mt-3 h-10 w-[72%] rounded-b-[18px] rounded-t-[10px] border border-white/8 bg-[linear-gradient(180deg,#121212_0%,#020202_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="absolute left-1/2 top-[55%] h-5 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 bg-black/55" />
            </div>
          </div>
        )}

        <div className="absolute bottom-3 left-1/2 h-5 w-[58%] -translate-x-1/2 rounded-full bg-accent/80 blur-[14px]" />
        <div className="absolute bottom-1 left-1/2 h-[3px] w-[68%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(134,210,255,0.95)_0%,rgba(58,134,255,0.9)_35%,transparent_72%)]" />
      </motion.div>
    </motion.div>
  );
}
