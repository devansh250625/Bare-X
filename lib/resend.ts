import { Resend } from "resend";
import { buildWaitlistEmailHtml } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistEmail(email: string, couponCode: string, discountPercent: number) {
  try {
    const { data, error } = await resend.emails.send({
      // TODO: Switch to "Bare-X <hello@barex.com>" after verifying domain in Resend
      from: "Bare-X <onboarding@resend.dev>",
      to: [email],
      subject: `Welcome to Bare-X — Here's Your ${discountPercent}% Off Coupon 🎁`,
      html: buildWaitlistEmailHtml(couponCode, discountPercent)
    });

    if (error) {
      console.error("[Resend] Failed to send email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[Resend] Exception:", err);
    return { success: false, error: "Email service unavailable" };
  }
}
