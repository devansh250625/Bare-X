"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getProductMockupImage } from "@/lib/product-visuals";
import { ProductRecommendation } from "@/lib/types";
import { ProductPrototype } from "@/components/product/product-prototype";
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
    return <ProductPrototype product={product} compact={compact} className={className} />;
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
        <Image
          src={imageSrc}
          alt={product.name}
          width={compact ? 320 : 500}
          height={compact ? 320 : 500}
          className="mx-auto h-auto w-full max-w-[260px] object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.55)]"
          priority={!compact}
        />
      </motion.div>
    </motion.div>
  );
}
