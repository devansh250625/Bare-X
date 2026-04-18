import { defaultAnswers, productCatalog } from "@/lib/constants";
import {
  AnalysisPayload,
  FormulaRecommendation,
  ProductRecommendation,
  QuizAnswers,
  SkinScore
} from "@/lib/types";
import { clamp } from "@/lib/utils";

export function normalizeAnswers(input: Partial<QuizAnswers>): QuizAnswers {
  return {
    skinType: input.skinType || "Combination",
    concerns: input.concerns ?? defaultAnswers.concerns,
    acneSeverity: input.acneSeverity || "None",
    oilLevel: input.oilLevel || "Medium",
    sensitivity: input.sensitivity || "No",
    lifestyle: input.lifestyle ?? defaultAnswers.lifestyle,
    currentRoutine: input.currentRoutine || "None",
    gender: input.gender || "Prefer not to say"
  };
}

export function calculateSkinScore(rawAnswers: Partial<QuizAnswers>): SkinScore {
  const answers = normalizeAnswers(rawAnswers);

  let acneRisk = 1;
  let oilLevel = 4;
  let hydration = 6;
  let sensitivity = 3;
  const acneSeverity = answers.acneSeverity || "None";
  const reportedOilLevel = answers.oilLevel || "Medium";
  const skinType = answers.skinType || "Combination";
  const sensitivityAnswer = answers.sensitivity || "No";
  const currentRoutine = answers.currentRoutine || "None";

  const acneSeverityBoost = {
    None: 0,
    Mild: 3,
    Moderate: 6,
    Severe: 8
  }[acneSeverity];

  const oilLevelBase = {
    Low: 3,
    Medium: 6,
    High: 9
  }[reportedOilLevel];

  acneRisk += acneSeverityBoost;
  oilLevel = oilLevelBase;

  if (answers.concerns.includes("Acne")) acneRisk += 1;
  if (answers.concerns.includes("Oiliness")) oilLevel += 1;
  if (answers.concerns.includes("Dryness")) hydration -= 2;
  if (answers.concerns.includes("Dullness")) hydration -= 1;
  if (answers.concerns.includes("Pigmentation")) sensitivity += 1;
  if (answers.concerns.includes("Dark spots")) sensitivity += 1;

  if (skinType === "Oily") {
    oilLevel += 1;
    hydration -= 1;
  }

  if (skinType === "Dry") {
    hydration -= 3;
    oilLevel -= 2;
  }

  if (skinType === "Combination") {
    oilLevel += 1;
  }

  if (skinType === "Sensitive") {
    sensitivity += 3;
    hydration -= 1;
  }

  if (sensitivityAnswer === "Yes") {
    sensitivity += 3;
  }

  if (answers.lifestyle.includes("Sleeps late")) {
    hydration -= 1;
    acneRisk += 1;
  }

  if (answers.lifestyle.includes("Works outdoors")) {
    sensitivity += 1;
    hydration -= 1;
  }

  if (answers.lifestyle.includes("Gym regularly")) {
    acneRisk += 1;
    oilLevel += 1;
  }

  if (answers.lifestyle.includes("High stress")) {
    acneRisk += 1;
    sensitivity += 1;
  }

  if (currentRoutine === "None") {
    hydration -= 1;
  }

  if (currentRoutine === "Advanced") {
    hydration += 1;
  }

  return {
    acneRisk: clamp(acneRisk, 0, 10),
    oilLevel: clamp(oilLevel, 0, 10),
    hydration: clamp(hydration, 0, 10),
    sensitivity: clamp(sensitivity, 0, 10)
  };
}

export function buildSkinProfile(answers: QuizAnswers, score: SkinScore) {
  const profile: string[] = [];

  if (score.acneRisk >= 7) profile.push("Breakout-prone");
  if (score.oilLevel >= 7) profile.push("High sebum output");
  if (score.hydration <= 4) profile.push("Dehydrated barrier");
  if (score.sensitivity >= 6) profile.push("Reactive skin");
  if (answers.concerns.includes("Pigmentation") || answers.concerns.includes("Dark spots")) {
    profile.push("Tone correction focus");
  }

  if (profile.length === 0) {
    profile.push("Balanced skin profile");
  }

  return profile;
}

export function mapRoutine(
  answers: QuizAnswers,
  score: SkinScore
): ProductRecommendation[] {
  let faceWash = productCatalog.hydratingFaceWash;

  if (answers.concerns.includes("Dryness") || answers.skinType === "Dry" || score.hydration <= 4) {
    faceWash = productCatalog.hydratingFaceWash;
  } else if (
    answers.concerns.includes("Acne") ||
    answers.acneSeverity === "Moderate" ||
    answers.acneSeverity === "Severe" ||
    (score.acneRisk >= 7 && score.oilLevel >= 7)
  ) {
    faceWash = productCatalog.acneFaceWash;
  }

  const moisturizer = productCatalog.gelMoisturizer;

  const audience =
    answers.gender === "Male" ? "MEN" : answers.gender === "Female" ? "WOMEN" : "ALL";

  const bodyProduct =
    answers.lifestyle.includes("Gym regularly") || answers.lifestyle.includes("Works outdoors")
      ? productCatalog.bodyWash
      : productCatalog.bodyLotion;

  const products = [faceWash, moisturizer, productCatalog.sunscreen, bodyProduct];

  return products.map((product) => ({
    ...product,
    audience:
      product.category === "Sunscreen" ||
      product.category === "Body Wash" ||
      product.category === "Body Lotion"
        ? "ALL"
        : audience
  }));
}

