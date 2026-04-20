/**
 * Branded HTML email template for Bare-X waitlist confirmation.
 * Professional skincare brand layout with banner, coupon, and CTA.
 */
export function buildWaitlistEmailHtml(couponCode: string, discountPercent: number): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Bare-X</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF9F7;font-family:'Helvetica Neue',Arial,sans-serif;color:#1A1A2E;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF9F7;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 2px 24px rgba(26,26,46,0.06);">

          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#1A1A2E 0%,#2A2A44 100%);padding:40px 32px;text-align:center;">
              <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:0.25em;color:#FFFFFF;">BARE-X</h1>
              <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.5);">Skin Intelligence System</p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding:32px 32px 24px;">
              <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#1A1A2E;">You're on the list. 🎉</h2>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#555568;">
                Welcome to the Bare-X early access program. You're now in line for a personalized skincare system built around your exact skin profile — not generic products.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <div style="height:1px;background:linear-gradient(to right,transparent,#E0DDD8,transparent);"></div>
            </td>
          </tr>

          <!-- Coupon Section -->
          <tr>
            <td style="padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#EBF2FF;border-radius:12px;border:1px dashed rgba(58,134,255,0.25);">
                <tr>
                  <td style="padding:24px;text-align:center;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#3A86FF;">Your Exclusive Reward</p>
                    <h3 style="margin:0 0 16px;font-size:32px;font-weight:800;color:#1A1A2E;">${discountPercent}% OFF</h3>
                    <div style="display:inline-block;background:#FFFFFF;border:2px dashed #3A86FF;border-radius:8px;padding:12px 28px;">
                      <span style="font-size:20px;font-weight:700;letter-spacing:0.15em;font-family:'Courier New',monospace;color:#1A1A2E;">${couponCode}</span>
                    </div>
                    <p style="margin:12px 0 0;font-size:12px;color:#8E8E9A;">Valid sitewide at launch · Single use · No expiry</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What You Get -->
          <tr>
            <td style="padding:8px 32px 24px;">
              <h3 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#1A1A2E;">What's coming for you:</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#555568;">
                    <span style="color:#3A86FF;font-weight:700;margin-right:8px;">→</span>
                    AI-powered skin analysis personalized to your profile
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#555568;">
                    <span style="color:#3A86FF;font-weight:700;margin-right:8px;">→</span>
                    A complete skincare system (not random products)
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#555568;">
                    <span style="color:#3A86FF;font-weight:700;margin-right:8px;">→</span>
                    Priority access before public launch
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;font-size:14px;color:#555568;">
                    <span style="color:#3A86FF;font-weight:700;margin-right:8px;">→</span>
                    ${discountPercent}% off your first order with your coupon
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:8px 32px 32px;text-align:center;">
              <a href="https://barex.com/quiz" style="display:inline-block;background:#1A1A2E;color:#FFFFFF;text-decoration:none;padding:14px 32px;border-radius:50px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Take the Skin Quiz</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#FAF9F7;padding:24px 32px;border-top:1px solid #E8E6E1;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#1A1A2E;">BARE-X</p>
              <p style="margin:0;font-size:11px;line-height:1.6;color:#8E8E9A;">
                You're receiving this because you joined the Bare-X early access waitlist.<br/>
                © ${new Date().getFullYear()} Bare-X · Skin Intelligence System
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
