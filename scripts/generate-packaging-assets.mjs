import fs from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const outputDir = path.join(cwd, "public", "mockups", "generated");
const generatedModulePath = path.join(cwd, "lib", "generated-product-assets.ts");

const products = [
  {
    key: "acneFaceWash",
    filename: "acne-face-wash.svg",
    shape: "tube",
    titleTop: "Acne Control",
    titleAccent: "Face Wash",
    details: ["Salicylic Acid 2%", "+ Niacinamide"],
    meta: "AI Personalized Formula",
    size: "100 ml"
  },
  {
    key: "hydratingFaceWash",
    filename: "barrier-hydrating-face-wash.svg",
    shape: "tube",
    titleTop: "Barrier Hydrating",
    titleAccent: "Face Wash",
    details: ["Hyaluronic Acid", "+ Ceramides"],
    meta: "AI Personalized Formula",
    size: "100 ml"
  },
  {
    key: "gelMoisturizer",
    filename: "oil-free-moisturizer.svg",
    shape: "pump",
    titleTop: "Oil-Free",
    titleAccent: "Moisturizer",
    details: ["Hyaluronic Acid", "+ Ceramides"],
    meta: "AI Personalized Formula",
    size: "50 ml"
  },
  {
    key: "sunscreen",
    filename: "spf-50-sunscreen.svg",
    shape: "tube",
    titleTop: "SPF 50",
    titleAccent: "SUNSCREEN",
    details: ["Broad Spectrum Protection"],
    meta: "AI Personalized Formula",
    size: "50 ml"
  },
  {
    key: "bodyWash",
    filename: "body-acne-control-wash.svg",
    shape: "bottle",
    titleTop: "Body Acne",
    titleAccent: "Control Wash",
    details: ["Salicylic Acid 2%", "+ Zinc PCA"],
    meta: "AI Personalized Formula",
    size: "250 ml"
  },
  {
    key: "bodyLotion",
    filename: "body-repair-lotion.svg",
    shape: "pump",
    titleTop: "Body Repair",
    titleAccent: "Lotion",
    details: ["Urea 5%", "+ Ceramides"],
    meta: "AI Personalized Formula",
    size: "250 ml"
  }
];

function xml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tubeProduct(product) {
  const isSunscreen = product.key === "sunscreen";
  const bodyPath = "M178 118 H422 L466 620 Q470 676 414 690 H186 Q130 676 134 620 Z";

  return `
    <g filter="url(#softShadow)">
      <path d="M168 98 H432 V124 H168 Z" fill="url(#capRidges)" opacity="0.9"/>
      <path d="${bodyPath}" fill="url(#blackMatte)" stroke="rgba(255,255,255,0.13)" stroke-width="1.4"/>
      <path d="M196 132 C178 238 168 420 186 624" stroke="rgba(255,255,255,0.16)" stroke-width="3" opacity="0.55"/>
      <path d="M405 132 C426 260 428 455 412 624" stroke="#3A86FF" stroke-width="5" opacity="0.24" filter="url(#blueBlur)"/>
      <path d="M152 620 H448 V704 H152 Z" fill="url(#baseBlack)" stroke="rgba(255,255,255,0.09)" stroke-width="1"/>
      <path d="M270 674 Q300 635 330 674 Z" fill="#020202" stroke="rgba(255,255,255,0.11)" stroke-width="1"/>
      <text x="300" y="208" text-anchor="middle" class="brand">BARE-X</text>
      <text x="300" y="${isSunscreen ? 282 : 292}" text-anchor="middle" class="${isSunscreen ? "spf" : "title"}">${xml(product.titleTop)}</text>
      <text x="300" y="${isSunscreen ? 330 : 326}" text-anchor="middle" class="accentTitle">${xml(product.titleAccent)}</text>
      <line x1="222" y1="368" x2="378" y2="368" stroke="#3A86FF" stroke-width="1.5" opacity="0.85"/>
      ${product.details
        .map(
          (line, index) =>
            `<text x="300" y="${420 + index * 28}" text-anchor="middle" class="detail">${xml(line)}</text>`
        )
        .join("")}
      <text x="300" y="508" text-anchor="middle" class="meta">${xml(product.meta)}</text>
      <text x="300" y="604" text-anchor="middle" class="size">${xml(product.size)}</text>
    </g>`;
}

