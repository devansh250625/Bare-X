"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextSplitReveal } from "@/components/animations/text-split-reveal";
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
  },
  {
    ...productCatalog.hydratingFaceWash,
    ingredients: ["Hyaluronic Acid", "Ceramides"],
    tag: "Dry / Sensitive"
  },
  {
    ...productCatalog.bodyWash,
    ingredients: ["Salicylic Acid 2%", "Zinc PCA"],
    tag: "Body Acne"
  },
  {
    ...productCatalog.bodyLotion,
    ingredients: ["Urea 5%", "Ceramides"],
    tag: "Body Texture"
  }
];

export function ExploreProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="explore-products" ref={sectionRef} className="relative py-20 md:py-32 z-[2]">
      {/* Animated background glow */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(58,134,255,0.08),transparent)]"
      />

      <Container className="relative">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[10px] uppercase tracking-[0.35em] text-accent"
          >
            Our Products
          </motion.div>

          <TextSplitReveal
            as="h2"
            delay={0.1}
            className="text-sheen mt-5 font-display text-3xl font-bold tracking-[-0.04em] sm:text-4xl md:text-5xl"
          >
            Engineered for Your Skin
          </TextSplitReveal>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base"
          >
            Six precision formulas we&apos;re validating first. Built around real skin needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_20px_rgba(58,134,255,0.6)]"
          />
        </div>

        {/* Mobile: horizontal scroll carousel */}
        <div className="mt-12 md:hidden">
          <div className="horizontal-scroll px-2">
            {showcaseProducts.map((product, index) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="product-card w-[80vw] max-w-[320px] rounded-[24px] border border-white/8 bg-[#0a0a0f] p-4"
              >
                <div className="flex h-[260px] items-center justify-center">
                  <ProductVisual product={product} compact />
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">{product.name}</h3>
                    <span className="shrink-0 rounded-full border border-accent/25 bg-accent/8 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-accent">
                      {product.tag}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/55"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          {/* Scroll hint */}
          <div className="mt-4 flex justify-center gap-1">
            {showcaseProducts.map((_, i) => (
              <div key={i} className="h-1 w-6 rounded-full bg-white/10" />
            ))}
          </div>
        </div>

        {/* Desktop: grid layout */}
        <div className="mt-14 hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
          {showcaseProducts.map((product, index) => (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="product-card group relative rounded-[28px] border border-white/8 bg-[#0a0a0f] p-5 shadow-luxury sm:p-6"
            >
              {/* Top shine line */}
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Product image */}
              <div className="flex min-h-[320px] items-center justify-center">
                <ProductVisual product={product} compact={false} />
              </div>

              {/* Product info */}
              <div className="mt-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">{product.name}</h3>
                  <span className="shrink-0 rounded-full border border-accent/25 bg-accent/8 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-accent">
                    {product.tag}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white/55"
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
