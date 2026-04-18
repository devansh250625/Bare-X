"use client";

import { motion } from "framer-motion";
import { ProductVisual } from "@/components/product/product-visual";
import { Container } from "@/components/ui/container";
import { productCatalog } from "@/lib/constants";
import { ProductRecommendation } from "@/lib/types";

const showcaseProducts: Array<ProductRecommendation & { tag: string }> = [
  {
    ...productCatalog.acneFaceWash,
    ingredients: ["Salicylic Acid 2%", "Niacinamide"],
    tag: "Oily / Acne-Prone"
  },
  {
    ...productCatalog.gelMoisturizer,
    name: "Oil-Free Moisturizer",
    ingredients: ["Hyaluronic Acid", "Ceramides"],
    tag: "Combination / Oily"
  },
  {
    ...productCatalog.sunscreen,
    name: "SPF 50 Sunscreen",
    ingredients: ["Broad Spectrum", "No White Cast"],
    tag: "All Skin Types"
  }
];

export function ExploreProducts() {
  return (
    <section id="explore-products" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(58,134,255,0.08),transparent_58%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-xs uppercase tracking-[0.34em] text-accent"
          >
            Explore Our Products
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-6 font-display text-4xl font-bold tracking-[-0.06em] text-white sm:text-5xl"
          >
            Engineered for Your Skin
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/62 sm:text-lg"
          >
            Each formula is selected by AI based on your skin profile and shown in the exact premium Bare-X packaging direction we plan to ship later.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0.7 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_24px_rgba(58,134,255,0.75)]"
          />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {showcaseProducts.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
            className="group relative rounded-[2rem] border border-white/10 bg-[#111111] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.36)] transition duration-300 hover:border-accent/20 hover:shadow-[0_34px_100px_rgba(58,134,255,0.12)] sm:p-6"
            >
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <ProductVisual product={product} compact={false} />
              <div className="mt-2">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">{product.name}</h3>
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-accent">
                    {product.tag}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs uppercase tracking-[0.16em] text-white/68"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ExploreProducts;
