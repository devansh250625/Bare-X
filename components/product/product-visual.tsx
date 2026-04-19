"use client";

import { motion } from "framer-motion";
import { getProductMockupImage } from "@/lib/product-visuals";
import { ProductRecommendation } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductVisual({
  product,
  compact = false,
  className
}: {
  product: ProductRecommendation;
  compact?: boolean;
  className?: string;
}) {
  const imageSrc = getProductMockupImage(product);

  if (!imageSrc) {
    return (
      <motion.div
        className={cn("relative flex min-h-[220px] items-center justify-center", className)}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(58,134,255,0.12),transparent_60%)] blur-2xl" />
        <div className="relative rounded-[20px] border border-dashed border-accent/25 bg-black/40 p-5 text-center">
          <div className="text-[10px] uppercase tracking-[0.28em] text-accent">Coming Soon</div>
          <div className="mt-2 text-base font-semibold text-white">{product.name}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("group relative", className)}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow behind product */}
      <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(58,134,255,0.12),transparent_55%)] blur-2xl transition-all duration-500 group-hover:blur-3xl group-hover:bg-[radial-gradient(circle_at_center,rgba(58,134,255,0.2),transparent_55%)]" />

      {/* Floating product image */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="relative"
        whileHover={{ y: -16, scale: 1.04, transition: { duration: 0.4 } }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={product.name}
          className={cn(
            "mx-auto h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-500 [image-rendering:auto]",
            compact ? "max-w-[200px]" : "max-w-[300px]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}
