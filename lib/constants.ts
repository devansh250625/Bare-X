import { Concern, LifestyleHabit, QuizAnswers, SkinSystem, SystemProduct } from "@/lib/types";

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
  skinType: "",
  concerns: [],
  acneSeverity: "",
  oilLevel: "",
  sensitivity: "",
  lifestyle: [],
  currentRoutine: "",
  gender: ""
};

/* ── 3 Core Skin Systems ── */

export const skinSystems: Record<string, SkinSystem> = {
  "acne-control": {
    id: "acne-control",
    name: "Acne Control System",
    tagline: "Clear skin, rebuilt from the cleanser up.",
    forWhom: "Oily, acne-prone, breakout-heavy skin",
    products: [
      {
        name: "Acne Control Face Wash",
        type: "Face Wash",
        subtitle: "Purifying gel cleanser — AM / PM",
        format: "Gel Tube · 100 ml",
        size: "100 ml",
        keyIngredients: [
          { name: "Salicylic Acid", concentration: "2%", role: "Unclogs pores and dissolves dead skin buildup inside follicles" },
          { name: "Niacinamide", concentration: "2%", role: "Reduces inflammation and calms post-breakout redness" },
          { name: "Zinc PCA", role: "Controls excess sebum production at the source" }
        ],
        aiReason: ""
      },
      {
        name: "Oil-Free Moisturizer",
        type: "Moisturizer",
        subtitle: "Lightweight gel cream — AM / PM",
        format: "Airless Pump · 50 ml",
        size: "50 ml",
        keyIngredients: [
          { name: "Hyaluronic Acid", role: "Pulls moisture into skin without adding oil or heaviness" },
          { name: "Ceramides", role: "Rebuilds the protective skin barrier damaged by acne treatments" },
          { name: "Niacinamide", concentration: "2%", role: "Strengthens skin texture and reduces pore appearance" }
        ],
        aiReason: ""
      }
    ]
  },
  "oil-balance": {
    id: "oil-balance",
    name: "Oil Balance System",
    tagline: "Shine control without stripping your skin.",
    forWhom: "Combination, oily T-zone, shine-prone skin",
    products: [
      {
        name: "Oil Balance Cleanser",
        type: "Cleanser",
        subtitle: "Balancing gel cleanser — AM / PM",
        format: "Gel Tube · 100 ml",
        size: "100 ml",
        keyIngredients: [
          { name: "Niacinamide", concentration: "3%", role: "Regulates oil production and refines skin texture over time" },
          { name: "Green Tea Extract", role: "Antioxidant that reduces inflammation and protects against environmental damage" },
          { name: "Zinc PCA", role: "Targets excess shine without over-drying the skin" }
        ],
        aiReason: ""
      },
      {
        name: "Hydra Balance Gel",
        type: "Gel",
        subtitle: "Lightweight hydration gel — AM / PM",
        format: "Pump Bottle · 50 ml",
        size: "50 ml",
        keyIngredients: [
          { name: "Panthenol", concentration: "1%", role: "Soothes skin and improves moisture retention without greasiness" },
          { name: "Hyaluronic Acid", role: "Lightweight hydration that absorbs fast without clogging" },
          { name: "Aloe Vera", role: "Calms irritation and keeps skin comfortable all day" }
        ],
        aiReason: ""
      }
    ]
  },
  "hydration": {
    id: "hydration",
    name: "Hydration System",
    tagline: "Deep moisture for skin that feels tight.",
    forWhom: "Dry, dehydrated, flaky, or sensitive skin",
    products: [
      {
        name: "Gentle Hydrating Cleanser",
        type: "Cleanser",
        subtitle: "Low-foam comfort cleanser — AM / PM",
        format: "Cream Tube · 100 ml",
        size: "100 ml",
        keyIngredients: [
          { name: "Gentle Surfactants", role: "Cleans without disrupting the natural moisture barrier" },
          { name: "Aloe Vera", role: "Provides instant soothing relief for tight, dry skin" },
          { name: "Glycerin", role: "Draws and locks moisture into the outer skin layers" }
        ],
        aiReason: ""
      },
      {
        name: "Barrier Repair Moisturizer",
        type: "Moisturizer",
        subtitle: "Rich cream moisturizer — AM / PM",
        format: "Airless Pump · 50 ml",
        size: "50 ml",
        keyIngredients: [
          { name: "Ceramides", role: "Rebuilds and strengthens the protective lipid barrier" },
          { name: "Hyaluronic Acid", role: "Multi-weight hydration that penetrates multiple skin layers" },
          { name: "Squalane", role: "Plant-derived oil that mimics natural skin oils for deep nourishment" }
        ],
        aiReason: ""
      }
    ]
  }
};