export function buildFormulaPlan(
  answers: QuizAnswers,
  score: SkinScore
): FormulaRecommendation[] {
  const formulas: FormulaRecommendation[] = [];

  if (score.acneRisk >= 6 || answers.concerns.includes("Acne")) {
    formulas.push({
      category: "Face Wash",
      title: "Breakout-control cleanser formula",
      ingredients: ["Salicylic Acid", "Niacinamide", "Panthenol"],
      concentration: "Salicylic Acid 0.5-2% + Niacinamide 2-5%",
      why: "Helps reduce pore congestion and excess oil while keeping the barrier calmer than harsh stripping cleansers.",
      usage: "Use once daily first, then increase to twice daily only if your skin stays comfortable."
    });
  } else if (score.hydration <= 5 || answers.skinType === "Dry") {
    formulas.push({
      category: "Face Wash",
      title: "Barrier-safe hydrating cleanser formula",
      ingredients: ["Glycerin", "Hyaluronic Acid", "Ceramides"],
      concentration: "Low-foam cleanser with humectants and barrier lipids",
      why: "Supports cleansing without the tight, dry feeling that often worsens dullness and irritation.",
      usage: "Use morning and night. Avoid squeaky-clean cleansers."
    });
  } else {
    formulas.push({
      category: "Face Wash",
      title: "Oil-balanced daily cleanser formula",
      ingredients: ["Niacinamide", "Zinc PCA", "Amino Surfactants"],
      concentration: "Niacinamide 2-5% + Zinc PCA",
      why: "A balanced option for shine control, texture, and daily maintenance without over-exfoliation.",
      usage: "Use twice daily if tolerated."
    });
  }

  if (
    answers.concerns.includes("Pigmentation") ||
    answers.concerns.includes("Dark spots") ||
    answers.concerns.includes("Dullness")
  ) {
    formulas.push({
      category: "Treatment",
      title: "Tone and texture treatment formula",
      ingredients: ["Encapsulated Retinal", "Peptides", "Bisabolol"],
      concentration: "Retinal 0.03-0.05% starter range",
      why: "Targets uneven tone and texture gradually while using soothing support ingredients to reduce irritation risk.",
      usage: "Use at night 2-3 times weekly. Do not combine with strong exfoliants at first."
    });
  }

  formulas.push({
    category: "Moisturizer",
    title:
      score.oilLevel >= 7
        ? "Oil-free hydration formula"
        : "Barrier-repair moisturizer formula",
    ingredients:
      score.oilLevel >= 7
        ? ["Hyaluronic Acid", "Ceramides", "Niacinamide"]
        : ["Ceramides", "Squalane", "Glycerin"],
    concentration:
      score.oilLevel >= 7
        ? "Light gel-cream with humectants and barrier support"
        : "Cream moisturizer with ceramide barrier support",
    why:
      score.oilLevel >= 7
        ? "Hydrates without a heavy film, which is important for oily and breakout-prone skin."
        : "Supports a stronger moisture barrier and reduces dry, tight, reactive skin feel.",
    usage: "Apply after cleansing. Use more at night if skin feels tight."
  });

  formulas.push({
    category: "Sunscreen",
    title: "Daily broad-spectrum SPF formula",
    ingredients: ["SPF 50", "No White Cast", "Vitamin E"],
    concentration: "Broad-spectrum SPF 50",
    why: "The most important daily step for dark spots, pigmentation, irritation recovery, and long-term skin quality.",
    usage: "Use every morning as the final step. Reapply outdoors."
  });

  if (answers.lifestyle.includes("Gym regularly") || answers.lifestyle.includes("Works outdoors")) {
    formulas.push({
      category: "Body Wash",
      title: "Sweat and body-breakout wash formula",
      ingredients: ["Salicylic Acid", "Zinc PCA", "Tea Tree"],
      concentration: "Salicylic Acid 1-2% body wash",
      why: "Useful for back, chest, and shoulder congestion caused by sweat, friction, and outdoor exposure.",
      usage: "Use on body only. Rinse well and moisturize after."
    });
  } else {
    formulas.push({
      category: "Body Lotion",
      title: "Body texture repair lotion formula",
      ingredients: ["Urea", "Lactic Acid", "Ceramides"],
      concentration: "Urea 5% + gentle exfoliating support",
      why: "Helps rough body texture and dryness while supporting the body skin barrier.",
      usage: "Use after showering, especially on arms, legs, and rough areas."
    });
  }

  return formulas;
}

export function createFallbackExplanation(answers: QuizAnswers, score: SkinScore) {
  const profile = buildSkinProfile(answers, score);
  return `Your Bare-X analysis shows ${profile.join(", ").toLowerCase()}. We prioritized a routine that lowers breakout pressure, protects hydration, and keeps daily irritation low based on your reported skin type, concern mix, and lifestyle triggers.`;
}

export function createAnalysisPayload(rawAnswers: Partial<QuizAnswers>): AnalysisPayload {
  const answers = normalizeAnswers(rawAnswers);
  const skinScore = calculateSkinScore(answers);
  const formulas = buildFormulaPlan(answers, skinScore);
  const routine = mapRoutine(answers, skinScore);
  const profile = buildSkinProfile(answers, skinScore);

  return {
    answers,
    skinScore,
    formulas,
    routine,
    explanation: createFallbackExplanation(answers, skinScore),
    profile
  };
}
