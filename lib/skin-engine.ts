import { defaultAnswers, skinSystems, universalSunscreen } from "@/lib/constants";
import {
  AnalysisPayload,
  QuizAnswers,
  SkinInterpretation,
  SkinScore,
  SkinSystem,
  SystemProduct
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

/* ── Skin Score ── */

export function calculateSkinScore(rawAnswers: Partial<QuizAnswers>): SkinScore {
  const a = normalizeAnswers(rawAnswers);
  let acneRisk = 1, oilLevel = 4, hydration = 6, sensitivity = 3;

  const acneBoost = { None: 0, Mild: 3, Moderate: 6, Severe: 8 }[a.acneSeverity || "None"];
  const oilBase = { Low: 3, Medium: 6, High: 9 }[a.oilLevel || "Medium"];
  acneRisk += acneBoost;
  oilLevel = oilBase;

  if (a.concerns.includes("Acne")) acneRisk += 1;
  if (a.concerns.includes("Oiliness")) oilLevel += 1;
  if (a.concerns.includes("Dryness")) hydration -= 2;
  if (a.concerns.includes("Dullness")) hydration -= 1;
  if (a.concerns.includes("Pigmentation")) sensitivity += 1;
  if (a.concerns.includes("Dark spots")) sensitivity += 1;

  if (a.skinType === "Oily") { oilLevel += 1; hydration -= 1; }
  if (a.skinType === "Dry") { hydration -= 3; oilLevel -= 2; }
  if (a.skinType === "Combination") { oilLevel += 1; }
  if (a.skinType === "Sensitive") { sensitivity += 3; hydration -= 1; }
  if (a.sensitivity === "Yes") sensitivity += 3;

  if (a.lifestyle.includes("Sleeps late")) { hydration -= 1; acneRisk += 1; }
  if (a.lifestyle.includes("Works outdoors")) { sensitivity += 1; hydration -= 1; }
  if (a.lifestyle.includes("Gym regularly")) { acneRisk += 1; oilLevel += 1; }
  if (a.lifestyle.includes("High stress")) { acneRisk += 1; sensitivity += 1; }
  if (a.currentRoutine === "None") hydration -= 1;
  if (a.currentRoutine === "Advanced") hydration += 1;

  return {
    acneRisk: clamp(acneRisk, 0, 10),
    oilLevel: clamp(oilLevel, 0, 10),
    hydration: clamp(hydration, 0, 10),
    sensitivity: clamp(sensitivity, 0, 10)
  };
}

/* ── Composite Score (0-100) ── */

export function calculateCompositeScore(score: SkinScore): number {
  return clamp(
    Math.round(
      ((10 - score.acneRisk) +
        (10 - Math.abs(score.oilLevel - 5)) +
        score.hydration +
        (10 - score.sensitivity)) * 2.5
    ),
    0, 100
  );
}

/* ── Skin Age ── */

export function calculateSkinAge(answers: QuizAnswers, score: SkinScore): number {
  // Base age range 22-35, adjusted by skin health
  let skinAge = 25;

  // Poor hydration ages skin
  if (score.hydration <= 3) skinAge += 5;
  else if (score.hydration <= 5) skinAge += 2;

  // High acne risk adds perceived age
  if (score.acneRisk >= 8) skinAge += 3;
  else if (score.acneRisk >= 5) skinAge += 1;

  // Sensitivity adds wear
  if (score.sensitivity >= 7) skinAge += 2;

  // No routine adds age
  if (answers.currentRoutine === "None") skinAge += 3;
  else if (answers.currentRoutine === "Advanced") skinAge -= 2;

  // Lifestyle factors
  if (answers.lifestyle.includes("Sleeps late")) skinAge += 2;
  if (answers.lifestyle.includes("Works outdoors")) skinAge += 2;
  if (answers.lifestyle.includes("High stress")) skinAge += 1;
  if (answers.lifestyle.includes("Gym regularly")) skinAge -= 1;

  return clamp(skinAge, 18, 45);
}

/* ── Routine Score (0-100) ── */

export function calculateRoutineScore(answers: QuizAnswers): number {
  let score = 0;

  if (answers.currentRoutine === "None") score = 15;
  else if (answers.currentRoutine === "Basic") score = 45;
  else score = 72;

  // Penalties
  if (answers.lifestyle.includes("Sleeps late")) score -= 8;
  if (answers.lifestyle.includes("High stress")) score -= 5;
  if (answers.concerns.length >= 3) score -= 10;

  // Bonuses
  if (answers.lifestyle.includes("Gym regularly")) score += 5;

  return clamp(score, 5, 100);
}

/* ── Skin Profile Tags ── */

export function buildSkinProfile(answers: QuizAnswers, score: SkinScore): string[] {
  const profile: string[] = [];
  if (score.acneRisk >= 7) profile.push("Breakout-prone");
  if (score.oilLevel >= 7) profile.push("High sebum output");
  if (score.hydration <= 4) profile.push("Dehydrated barrier");
  if (score.sensitivity >= 6) profile.push("Reactive skin");
  if (answers.concerns.includes("Pigmentation") || answers.concerns.includes("Dark spots")) {
    profile.push("Tone correction focus");
  }
  if (profile.length === 0) profile.push("Balanced skin profile");
  return profile;
}

/* ── Interpretation ── */

export function buildInterpretation(answers: QuizAnswers, score: SkinScore): SkinInterpretation {
  const means: string[] = [];
  const ignored: string[] = [];

  if (score.acneRisk >= 7) {
    means.push("Your skin has significant pore congestion and inflammation markers. Breakouts are likely recurring, not random.");
    ignored.push("Untreated acne leads to post-inflammatory hyperpigmentation, scarring, and permanent texture damage.");
  } else if (score.acneRisk >= 4) {
    means.push("Mild to moderate breakout tendency — your skin is reactive to oil and bacteria buildup.");
    ignored.push("Without proper cleansing, mild acne can escalate to cystic breakouts over time.");
  }

  if (score.oilLevel >= 7) {
    means.push("Excess sebum production is causing shine, enlarged pores, and creating an environment for bacteria.");
    ignored.push("Chronic oiliness without treatment leads to persistent blackheads and congested pores.");
  }

  if (score.hydration <= 4) {
    means.push("Your skin barrier is compromised — it's losing moisture faster than it can retain it.");
    ignored.push("A damaged moisture barrier accelerates aging, increases sensitivity, and makes every product sting.");
  }

  if (score.sensitivity >= 6) {
    means.push("Your skin's protective barrier is thin or weakened, making it hyper-reactive to environmental triggers.");
    ignored.push("Ignoring sensitivity leads to chronic redness, rosacea-like symptoms, and product intolerance.");
  }

  if (answers.currentRoutine === "None") {
    means.push("Without any routine, your skin lacks the daily defense it needs against pollution, UV, and natural oil buildup.");
    ignored.push("Every year without proper skincare adds visible aging that becomes harder to reverse.");
  }

  if (means.length === 0) {
    means.push("Your skin is in a relatively balanced state. A targeted system will help maintain and improve what you have.");
  }
  if (ignored.length === 0) {
    ignored.push("Even balanced skin deteriorates without consistent care — prevention is easier than correction.");
  }

  const composite = calculateCompositeScore(score);
  const summary = composite >= 70
    ? "Your skin is in good shape, but there's room to optimize."
    : composite >= 45
      ? "Your skin needs targeted intervention — the right system can make a visible difference in 4-6 weeks."
      : "Your skin is under significant stress. A structured, science-backed routine is critical right now.";

  return { summary, whatThisMeans: means, whatHappensIfIgnored: ignored };
}

/* ── System Assignment ── */

export function assignSystem(answers: QuizAnswers, score: SkinScore): SkinSystem {
  // Deep copy to avoid mutating constants
  const clone = (sys: SkinSystem): SkinSystem => JSON.parse(JSON.stringify(sys));

  // Acne-dominant profile
  if (
    score.acneRisk >= 6 ||
    answers.concerns.includes("Acne") ||
    answers.acneSeverity === "Moderate" ||
    answers.acneSeverity === "Severe"
  ) {
    const system = clone(skinSystems["acne-control"]);
    system.products[0].aiReason = `Selected based on your ${answers.acneSeverity?.toLowerCase() || "elevated"} acne severity and ${score.oilLevel >= 6 ? "high" : "moderate"} oil levels. Salicylic Acid helps unclog pores, while Niacinamide reduces the inflammation causing your breakouts.`;
    system.products[1].aiReason = `Your skin needs hydration without triggering more breakouts. This oil-free formula provides barrier repair with Ceramides while keeping pores clear.`;
    return system;
  }

  // Oil-dominant profile
  if (
    score.oilLevel >= 6 ||
    answers.skinType === "Oily" ||
    answers.skinType === "Combination" ||
    answers.concerns.includes("Oiliness")
  ) {
    const system = clone(skinSystems["oil-balance"]);
    system.products[0].aiReason = `Your ${answers.skinType?.toLowerCase()} skin type and ${score.oilLevel >= 7 ? "high" : "moderate"} oil production need targeted sebum regulation. Niacinamide 3% controls shine without the tight, dry feeling of harsh cleansers.`;
    system.products[1].aiReason = `Oily skin still needs hydration — skipping moisturizer actually makes oil production worse. This lightweight gel hydrates without adding shine.`;
    return system;
  }

  // Hydration profile (default)
  const system = clone(skinSystems["hydration"]);
  system.products[0].aiReason = `Your ${answers.skinType?.toLowerCase() || "dry"} skin with ${score.hydration <= 4 ? "critically low" : "below-optimal"} hydration levels needs gentle cleansing that preserves moisture. Harsh surfactants would worsen the tightness and flaking.`;
  system.products[1].aiReason = `Your dehydrated barrier needs deep repair. Ceramides rebuild the protective layer, Hyaluronic Acid pulls in moisture, and Squalane locks it in — addressing the root cause of dryness.`;
  return system;
}

/* ── Main Payload Builder ── */

export function createAnalysisPayload(rawAnswers: Partial<QuizAnswers>): AnalysisPayload {
  const answers = normalizeAnswers(rawAnswers);
  const skinScore = calculateSkinScore(answers);
  const compositeScore = calculateCompositeScore(skinScore);
  const skinAge = calculateSkinAge(answers, skinScore);
  const routineScore = calculateRoutineScore(answers);
  const interpretation = buildInterpretation(answers, skinScore);
  const assignedSystem = assignSystem(answers, skinScore);
  const profile = buildSkinProfile(answers, skinScore);

  const sunscreen: SystemProduct = {
    ...universalSunscreen,
    aiReason: universalSunscreen.aiReason
  };

  const explanation = interpretation.summary;

  return {
    answers,
    skinScore,
    compositeScore,
    skinAge,
    routineScore,
    interpretation,
    assignedSystem,
    sunscreen,
    profile,
    explanation,
  };
}

/* ── Legacy compat ── */

export function createFallbackExplanation(answers: QuizAnswers, score: SkinScore): string {
  const profile = buildSkinProfile(answers, score);
  return `Your Bare-X analysis shows ${profile.join(", ").toLowerCase()}. We prioritized a routine that lowers breakout pressure, protects hydration, and keeps daily irritation low based on your reported skin type, concern mix, and lifestyle triggers.`;
}
