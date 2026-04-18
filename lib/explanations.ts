import { QuizAnswers, SkinScore } from "@/lib/types";
import { getGeminiClient } from "@/lib/gemini";
import { createFallbackExplanation } from "@/lib/skin-engine";

export async function generateSkinExplanation(answers: QuizAnswers, score: SkinScore) {
  const client = getGeminiClient();

  if (!client) {
    return createFallbackExplanation(answers, score);
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are Bare-X, a premium skincare intelligence brand. Write a concise, premium, non-medical skincare explanation in 2-3 sentences. Be specific, confident, and easy to understand.

Explain this skincare analysis without inventing medical claims.
Answers: ${JSON.stringify(answers)}
Skin score: ${JSON.stringify(score)}`
    });

    return response.text || createFallbackExplanation(answers, score);
  } catch {
    return createFallbackExplanation(answers, score);
  }
}
