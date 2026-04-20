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
      <div className={cn("flex min-h-[200px] items-center justify-center", className)}>
        <div className="rounded-2xl border border-dashed border-accent/25 bg-accent/5 p-5 text-center">
          <div className="text-[10px] uppercase tracking-[0.25em] text-accent">Coming Soon</div>
          <div className="mt-2 text-base font-semibold text-white">{product.name}</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn("group relative", className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="relative"
        whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.35 } }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={product.name}
          className={cn(
            "mx-auto h-auto w-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.4)] transition-all duration-500",
            compact ? "max-w-[180px]" : "max-w-[260px]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}
