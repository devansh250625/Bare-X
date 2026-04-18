import { NextResponse } from "next/server";
import { createAnalysisPayload, normalizeAnswers } from "@/lib/skin-engine";
import { generateSkinExplanation } from "@/lib/explanations";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = createAnalysisPayload(body);
    const answers = normalizeAnswers(body);
    const explanation = await generateSkinExplanation(answers, payload.skinScore);

    let quizResponseId: string | undefined;

    try {
      const saved = await prisma.quizResponse.create({
        data: {
          answers,
          skinScore: payload.skinScore,
          recommendations: payload.routine
        }
      });

      quizResponseId = saved.id;
    } catch {
      quizResponseId = undefined;
    }

    return NextResponse.json({
      ...payload,
      explanation,
      quizResponseId
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to process quiz."
      },
      { status: 400 }
    );
  }
}
