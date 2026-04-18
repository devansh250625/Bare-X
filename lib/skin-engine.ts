import { defaultAnswers, productCatalog } from "@/lib/constants";
import {
  AnalysisPayload,
  ProductRecommendation,
  QuizAnswers,
  SkinScore
} from "@/lib/types";
import { clamp } from "@/lib/utils";

export function normalizeAnswers(input: Partial<QuizAnswers>): QuizAnswers {
  return {
    ...defaultAnswers,
    ...input,
    concerns: input.concerns ?? defaultAnswers.concerns,
    lifestyle: input.lifestyle ?? defaultAnswers.lifestyle
  };
}

export function calculateSkinScore(rawAnswers: Partial<QuizAnswers>): SkinScore {
  const answers = normalizeAnswers(rawAnswers);

  let acneRisk = 1;
  let oilLevel = 4;
  let hydration = 6;
  let sensitivity = 3;

  const acneSeverityBoost = {
    None: 0,
    Mild: 3,
    Moderate: 6,
    Severe: 8
  }[answers.acneSeverity];

  const oilLevelBase = {
    Low: 3,
    Medium: 6,
    High: 9
  }[answers.oilLevel];

  acneRisk += acneSeverityBoost;
  oilLevel = oilLevelBase;

  if (answers.concerns.includes("Acne")) acneRisk += 1;
  if (answers.concerns.includes("Oiliness")) oilLevel += 1;
  if (answers.concerns.includes("Dryness")) hydration -= 2;
  if (answers.concerns.includes("Dullness")) hydration -= 1;
  if (answers.concerns.includes("Pigmentation")) sensitivity += 1;
  if (answers.concerns.includes("Dark spots")) sensitivity += 1;

  if (answers.skinType === "Oily") {
    oilLevel += 1;
    hydration -= 1;
  }

  if (answers.skinType === "Dry") {
    hydration -= 3;
    oilLevel -= 2;
  }

  if (answers.skinType === "Combination") {
    oilLevel += 1;
  }

  if (answers.skinType === "Sensitive") {
    sensitivity += 3;
    hydration -= 1;
  }

  if (answers.sensitivity === "Yes") {
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

  if (answers.currentRoutine === "None") {
    hydration -= 1;
  }

  if (answers.currentRoutine === "Advanced") {
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
  let faceWash = productCatalog.oilControlFaceWash;

  if (answers.sensitivity === "Yes" || answers.skinType === "Sensitive" || score.sensitivity >= 7) {
    faceWash = productCatalog.sensitiveFaceWash;
  } else if (answers.concerns.includes("Dryness") || answers.skinType === "Dry" || score.hydration <= 4) {
    faceWash = productCatalog.hydratingFaceWash;
  } else if (
    answers.concerns.includes("Acne") ||
    answers.acneSeverity === "Moderate" ||
    answers.acneSeverity === "Severe" ||
    (score.acneRisk >= 7 && score.oilLevel >= 7)
  ) {
    faceWash = productCatalog.acneFaceWash;
  } else if (answers.oilLevel === "High" || score.oilLevel >= 7) {
    faceWash = productCatalog.oilControlFaceWash;
  }

  const moisturizer =
    answers.skinType === "Dry" || answers.concerns.includes("Dryness") || score.hydration <= 5
      ? productCatalog.creamMoisturizer
      : productCatalog.gelMoisturizer;

  const audience =
    answers.gender === "Male" ? "MEN" : answers.gender === "Female" ? "WOMEN" : "ALL";

  return [faceWash, moisturizer, productCatalog.sunscreen].map((product) => ({
    ...product,
    audience: product.category === "Sunscreen" ? "ALL" : audience
  }));
}

export function createFallbackExplanation(answers: QuizAnswers, score: SkinScore) {
  const profile = buildSkinProfile(answers, score);
  return `Your Bare-X analysis shows ${profile.join(", ").toLowerCase()}. We prioritized a routine that lowers breakout pressure, protects hydration, and keeps daily irritation low based on your reported skin type, concern mix, and lifestyle triggers.`;
}

export function createAnalysisPayload(rawAnswers: Partial<QuizAnswers>): AnalysisPayload {
  const answers = normalizeAnswers(rawAnswers);
  const skinScore = calculateSkinScore(answers);
  const routine = mapRoutine(answers, skinScore);
  const profile = buildSkinProfile(answers, skinScore);

  return {
    answers,
    skinScore,
    routine,
    explanation: createFallbackExplanation(answers, skinScore),
    profile
  };
}
