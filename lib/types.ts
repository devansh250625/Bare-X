export type SkinType = "Oily" | "Dry" | "Combination" | "Sensitive";
export type Concern = "Acne" | "Pigmentation" | "Dullness" | "Oiliness" | "Dryness" | "Dark spots";
export type AcneSeverity = "None" | "Mild" | "Moderate" | "Severe";
export type OilLevel = "Low" | "Medium" | "High";
export type SensitivityAnswer = "Yes" | "No";
export type LifestyleHabit = "Sleeps late" | "Works outdoors" | "Gym regularly" | "High stress";
export type RoutineLevel = "None" | "Basic" | "Advanced";
export type Gender = "Male" | "Female" | "Prefer not to say";

export type QuizAnswers = {
  skinType: SkinType | "";
  concerns: Concern[];
  acneSeverity: AcneSeverity | "";
  oilLevel: OilLevel | "";
  sensitivity: SensitivityAnswer | "";
  lifestyle: LifestyleHabit[];
  currentRoutine: RoutineLevel | "";
  gender: Gender | "";
};

export type SkinScore = {
  acneRisk: number;
  oilLevel: number;
  hydration: number;
  sensitivity: number;
};

/* ── Product System ── */

export type SystemId = "acne-control" | "oil-balance" | "hydration";

export type SystemProduct = {
  name: string;
  type: "Face Wash" | "Moisturizer" | "Cleanser" | "Gel" | "Sunscreen";
  subtitle: string;
  format: string;
  size: string;
  keyIngredients: { name: string; concentration?: string; role: string }[];
  aiReason: string; // dynamically set by engine
};

export type SkinSystem = {
  id: SystemId;
  name: string;
  tagline: string;
  forWhom: string;
  products: SystemProduct[];
};

export type SkinInterpretation = {
  summary: string;
  whatThisMeans: string[];
  whatHappensIfIgnored: string[];
};

export type AnalysisPayload = {
  answers: QuizAnswers;
  skinScore: SkinScore;
  compositeScore: number;
  skinAge: number;
  routineScore: number;
  interpretation: SkinInterpretation;
  assignedSystem: SkinSystem;
  sunscreen: SystemProduct;
  profile: string[];
  explanation: string;
  quizResponseId?: string;
  // Keep legacy fields for backward compat
  formulas?: FormulaRecommendation[];
  routine?: ProductRecommendation[];
};

/* ── Legacy types (kept for existing components) ── */

export type ProductCategory = "Face Wash" | "Treatment" | "Moisturizer" | "Sunscreen" | "Body Wash" | "Body Lotion";
export type ProductAudience = "MEN" | "WOMEN" | "ALL";

export type ProductRecommendation = {
  assetKey: string;
  category: ProductCategory;
  name: string;
  subtitle: string;
  ingredients: string[];
  reason: string;
  audience: ProductAudience;
  format: string;
  useTime: "AM" | "PM" | "AM / PM";
  size: string;
  accent: string;
  finish: string;
  formulaFocus: string[];
  launchStatus: "planned" | "inDevelopment";
};

export type FormulaRecommendation = {
  category: "Face Wash" | "Treatment" | "Moisturizer" | "Sunscreen" | "Body Wash" | "Body Lotion";
  title: string;
  ingredients: string[];
  concentration: string;
  why: string;
  usage: string;
};