function pumpProduct(product) {
  const bodyHeight = product.key === "bodyLotion" ? 455 : 405;
  const bodyY = product.key === "bodyLotion" ? 205 : 245;

  return `
    <g filter="url(#softShadow)">
      <path d="M270 118 H362 Q386 118 386 142 V160 H270 Z" fill="url(#pumpBlack)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <path d="M238 154 H372 Q394 154 394 180 V210 H238 Z" fill="url(#pumpBlack)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <path d="M362 128 H430 Q448 128 448 144 V154 H362 Z" fill="url(#pumpBlack)" opacity="0.95"/>
      <rect x="166" y="${bodyY}" width="268" height="${bodyHeight}" rx="46" fill="url(#blackMatte)" stroke="rgba(255,255,255,0.13)" stroke-width="1.4"/>
      <path d="M202 ${bodyY + 22} C188 ${bodyY + 120} 188 ${bodyY + bodyHeight - 70} 206 ${bodyY + bodyHeight - 22}" stroke="rgba(255,255,255,0.16)" stroke-width="3" opacity="0.55"/>
      <path d="M402 ${bodyY + 28} C420 ${bodyY + 130} 420 ${bodyY + bodyHeight - 80} 402 ${bodyY + bodyHeight - 22}" stroke="#3A86FF" stroke-width="5" opacity="0.24" filter="url(#blueBlur)"/>
      <text x="300" y="${bodyY + 94}" text-anchor="middle" class="brand">BARE-X</text>
      <text x="300" y="${bodyY + 168}" text-anchor="middle" class="title">${xml(product.titleTop)}</text>
      <text x="300" y="${bodyY + 204}" text-anchor="middle" class="accentTitle">${xml(product.titleAccent)}</text>
      <line x1="222" y1="${bodyY + 244}" x2="378" y2="${bodyY + 244}" stroke="#3A86FF" stroke-width="1.5" opacity="0.85"/>
      ${product.details
        .map(
          (line, index) =>
            `<text x="300" y="${bodyY + 294 + index * 28}" text-anchor="middle" class="detail">${xml(line)}</text>`
        )
        .join("")}
      <text x="300" y="${bodyY + 372}" text-anchor="middle" class="meta">${xml(product.meta)}</text>
      <text x="300" y="${bodyY + bodyHeight - 46}" text-anchor="middle" class="size">${xml(product.size)}</text>
    </g>`;
}

function bottleProduct(product) {
  return `
    <g filter="url(#softShadow)">
      <path d="M242 126 H358 Q376 126 376 146 V206 H224 V146 Q224 126 242 126 Z" fill="url(#pumpBlack)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <rect x="142" y="198" width="316" height="500" rx="58" fill="url(#blackMatte)" stroke="rgba(255,255,255,0.13)" stroke-width="1.4"/>
      <path d="M184 226 C162 350 162 540 186 664" stroke="rgba(255,255,255,0.16)" stroke-width="3" opacity="0.55"/>
      <path d="M424 230 C448 360 448 540 424 664" stroke="#3A86FF" stroke-width="5" opacity="0.24" filter="url(#blueBlur)"/>
      <text x="300" y="306" text-anchor="middle" class="brand">BARE-X</text>
      <text x="300" y="388" text-anchor="middle" class="title">${xml(product.titleTop)}</text>
      <text x="300" y="424" text-anchor="middle" class="accentTitle">${xml(product.titleAccent)}</text>
      <line x1="222" y1="466" x2="378" y2="466" stroke="#3A86FF" stroke-width="1.5" opacity="0.85"/>
      ${product.details
        .map(
          (line, index) =>
            `<text x="300" y="${520 + index * 28}" text-anchor="middle" class="detail">${xml(line)}</text>`
        )
        .join("")}
      <text x="300" y="608" text-anchor="middle" class="meta">${xml(product.meta)}</text>
      <text x="300" y="656" text-anchor="middle" class="size">${xml(product.size)}</text>
    </g>`;
}

