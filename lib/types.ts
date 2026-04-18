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
  skinType: SkinType;
  concerns: Concern[];
  acneSeverity: AcneSeverity;
  oilLevel: OilLevel;
  sensitivity: SensitivityAnswer;
  lifestyle: LifestyleHabit[];
  currentRoutine: RoutineLevel;
  gender: Gender;
};

export type SkinScore = {
  acneRisk: number;
  oilLevel: number;
  hydration: number;
  sensitivity: number;
};

export type ProductCategory = "Face Wash" | "Moisturizer" | "Sunscreen";

export type ProductRecommendation = {
  category: ProductCategory;
  name: string;
  subtitle: string;
  ingredients: string[];
  reason: string;
};

export type AnalysisPayload = {
  answers: QuizAnswers;
  skinScore: SkinScore;
  routine: ProductRecommendation[];
  explanation: string;
  profile: string[];
  quizResponseId?: string;
};
