"use client";

import { MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

type ProductCardData = {
  id: string;
  title: string;
  ingredients: string[];
  tag: string;
  kind: "tube-tall" | "pump" | "tube-short";
  lines: string[];
};

const products: ProductCardData[] = [
  {
    id: "face-wash",
    title: "Acne Control Face Wash",
    ingredients: ["Salicylic Acid 2%", "Niacinamide"],
    tag: "Oily / Acne-Prone",
    kind: "tube-tall",
    lines: ["BARE-X", "Acne Control", "Salicylic Acid 2%"]
  },
  {
    id: "moisturizer",
    title: "Oil-Free Moisturizer",
    ingredients: ["Hyaluronic Acid", "Ceramides"],
    tag: "Combination / Oily",
    kind: "pump",
    lines: ["BARE-X", "Oil-Free", "Daily Moisturizer"]
  },
  {
    id: "sunscreen",
    title: "SPF 50 Sunscreen",
    ingredients: ["Broad Spectrum", "No White Cast"],
    tag: "All Skin Types",
    kind: "tube-short",
    lines: ["BARE-X", "SPF 50", "Invisible Shield"]
  }
];

function ProductMockup({
  product,
  tiltX,
  tiltY
}: {
  product: ProductCardData;
  tiltX: number;
  tiltY: number;
}) {
  const isPump = product.kind === "pump";
  const isShortTube = product.kind === "tube-short";

  return (
    <div className="relative flex min-h-[23rem] items-center justify-center [perspective:1400px] sm:min-h-[25rem]">
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle,_rgba(58,134,255,0.15)_0%,_transparent_70%)] blur-2xl" />
      <motion.div
        className="relative"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d"
        }}
      >
        {isPump ? (
          <div className="relative flex flex-col items-center">
            <div className="relative z-20 h-6 w-20 rounded-t-[1rem] rounded-b-md border border-white/10 bg-gradient-to-b from-neutral-500/70 to-black shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              <div className="absolute left-1/2 top-[-0.5rem] h-3 w-6 -translate-x-1/2 rounded-full border border-white/10 bg-neutral-300/80" />
              <div className="absolute right-[-0.55rem] top-[0.45rem] h-1.5 w-6 rounded-full bg-neutral-300/70" />
            </div>
            <div className="relative -mt-1 h-[16.5rem] w-[10.5rem] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,#1a1a1a_0%,#050505_70%,#000000_100%)] shadow-[inset_-1px_-12px_30px_rgba(0,0,0,0.45),inset_1px_1px_0_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.55)] sm:h-[18rem] sm:w-[11.5rem]">
              <div className="absolute inset-y-0 left-4 w-px bg-white/20" />
              <div className="absolute inset-y-8 right-5 w-10 rounded-full bg-white/10 blur-xl" />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="absolute inset-3 rounded-[2rem] border border-white/6" />
              <div className="relative flex h-full flex-col px-5 pb-6 pt-8 text-white">
                <p className="text-[0.58rem] uppercase tracking-[0.38em] text-white/55">Men</p>
                <div className="mt-6">
                  <div className="font-display text-[2rem] font-bold tracking-[0.28em]">BARE-X</div>
                  <div className="mt-3 text-lg font-semibold leading-5">{product.lines[1]}</div>
                  <div className="mt-2 text-[0.72rem] uppercase tracking-[0.26em] text-accent">
                    {product.lines[2]}
                  </div>
                </div>
                <div className="mt-auto rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div className="text-[0.62rem] uppercase tracking-[0.28em] text-white/45">
                    Barrier-balanced hydration
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`relative overflow-hidden border border-white/10 bg-[linear-gradient(180deg,#1a1a1a_0%,#050505_68%,#000000_100%)] shadow-[inset_-1px_-12px_30px_rgba(0,0,0,0.45),inset_1px_1px_0_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.55)] ${
              isShortTube
                ? "h-[15.5rem] w-[10.25rem] rounded-[2rem] sm:h-[16.5rem] sm:w-[11rem]"
                : "h-[18rem] w-[10.5rem] rounded-[2.25rem] sm:h-[20rem] sm:w-[11.5rem]"
            }`}
          >
            <div className="absolute left-1/2 top-0 h-5 w-[74%] -translate-x-1/2 rounded-b-[1rem] border-x border-b border-white/10 bg-gradient-to-b from-neutral-500/70 to-black" />
            <div className="absolute inset-y-0 left-4 w-px bg-white/20" />
            <div className="absolute inset-y-10 right-5 w-10 rounded-full bg-white/10 blur-xl" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent" />
            <div className="absolute inset-3 rounded-[1.6rem] border border-white/6" />
            <div className="relative flex h-full flex-col px-5 pb-5 pt-8 text-white">
              <p className="text-[0.58rem] uppercase tracking-[0.38em] text-white/55">
                {isShortTube ? "All" : "Men"}
              </p>
              <div className="mt-5">
                <div className="font-display text-[1.8rem] font-bold tracking-[0.28em]">BARE-X</div>
                <div className="mt-3 text-lg font-semibold leading-5">{product.lines[1]}</div>
                <div className="mt-2 text-[0.72rem] uppercase tracking-[0.26em] text-accent">
                  {product.lines[2]}
                </div>
              </div>
              {isShortTube ? (
                <div className="mt-auto">
                  <div className="text-3xl font-bold tracking-[-0.06em] text-white">SPF 50</div>
                  <div className="mt-2 text-[0.62rem] uppercase tracking-[0.28em] text-white/45">
                    Broad spectrum protection
                  </div>
                </div>
              ) : (
                <div className="mt-auto rounded-[1.1rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div className="text-[0.62rem] uppercase tracking-[0.28em] text-white/45">
                    Targeted breakout control
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ExploreProductCard({ product, index }: { product: ProductCardData; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setTilt({
      x: ((y - 50) / 50) * -7,
      y: ((x - 50) / 50) * 9,
      glowX: x,
      glowY: y
    });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.36)] transition-shadow duration-300 hover:shadow-[0_34px_100px_rgba(58,134,255,0.12)] sm:p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(58,134,255,0.18), transparent 38%)`
        }}
      />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <ProductMockup product={product} tiltX={tilt.x} tiltY={tilt.y} />
      <div className="mt-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-white">{product.title}</h3>
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
  );
}

export function ExploreProducts() {
  return (
    <section id="explore-products" className="relative py-24">
      <Container>
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
            Each formula is selected by AI based on your skin profile, then visualized as a premium Bare-X product line to make the routine feel immediate and real.
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
          {products.map((product, index) => (
            <ExploreProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ExploreProducts;
