import { generatedProductAssets } from "@/lib/generated-product-assets";
import { ProductRecommendation } from "@/lib/types";

export function getProductMockupImage(product: ProductRecommendation) {
  return generatedProductAssets[product.assetKey as keyof typeof generatedProductAssets] ?? null;
}
