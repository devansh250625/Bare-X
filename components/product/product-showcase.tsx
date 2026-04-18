import { productCatalog } from "@/lib/constants";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductPrototype } from "@/components/product/product-prototype";

const showcaseProducts = [
  productCatalog.acneFaceWash,
  productCatalog.gelMoisturizer,
  productCatalog.sunscreen
];

export function ProductShowcase() {
  return (
    <section id="products" className="py-24">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Prototype Inventory"
          title="Professional-looking product prototypes that feel launch-ready from day one."
          description="Bare-X now presents its recommended routines as premium packaging concepts, so users visualize the brand, the inventory, and the outcome in the same moment."
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="rounded-[34px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 md:p-8">
              <div className="grid items-end gap-4 sm:grid-cols-3">
                {showcaseProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className={index === 1 ? "sm:-translate-y-6" : ""}
                  >
                    <ProductPrototype product={product} compact={index !== 1} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-[34px] border border-white/10 bg-white/[0.035] p-6 md:p-8">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-accent">Conversion Layer</div>
                <h3 className="mt-5 font-display text-3xl font-bold tracking-[-0.05em] text-white md:text-4xl">
                  Product visualization turns abstract recommendations into desire.
                </h3>
                <p className="mt-5 text-base leading-7 text-white/60">
                  Instead of telling users what they should buy later, Bare-X lets them feel the product line immediately. That tightens trust, increases waitlist intent, and gives the brand a premium retail presence before inventory exists.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["MEN / WOMEN markers", "Each package can adapt the front-face label to the user profile."],
                  ["Shared routine identity", "The same design language appears on landing, result, and waitlist screens."],
                  ["Mobile-first polish", "Packaging scales cleanly down to smaller viewports without losing luxury."],
                  ["Animation ready", "Hover lift, glow, and staggered reveal make the line feel alive."]
                ].map(([title, text]) => (
                  <div key={title} className="rounded-[24px] border border-white/10 bg-black/25 p-4">
                    <div className="text-sm font-medium text-white">{title}</div>
                    <div className="mt-2 text-sm leading-6 text-white/55">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
