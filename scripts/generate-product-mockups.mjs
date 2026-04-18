import { GoogleGenAI } from "@google/genai";
import fs from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const outputDir = path.join(cwd, "public", "mockups", "generated");
const generatedModulePath = path.join(cwd, "lib", "generated-product-assets.ts");

const args = process.argv.slice(2);
const referenceIndex = args.indexOf("--reference");
const referencePath =
  referenceIndex >= 0 && args[referenceIndex + 1]
    ? path.resolve(cwd, args[referenceIndex + 1])
    : null;

const products = [
  {
    key: "acneFaceWash",
    filename: "acne-face-wash.png",
    prompt:
      'Create a premium skincare packaging hero render for "BARE-X Acne Control Face Wash". Matte black tube, electric blue underglow on a dark studio floor, centered white typography, blue accent line, masculine clinical luxury branding, photoreal product photography, straight-on slightly low camera angle, isolated product with subtle shadow, text on pack: BARE-X, Acne Control Face Wash, Salicylic Acid 2% + Niacinamide, AI Personalized Formula, 100 ml.'
  },
  {
    key: "gelMoisturizer",
    filename: "oil-free-moisturizer.png",
    prompt:
      'Create a premium skincare packaging hero render for "BARE-X Oil-Free Moisturizer". Matte black pump bottle, electric blue underglow on a dark studio floor, centered white typography, blue accent line, masculine clinical luxury branding, photoreal product photography, straight-on slightly low camera angle, isolated product with subtle shadow, text on pack: BARE-X, Oil-Free Moisturizer, Hyaluronic Acid + Ceramides, AI Personalized Formula, 50 ml.'
  },
  {
    key: "sunscreen",
    filename: "spf-50-sunscreen.png",
    prompt:
      'Create a premium skincare packaging hero render for "BARE-X SPF 50 Sunscreen". Matte black tube, electric blue underglow on a dark studio floor, centered white typography, bold blue SPF 50 line, masculine clinical luxury branding, photoreal product photography, straight-on slightly low camera angle, isolated product with subtle shadow, text on pack: BARE-X, SPF 50 SUNSCREEN, Broad Spectrum Protection, AI Personalized Formula, 50 ml.'
  }
];

function guessExtension(mimeType) {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/jpeg") return "jpg";
  return "png";
}

async function loadReferencePart() {
  if (!referencePath) return null;
  const file = await fs.readFile(referencePath);
  const ext = path.extname(referencePath).toLowerCase();
  const mimeType =
    ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";

  return {
    inlineData: {
      mimeType,
      data: file.toString("base64")
    }
  };
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing. Add it to your environment first.");
  }

  await ensureDir(outputDir);
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const referencePart = await loadReferencePart();
  const generatedMap = {};

  for (const product of products) {
    const contents = referencePart
      ? [
          { text: "Use this reference image only for the packaging style, lighting, camera angle, and luxury studio mood. Keep the Bare-X branding and requested text exact." },
          referencePart,
          { text: product.prompt }
        ]
      : product.prompt;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents
    });

    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find((part) => part.inlineData);

    if (!imagePart?.inlineData?.data) {
      throw new Error(`No image returned for ${product.key}.`);
    }

    const ext = guessExtension(imagePart.inlineData.mimeType);
    const filename = product.filename.replace(/\.(png|jpg|webp)$/i, `.${ext}`);
    const targetPath = path.join(outputDir, filename);
    const buffer = Buffer.from(imagePart.inlineData.data, "base64");
    await fs.writeFile(targetPath, buffer);
    generatedMap[product.key] = `/mockups/generated/${filename}`;
    console.log(`Saved ${product.key} -> ${targetPath}`);
  }

  const source = `export const generatedProductAssets = ${JSON.stringify(
    {
      acneFaceWash: null,
      hydratingFaceWash: null,
      oilControlFaceWash: null,
      sensitiveFaceWash: null,
      gelMoisturizer: null,
      creamMoisturizer: null,
      sunscreen: null,
      ...generatedMap
    },
    null,
    2
  )} as const;\n`;

  await fs.writeFile(generatedModulePath, source);
  console.log(`Updated ${generatedModulePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
