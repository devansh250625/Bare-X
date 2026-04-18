"use client";

import { motion } from "framer-motion";
import { productCatalog } from "@/lib/constants";
import { ProductVisual } from "@/components/product/product-visual";

const heroProducts = [
  productCatalog.acneFaceWash,
  {
    ...productCatalog.gelMoisturizer,
    name: "Oil-Free Moisturizer",
    ingredients: ["Hyaluronic Acid", "Ceramides"]
  },
  {
    ...productCatalog.sunscreen,
    name: "SPF 50 Sunscreen",
    ingredients: ["Broad Spectrum", "No White Cast"]
  }
];

export function HeroProductStage() {
  return (
    <div
      data-parallax="hero-stage"
      className="relative mx-auto flex w-full max-w-[560px] items-end justify-center gap-[-8px] sm:gap-0"
    >
      <div className="absolute inset-x-8 bottom-8 h-10 rounded-full bg-[radial-gradient(circle,rgba(58,134,255,0.7)_0%,rgba(58,134,255,0.2)_35%,transparent_72%)] blur-xl" />
      <motion.div
        initial={{ opacity: 0, x: -30, rotate: -4 }}
        animate={{ opacity: 1, x: 0, rotate: -5 }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
        className="relative z-10 -mr-6 mt-10 w-[33%] origin-bottom"
      >
        <ProductVisual product={heroProducts[0]} compact className="scale-[0.88]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, delay: 0.22, ease: "easeOut" }}
        className="relative z-20 w-[40%]"
      >
        <ProductVisual product={heroProducts[1]} compact />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 4 }}
        animate={{ opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.9, delay: 0.28, ease: "easeOut" }}
        className="relative z-10 -ml-6 mt-10 w-[33%] origin-bottom"
      >
        <ProductVisual product={heroProducts[2]} compact className="scale-[0.88]" />
      </motion.div>
    </div>
  );
}
