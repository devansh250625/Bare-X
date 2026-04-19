import { NextResponse } from "next/server";
import { validateCoupon } from "@/lib/coupons";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { code?: string };
    const code = body.code?.trim().toUpperCase();

    if (!code) {
      return NextResponse.json({ valid: false, error: "Coupon code is required." }, { status: 400 });
    }

    const result = await validateCoupon(code);

    if (!result.valid) {
      return NextResponse.json({ valid: false, error: result.error }, { status: 200 });
    }

    return NextResponse.json({
      valid: true,
      discountPercent: result.coupon.discountPercent,
      type: result.coupon.type
    });
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: "Unable to validate coupon." },
      { status: 500 }
    );
  }
}
