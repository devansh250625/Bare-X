"use client";

import { motion } from "framer-motion";
import { getProductMockupImage } from "@/lib/product-visuals";
import { ProductRecommendation } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductVisual({
  product,
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
        className={cn("relative flex min-h-[260px] items-center justify-center", className)}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_center,rgba(58,134,255,0.18),transparent_62%)] blur-2xl" />
        <div className="relative rounded-[28px] border border-dashed border-accent/35 bg-black/40 p-6 text-center">
          <div className="text-xs uppercase tracking-[0.28em] text-accent">AI mockup pending</div>
          <div className="mt-3 text-lg font-semibold text-white">{product.name}</div>
          <p className="mt-3 max-w-[18rem] text-sm leading-6 text-white/55">
            Generate exact packaging assets to replace this placeholder.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("group relative", className)}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_center,rgba(58,134,255,0.18),transparent_62%)] blur-2xl" />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
        className="relative"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={product.name}
          className="mx-auto h-auto w-full max-w-[280px] object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.55)]"
        />
      </motion.div>
    </motion.div>
  );
}
