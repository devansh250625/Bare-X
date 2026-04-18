import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      city?: string;
      postalCode?: string;
      skinGoal?: string;
      sampleConsent?: boolean;
    };
    const email = body.email?.trim().toLowerCase();
    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const address = body.address?.trim();
    const city = body.city?.trim();
    const postalCode = body.postalCode?.trim();
    const skinGoal = body.skinGoal?.trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: {
        email
      },
      update: {
        name: name || undefined,
        phone: phone || undefined,
        address: address || undefined,
        city: city || undefined,
        postalCode: postalCode || undefined,
        skinGoal: skinGoal || undefined,
        sampleConsent: Boolean(body.sampleConsent)
      },
      create: {
        email,
        name: name || undefined,
        phone: phone || undefined,
        address: address || undefined,
        city: city || undefined,
        postalCode: postalCode || undefined,
        skinGoal: skinGoal || undefined,
        sampleConsent: Boolean(body.sampleConsent)
      }
    });

    return NextResponse.json({
      success: true,
      userId: user.id
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to save waitlist entry."
      },
      { status: 500 }
    );
  }
}