function productShape(product) {
  if (product.shape === "pump") return pumpProduct(product);
  if (product.shape === "bottle") return bottleProduct(product);
  return tubeProduct(product);
}

function renderSvg(product) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#3A86FF" stop-opacity="0.82"/>
      <stop offset="38%" stop-color="#3A86FF" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#3A86FF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="blackMatte" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#242424"/>
      <stop offset="36%" stop-color="#0D0D0D"/>
      <stop offset="70%" stop-color="#050505"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
    <linearGradient id="baseBlack" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#111"/>
      <stop offset="100%" stop-color="#000"/>
    </linearGradient>
    <linearGradient id="pumpBlack" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2C2C2C"/>
      <stop offset="55%" stop-color="#070707"/>
      <stop offset="100%" stop-color="#000"/>
    </linearGradient>
    <pattern id="capRidges" width="8" height="26" patternUnits="userSpaceOnUse">
      <rect width="8" height="26" fill="#111"/>
      <rect width="2" height="26" fill="#383838"/>
    </pattern>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="42" stdDeviation="34" flood-color="#000" flood-opacity="0.72"/>
    </filter>
    <filter id="blueBlur" x="-200%" y="-200%" width="500%" height="500%">
      <feGaussianBlur stdDeviation="10"/>
    </filter>
    <style>
      .brand { font-family: Inter, Arial, sans-serif; font-size: 38px; font-weight: 800; letter-spacing: 5px; fill: #F7F7F7; }
      .title { font-family: Inter, Arial, sans-serif; font-size: 28px; font-weight: 650; letter-spacing: 0.5px; fill: #F4F4F4; }
      .accentTitle { font-family: Inter, Arial, sans-serif; font-size: 28px; font-weight: 750; letter-spacing: 0.5px; fill: #48A1FF; }
      .spf { font-family: Inter, Arial, sans-serif; font-size: 42px; font-weight: 850; letter-spacing: 4px; fill: #48A1FF; }
      .detail { font-family: Inter, Arial, sans-serif; font-size: 17px; font-weight: 550; letter-spacing: 0.2px; fill: #F2F2F2; }
      .meta { font-family: Inter, Arial, sans-serif; font-size: 15px; font-weight: 500; letter-spacing: 0.5px; fill: rgba(255,255,255,0.78); }
      .size { font-family: Inter, Arial, sans-serif; font-size: 20px; font-weight: 500; letter-spacing: 0.4px; fill: #F5F5F5; }
    </style>
  </defs>
  <rect width="1200" height="1200" fill="#050505"/>
  <rect width="1200" height="1200" fill="url(#grain)" opacity="0.12"/>
  <ellipse cx="600" cy="980" rx="430" ry="74" fill="url(#floorGlow)" opacity="0.92"/>
  <ellipse cx="600" cy="1008" rx="330" ry="24" fill="#061D37" opacity="0.7"/>
  <g transform="translate(300 170)">
    ${productShape(product)}
  </g>
</svg>`;
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });

  const generatedMap = {};
  for (const product of products) {
    const targetPath = path.join(outputDir, product.filename);
    await fs.writeFile(targetPath, renderSvg(product), "utf8");
    generatedMap[product.key] = `/mockups/generated/${product.filename}`;
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
      retinalSerum: null,
      bodyWash: null,
      bodyLotion: null,
      ...generatedMap
    },
    null,
    2
  )} as const;\n`;

  await fs.writeFile(generatedModulePath, source, "utf8");
  console.log(`Updated ${generatedModulePath}`);
  console.log("Packaging assets are deterministic SVG files with exact labels.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
