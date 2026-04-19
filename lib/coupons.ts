import { prisma } from "@/lib/prisma";

/**
 * Generate a unique, human-readable coupon code.
 * Format: BAREX-XXXX-XXXX (uppercase alphanumeric, no ambiguous chars)
 */
export function generateCouponCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid confusion
  let segment1 = "";
  let segment2 = "";
  for (let i = 0; i < 4; i++) {
    segment1 += chars[Math.floor(Math.random() * chars.length)];
    segment2 += chars[Math.floor(Math.random() * chars.length)];
  }
  return `BAREX-${segment1}-${segment2}`;
}

/**
 * Create a waitlist coupon for a user.
 * Returns existing coupon if user already has one.
 */
export async function createWaitlistCoupon(userId: string) {
  // Check if user already has a waitlist coupon
  const existing = await prisma.coupon.findFirst({
    where: {
      userId,
      type: "WAITLIST"
    }
  });

  if (existing) {
    return existing;
  }

  // Generate unique code with retry logic
  let code: string;
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    code = generateCouponCode();
    try {
      const coupon = await prisma.coupon.create({
        data: {
          code,
          discountPercent: 15,
          type: "WAITLIST",
          status: "ACTIVE",
          maxUses: 1,
          userId,
          expiresAt: null // No expiry for waitlist coupons — lifetime reward
        }
      });
      return coupon;
    } catch (error: unknown) {
      // If unique constraint violation, retry with a new code
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        (error as { code: string }).code === "P2002"
      ) {
        attempts++;
        continue;
      }
      throw error;
    }
  }

  throw new Error("Failed to generate unique coupon code after maximum attempts.");
}

/**
 * Validate a coupon code and return its details.
 * Returns null if coupon is invalid/expired/used.
 */
export async function validateCoupon(code: string) {
  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase().trim() },
    include: {
      user: { select: { email: true, name: true } },
      redemptions: true
    }
  });

  if (!coupon) {
    return { valid: false, error: "Coupon not found." } as const;
  }

  if (coupon.status === "REVOKED") {
    return { valid: false, error: "This coupon has been revoked." } as const;
  }

  if (coupon.status === "EXPIRED") {
    return { valid: false, error: "This coupon has expired." } as const;
  }

  if (coupon.status === "USED" || coupon.currentUses >= coupon.maxUses) {
    return { valid: false, error: "This coupon has already been used." } as const;
  }

  if (coupon.expiresAt && new Date() > coupon.expiresAt) {
    // Auto-expire
    await prisma.coupon.update({
      where: { id: coupon.id },
      data: { status: "EXPIRED" }
    });
    return { valid: false, error: "This coupon has expired." } as const;
  }

  return {
    valid: true,
    coupon: {
      id: coupon.id,
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      type: coupon.type,
      maxUses: coupon.maxUses,
      currentUses: coupon.currentUses,
      expiresAt: coupon.expiresAt
    }
  } as const;
}

/**
 * Redeem a coupon (mark as used, record the redemption).
 */
export async function redeemCoupon(
  code: string,
  orderId: string,
  orderAmount: number
) {
  const validation = await validateCoupon(code);
  if (!validation.valid) {
    return { success: false, error: validation.error } as const;
  }

  const discountAmount = (orderAmount * validation.coupon.discountPercent) / 100;
  const newUses = validation.coupon.currentUses + 1;
  const isFullyUsed = newUses >= validation.coupon.maxUses;

  const [coupon, redemption] = await prisma.$transaction([
    prisma.coupon.update({
      where: { id: validation.coupon.id },
      data: {
        currentUses: newUses,
        status: isFullyUsed ? "USED" : "ACTIVE"
      }
    }),
    prisma.redemption.create({
      data: {
        couponId: validation.coupon.id,
        orderId,
        amount: orderAmount,
        discount: discountAmount
      }
    })
  ]);

  return {
    success: true,
    discount: discountAmount,
    finalAmount: orderAmount - discountAmount,
    coupon,
    redemption
  } as const;
}
