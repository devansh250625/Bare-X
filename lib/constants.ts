import { Concern, LifestyleHabit, ProductRecommendation, QuizAnswers } from "@/lib/types";

export const quizQuestions = [
  {
    key: "skinType",
    step: "Skin Type",
    prompt: "How would you describe your skin most days?",
    type: "single",
    options: ["Oily", "Dry", "Combination", "Sensitive"]
  },
  {
    key: "concerns",
    step: "Main Concerns",
    prompt: "Choose the concerns you want Bare-X to optimize for.",
    type: "multi",
    options: ["Acne", "Pigmentation", "Dullness", "Oiliness", "Dryness", "Dark spots"]
  },
  {
    key: "acneSeverity",
    step: "Acne Severity",
    prompt: "What level of breakouts are you dealing with right now?",
    type: "single",
    options: ["None", "Mild", "Moderate", "Severe"]
  },
  {
    key: "oilLevel",
    step: "Oil Level",
    prompt: "How oily does your skin feel by midday?",
    type: "single",
    options: ["Low", "Medium", "High"]
  },
  {
    key: "sensitivity",
    step: "Sensitivity",
    prompt: "Does your skin react easily to new products or weather changes?",
    type: "single",
    options: ["Yes", "No"]
  },
  {
    key: "lifestyle",
    step: "Lifestyle",
    prompt: "Select the habits that shape your skin environment.",
    type: "multi",
    options: ["Sleeps late", "Works outdoors", "Gym regularly", "High stress"]
  },
  {
    key: "currentRoutine",
    step: "Current Routine",
    prompt: "How developed is your skincare routine today?",
    type: "single",
    options: ["None", "Basic", "Advanced"]
  },
  {
    key: "gender",
    step: "Gender",
    prompt: "This helps us adapt tone and recommendations, not eligibility.",
    type: "single",
    options: ["Male", "Female", "Prefer not to say"]
  }
] as const;

export const defaultAnswers: QuizAnswers = {
  skinType: "Combination",
  concerns: [],
  acneSeverity: "None",
  oilLevel: "Medium",
  sensitivity: "No",
  lifestyle: [],
  currentRoutine: "None",
  gender: "Male"
};

export const productCatalog: Record<string, ProductRecommendation> = {
  acneFaceWash: {
    category: "Face Wash",
    name: "Acne Control Cleanser",
    subtitle: "Purifying gel cleanser",
    ingredients: ["Salicylic Acid", "Green Tea", "Panthenol"],
    reason: "Selected to reduce pore congestion and lower breakout pressure without stripping the barrier.",
    audience: "MEN",
    format: "Gel Tube",
    useTime: "AM / PM",
    size: "120 ML",
    accent: "from-cyan-400 via-blue-500 to-indigo-400",
    finish: "Carbon matte"
  },
  hydratingFaceWash: {
    category: "Face Wash",
    name: "Hydrating Cloud Cleanser",
    subtitle: "Low-foam comfort cleanser",
    ingredients: ["Hyaluronic Acid", "Glycerin", "Betaine"],
    reason: "Chosen to clean gently while reinforcing water retention for tight or flaky skin.",
    audience: "WOMEN",
    format: "Soft Cream Tube",
    useTime: "AM / PM",
    size: "120 ML",
    accent: "from-sky-300 via-cyan-400 to-blue-500",
    finish: "Satin frost"
  },
  oilControlFaceWash: {
    category: "Face Wash",
    name: "Oil Control Reset Wash",
    subtitle: "Balancing gel cleanser",
    ingredients: ["Niacinamide", "Zinc PCA", "Amino Surfactants"],
    reason: "Built for shine control and texture refinement when sebum levels run high.",
    audience: "MEN",
    format: "Gel Tube",
    useTime: "AM / PM",
    size: "120 ML",
    accent: "from-blue-500 via-indigo-500 to-cyan-300",
    finish: "Graphite matte"
  },
  sensitiveFaceWash: {
    category: "Face Wash",
    name: "Barrier Calm Cleanser",
    subtitle: "Fragrance-free milky cleanser",
    ingredients: ["Aloe Vera", "Ceramides", "Oat Extract"],
    reason: "Recommended to minimize reactivity and preserve barrier comfort for easily irritated skin.",
    audience: "WOMEN",
    format: "Milky Tube",
    useTime: "AM / PM",
    size: "120 ML",
    accent: "from-cyan-200 via-sky-300 to-blue-400",
    finish: "Soft-touch matte"
  },
  gelMoisturizer: {
    category: "Moisturizer",
    name: "Weightless Gel Hydrator",
    subtitle: "Fast-absorbing daily moisturizer",
    ingredients: ["Hyaluronic Acid", "Niacinamide", "Squalane"],
    reason: "Matched to oil-prone profiles needing hydration without heaviness or greasy residue.",
    audience: "MEN",
    format: "Airless Pump",
    useTime: "AM / PM",
    size: "50 ML",
    accent: "from-cyan-300 via-blue-500 to-indigo-500",
    finish: "Obsidian gloss"
  },
  creamMoisturizer: {
    category: "Moisturizer",
    name: "Recovery Cream Moisturizer",
    subtitle: "Barrier-repair moisturizer",
    ingredients: ["Ceramides", "Shea Butter", "Cholesterol"],
    reason: "Selected to restore comfort and prevent moisture loss in dry or compromised skin.",
    audience: "WOMEN",
    format: "Airless Pump",
    useTime: "AM / PM",
    size: "50 ML",
    accent: "from-blue-400 via-sky-300 to-cyan-200",
    finish: "Pearl matte"
  },
  sunscreen: {
    category: "Sunscreen",
    name: "Invisible Shield SPF 50",
    subtitle: "Daily broad-spectrum sunscreen",
    ingredients: ["SPF 50 Filters", "Vitamin E", "Antioxidant Complex"],
    reason: "Every routine includes broad-spectrum SPF because pigmentation, sensitivity, and aging all worsen without daily UV defense.",
    audience: "ALL",
    format: "Precision Tube",
    useTime: "AM",
    size: "60 ML",
    accent: "from-white via-sky-300 to-blue-500",
    finish: "Titanium satin"
  }
};

export const concernLabels: Concern[] = [
  "Acne",
  "Pigmentation",
  "Dullness",
  "Oiliness",
  "Dryness",
  "Dark spots"
];

export const lifestyleLabels: LifestyleHabit[] = [
  "Sleeps late",
  "Works outdoors",
  "Gym regularly",
  "High stress"
];