/* ── Universal Sunscreen ── */

export const universalSunscreen: SystemProduct = {
  name: "SPF 50 Daily Shield",
  type: "Sunscreen",
  subtitle: "Broad-spectrum daily sunscreen — AM",
  format: "Precision Tube · 50 ml",
  size: "50 ml",
  keyIngredients: [
    { name: "SPF 50 Filters", role: "Full UVA + UVB protection against sun damage and aging" },
    { name: "Vitamin E", role: "Antioxidant shield that prevents free radical damage" },
    { name: "No White Cast Formula", role: "Invisible finish that works on all skin tones" }
  ],
  aiReason: "Every skin type needs daily UV protection. Sun exposure accelerates aging, worsens pigmentation, and weakens your skin barrier — regardless of your other concerns."
};

export const concernLabels: Concern[] = [
  "Acne", "Pigmentation", "Dullness", "Oiliness", "Dryness", "Dark spots"
];

export const lifestyleLabels: LifestyleHabit[] = [
  "Sleeps late", "Works outdoors", "Gym regularly", "High stress"
];

// Legacy productCatalog — kept for backward compatibility with ExploreProducts
export const productCatalog: Record<string, any> = {
  acneFaceWash: { assetKey: "acneFaceWash", category: "Face Wash", name: "Acne Control Face Wash", subtitle: "Purifying gel cleanser", ingredients: ["Salicylic Acid 2%", "Niacinamide 2%", "Zinc PCA"], reason: "", audience: "ALL", format: "Gel Tube", useTime: "AM / PM", size: "100 ml", accent: "", finish: "", formulaFocus: [], launchStatus: "planned" },
  gelMoisturizer: { assetKey: "gelMoisturizer", category: "Moisturizer", name: "Oil-Free Moisturizer", subtitle: "Lightweight gel cream", ingredients: ["Hyaluronic Acid", "Ceramides"], reason: "", audience: "ALL", format: "Airless Pump", useTime: "AM / PM", size: "50 ml", accent: "", finish: "", formulaFocus: [], launchStatus: "planned" },
  sunscreen: { assetKey: "sunscreen", category: "Sunscreen", name: "SPF 50 Daily Shield", subtitle: "Broad-spectrum sunscreen", ingredients: ["SPF 50", "No White Cast", "Vitamin E"], reason: "", audience: "ALL", format: "Precision Tube", useTime: "AM", size: "50 ml", accent: "", finish: "", formulaFocus: [], launchStatus: "planned" },
  hydratingFaceWash: { assetKey: "hydratingFaceWash", category: "Face Wash", name: "Gentle Hydrating Cleanser", subtitle: "Low-foam comfort cleanser", ingredients: ["Aloe Vera", "Glycerin"], reason: "", audience: "ALL", format: "Cream Tube", useTime: "AM / PM", size: "100 ml", accent: "", finish: "", formulaFocus: [], launchStatus: "planned" },
  bodyWash: { assetKey: "bodyWash", category: "Body Wash", name: "Oil Balance Cleanser", subtitle: "Balancing gel cleanser", ingredients: ["Niacinamide 3%", "Green Tea"], reason: "", audience: "ALL", format: "Gel Tube", useTime: "AM / PM", size: "100 ml", accent: "", finish: "", formulaFocus: [], launchStatus: "planned" },
  bodyLotion: { assetKey: "bodyLotion", category: "Body Lotion", name: "Barrier Repair Moisturizer", subtitle: "Rich cream moisturizer", ingredients: ["Ceramides", "Squalane"], reason: "", audience: "ALL", format: "Airless Pump", useTime: "AM / PM", size: "50 ml", accent: "", finish: "", formulaFocus: [], launchStatus: "planned" }
};
