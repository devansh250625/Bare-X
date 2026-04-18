export type SkinType = "Oily" | "Dry" | "Combination" | "Sensitive";
export type Concern =
  | "Acne"
  | "Pigmentation"
  | "Dullness"
  | "Oiliness"
  | "Dryness"
  | "Dark spots";
export type AcneSeverity = "None" | "Mild" | "Moderate" | "Severe";
export type OilLevel = "Low" | "Medium" | "High";
export type SensitivityAnswer = "Yes" | "No";
export type LifestyleHabit =
  | "Sleeps late"
  | "Works outdoors"
  | "Gym regularly"
  | "High stress";
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

export type ProductCategory =
  | "Face Wash"
  | "Treatment"
  | "Moisturizer"
  | "Sunscreen"
  | "Body Wash"
  | "Body Lotion";
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

export type AnalysisPayload = {
  answers: QuizAnswers;
  skinScore: SkinScore;
  formulas: FormulaRecommendation[];
  routine: ProductRecommendation[];
  explanation: string;
  profile: string[];
  quizResponseId?: string;
};
