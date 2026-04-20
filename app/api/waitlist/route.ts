import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createWaitlistCoupon } from "@/lib/coupons";
import { sendWaitlistEmail } from "@/lib/resend";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    // Check if user already exists with a coupon
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { coupons: { where: { type: "WAITLIST" }, take: 1 } }
    });

    if (existingUser && existingUser.coupons.length > 0) {
      // Already joined — return existing coupon
      return NextResponse.json({
        success: true,
        alreadyJoined: true,
        userId: existingUser.id,
        coupon: {
          code: existingUser.coupons[0].code,
          discountPercent: existingUser.coupons[0].discountPercent,
          type: existingUser.coupons[0].type
        }
      });
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email }
    });

    const coupon = await createWaitlistCoupon(user.id);

    // Send branded confirmation email (non-blocking)
    sendWaitlistEmail(email, coupon.code, coupon.discountPercent).catch((err) => {
      console.error("[Waitlist] Email send failed:", err);
    });

    return NextResponse.json({
      success: true,
      alreadyJoined: false,
      userId: user.id,
      coupon: {
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        type: coupon.type
      }
    });
  } catch (error) {
    console.error("[Waitlist] Error:", error);

    // Friendly message for database/server errors
    return NextResponse.json(
      { error: "Our servers are warming up. Please try again in a moment — we don't want you to miss your spot." },
      { status: 503 }
    );
  }
}
