"use client";

import { motion } from "framer-motion";
import { ProductRecommendation } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductPrototypeProps = {
  product: ProductRecommendation;
  compact?: boolean;
  className?: string;
};

export function ProductPrototype({
  product,
  compact = false,
  className
}: ProductPrototypeProps) {
  const bottleHeight = compact ? "h-[240px]" : "h-[320px]";

  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 6, rotateY: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={cn("group [perspective:1200px]", className)}
    >
      <div className="relative mx-auto w-full max-w-[220px] [transform-style:preserve-3d]">
        <div
          className={cn(
            "relative mx-auto rounded-[30px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl",
            bottleHeight
          )}
        >
          <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.22),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(58,134,255,0.25),transparent_28%)]" />
          <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0c0f14]">
            <div className={cn("h-2 w-full bg-gradient-to-r", product.accent)} />
            <div className="flex items-center justify-between px-4 pt-4 text-[10px] uppercase tracking-[0.32em] text-white/45">
              <span>{product.audience}</span>
              <span>{product.size}</span>
            </div>
            <div className="px-4 pt-5">
              <div className="text-[10px] uppercase tracking-[0.35em] text-accent">{product.category}</div>
              <div className="mt-3 font-display text-2xl font-bold tracking-[-0.05em] text-white">
                Bare-X
              </div>
              <div className="mt-2 max-w-[10ch] text-xl font-semibold leading-6 text-white/90">
                {product.name}
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.25em] text-white/45">
                {product.format}
              </div>
            </div>
            <div className="mt-auto px-4 pb-4 pt-8">
              <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-3">
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                  {product.useTime}
                </div>
                <div className="mt-2 text-xs leading-5 text-white/68">{product.finish}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn("absolute inset-x-6 -bottom-6 h-10 rounded-full bg-gradient-to-r opacity-55 blur-2xl", product.accent)} />
      </div>
    </motion.div>
  );
}
