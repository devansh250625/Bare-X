"use client";

import { useEffect, useRef, useState } from "react";
import { AnalysisPayload } from "@/lib/types";

/**
 * Opens a styled print-ready report in a new window.
 * User can then "Save as PDF" from the browser print dialog.
 */
export function useSkinReport() {
  const [generating, setGenerating] = useState(false);

  function generateReport(result: AnalysisPayload) {
    setGenerating(true);

    const html = buildReportHtml(result);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const win = window.open(url, "_blank");
    if (win) {
      win.onload = () => {
        setTimeout(() => {
          win.print();
          setGenerating(false);
        }, 600);
      };
    } else {
      // Fallback: download as HTML
      const a = document.createElement("a");
      a.href = url;
      a.download = "bare-x-skin-report.html";
      a.click();
      setGenerating(false);
    }
  }

  return { generateReport, generating };
}

function buildReportHtml(r: AnalysisPayload): string {
  const cs = r.compositeScore ?? 0;
  const skinAge = r.skinAge ?? 25;
  const routineScore = r.routineScore ?? 50;
  const interp = r.interpretation;
  const system = r.assignedSystem;
  const score = r.skinScore;

  const scoreColor = cs >= 70 ? "#22C55E" : cs >= 45 ? "#EAB308" : "#EF4444";
  const scoreLabel = cs >= 70 ? "Good" : cs >= 45 ? "Needs Attention" : "Critical";

  const metricColor = (val: number, inverted = false) => {
    const v = inverted ? 10 - val : val;
    if (v >= 7) return "#22C55E";
    if (v >= 4) return "#EAB308";
    return "#EF4444";
  };

  const barSvg = (label: string, value: number, color: string) => `
    <div style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="font-size:13px;color:#555568;">${label}</span>
        <span style="font-size:13px;font-weight:600;color:#1A1A2E;">${value}/10</span>
      </div>
      <div style="background:#F0EDE8;border-radius:6px;height:10px;overflow:hidden;">
        <div style="background:${color};height:100%;width:${value * 10}%;border-radius:6px;"></div>
      </div>
    </div>`;

  const radarSize = 200;
  const radarCenter = radarSize / 2;
  const radarRadius = 70;
  const metrics = [
    { label: "Acne Risk", value: score.acneRisk },
    { label: "Oil Level", value: score.oilLevel },
    { label: "Hydration", value: score.hydration },
    { label: "Sensitivity", value: score.sensitivity }
  ];
  const angles = metrics.map((_, i) => (Math.PI * 2 * i) / metrics.length - Math.PI / 2);
  const radarPoints = metrics.map((m, i) => {
    const r2 = (m.value / 10) * radarRadius;
    return `${radarCenter + r2 * Math.cos(angles[i])},${radarCenter + r2 * Math.sin(angles[i])}`;
  }).join(" ");
  const radarGrid = [0.25, 0.5, 0.75, 1].map(scale => {
    const pts = angles.map(a => `${radarCenter + radarRadius * scale * Math.cos(a)},${radarCenter + radarRadius * scale * Math.sin(a)}`).join(" ");
    return `<polygon points="${pts}" fill="none" stroke="#E0DDD8" stroke-width="0.5"/>`;
  }).join("");
  const radarLabels = metrics.map((m, i) => {
    const lx = radarCenter + (radarRadius + 22) * Math.cos(angles[i]);
    const ly = radarCenter + (radarRadius + 22) * Math.sin(angles[i]);
    return `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="9" fill="#8E8E9A">${m.label}</text>`;
  }).join("");

  const ingredientRows = (system?.products ?? []).flatMap(p =>
    p.keyIngredients.map(ing => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #F0EDE8;font-size:12px;color:#1A1A2E;font-weight:500;">${ing.name}${ing.concentration ? ` ${ing.concentration}` : ""}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #F0EDE8;font-size:12px;color:#555568;">${p.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #F0EDE8;font-size:12px;color:#555568;">${ing.role}</td>
      </tr>`)
  ).join("");

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Bare-X Skin Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Inter',sans-serif; color:#1A1A2E; background:#FFFFFF; padding:0; }
  @media print {
    body { padding:0; margin:0; }
    .page-break { page-break-before:always; }
    .no-print { display:none !important; }
  }
  .page { max-width:700px; margin:0 auto; padding:40px 32px; }
  .header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #1A1A2E; padding-bottom:16px; margin-bottom:28px; }
  .brand { font-family:'Space Grotesk',sans-serif; font-size:24px; font-weight:700; letter-spacing:0.2em; }
  .section { margin-bottom:28px; }
  .section-title { font-family:'Space Grotesk',sans-serif; font-size:16px; font-weight:700; color:#1A1A2E; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:14px; border-left:3px solid #3A86FF; padding-left:10px; }
  .card { border:1px solid #E8E6E1; border-radius:12px; padding:18px; margin-bottom:14px; }
  .stat-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:20px; }
  .stat-box { text-align:center; border:1px solid #E8E6E1; border-radius:10px; padding:14px 8px; }
  .stat-value { font-family:'Space Grotesk',sans-serif; font-size:28px; font-weight:700; }
  .stat-label { font-size:10px; text-transform:uppercase; letter-spacing:0.15em; color:#8E8E9A; margin-top:4px; }
  table { width:100%; border-collapse:collapse; }
  th { text-align:left; padding:8px 12px; background:#FAF9F7; font-size:10px; text-transform:uppercase; letter-spacing:0.15em; color:#8E8E9A; border-bottom:2px solid #E8E6E1; }
  .tag { display:inline-block; background:#EBF2FF; color:#3A86FF; font-size:10px; font-weight:600; padding:3px 10px; border-radius:20px; margin-right:6px; margin-bottom:4px; }
  .footer { text-align:center; padding-top:20px; border-top:1px solid #E8E6E1; margin-top:28px; }
  .footer p { font-size:10px; color:#8E8E9A; letter-spacing:0.1em; }
  .interpretation p { font-size:13px; line-height:1.7; color:#555568; margin-bottom:8px; }
</style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div>
      <div class="brand">BARE-X</div>
      <div style="font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#8E8E9A;margin-top:2px;">Skin Intelligence Report</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:11px;color:#8E8E9A;">Generated on</div>
      <div style="font-size:13px;font-weight:600;">${dateStr}</div>
    </div>
  </div>

  <!-- Score Overview -->
  <div class="section">
    <div class="section-title">Skin Score Overview</div>
    <div class="stat-grid">
      <div class="stat-box">
        <div class="stat-value" style="color:${scoreColor}">${cs}</div>
        <div class="stat-label">Composite Score</div>
        <div style="font-size:10px;color:${scoreColor};margin-top:2px;font-weight:600;">${scoreLabel}</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">${skinAge}</div>
        <div class="stat-label">Skin Age</div>
        <div style="font-size:10px;color:#8E8E9A;margin-top:2px;">years</div>
      </div>
      <div class="stat-box">
        <div class="stat-value">${routineScore}%</div>
        <div class="stat-label">Routine Score</div>
        <div style="font-size:10px;color:${routineScore >= 50 ? "#22C55E" : "#EAB308"};margin-top:2px;font-weight:600;">${routineScore >= 50 ? "Adequate" : "Needs Work"}</div>
      </div>
    </div>
  </div>

  <!-- Skin Profile -->
  <div class="section">
    <div class="section-title">Skin Profile</div>
    <div class="card">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
        <span class="tag">${r.answers.skinType || "Not specified"} Skin</span>
        ${r.profile.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div style="font-size:12px;color:#555568;">
        <strong>Concerns:</strong> ${r.answers.concerns.join(", ") || "None selected"}<br/>
        <strong>Current Routine:</strong> ${r.answers.currentRoutine || "None"}<br/>
        <strong>Acne Severity:</strong> ${r.answers.acneSeverity || "None"}<br/>
        <strong>Lifestyle:</strong> ${r.answers.lifestyle.join(", ") || "None selected"}
      </div>
    </div>
  </div>

  <!-- Metric Breakdown with Radar -->
  <div class="section">
    <div class="section-title">Metric Breakdown</div>
    <div style="display:grid;grid-template-columns:1fr 200px;gap:20px;align-items:start;">
      <div>
        ${barSvg("Acne Risk", score.acneRisk, metricColor(score.acneRisk, true))}
        ${barSvg("Oil Level", score.oilLevel, metricColor(score.oilLevel, true))}
        ${barSvg("Hydration", score.hydration, metricColor(score.hydration))}
        ${barSvg("Sensitivity", score.sensitivity, metricColor(score.sensitivity, true))}
      </div>
      <div style="text-align:center;">
        <svg width="${radarSize}" height="${radarSize}" viewBox="0 0 ${radarSize} ${radarSize}">
          ${radarGrid}
          ${angles.map(a => `<line x1="${radarCenter}" y1="${radarCenter}" x2="${radarCenter + radarRadius * Math.cos(a)}" y2="${radarCenter + radarRadius * Math.sin(a)}" stroke="#E0DDD8" stroke-width="0.5"/>`).join("")}
          <polygon points="${radarPoints}" fill="rgba(58,134,255,0.15)" stroke="#3A86FF" stroke-width="1.5"/>
          ${metrics.map((m, i) => {
            const r2 = (m.value / 10) * radarRadius;
            return `<circle cx="${radarCenter + r2 * Math.cos(angles[i])}" cy="${radarCenter + r2 * Math.sin(angles[i])}" r="3" fill="#3A86FF"/>`;
          }).join("")}
          ${radarLabels}
        </svg>
        <div style="font-size:9px;color:#8E8E9A;margin-top:4px;">Skin Radar Chart</div>
      </div>
    </div>
  </div>

  <!-- Interpretation -->
  ${interp ? `
  <div class="section page-break">
    <div class="section-title">Clinical Interpretation</div>
    <div class="card interpretation">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#3A86FF;margin-bottom:10px;font-weight:600;">What This Means</div>
      ${interp.whatThisMeans.map(t => `<p>${t}</p>`).join("")}
    </div>
    <div class="card interpretation" style="border-color:#FDE8E8;background:#FFFAFA;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#EF4444;margin-bottom:10px;font-weight:600;">⚠ What Happens If Ignored</div>
      ${interp.whatHappensIfIgnored.map(t => `<p>${t}</p>`).join("")}
    </div>
  </div>` : ""}

  <!-- Assigned System -->
  ${system ? `
  <div class="section">
    <div class="section-title">Your Bare-X System: ${system.name}</div>
    <div class="card">
      <div style="font-size:14px;font-weight:600;color:#1A1A2E;">${system.tagline}</div>
      <div style="font-size:12px;color:#8E8E9A;margin-top:4px;">Designed for: ${system.forWhom}</div>
    </div>

    ${system.products.map(p => `
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <div>
          <div style="font-size:14px;font-weight:600;">${p.name}</div>
          <div style="font-size:11px;color:#8E8E9A;">${p.subtitle}</div>
        </div>
        <span class="tag">${p.format.split("·")[0].trim()}</span>
      </div>
      ${p.aiReason ? `<div style="font-size:12px;color:#555568;line-height:1.6;background:#EBF2FF;padding:10px 12px;border-radius:8px;border-left:3px solid #3A86FF;margin-bottom:10px;"><strong style="color:#3A86FF;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">AI Analysis:</strong><br/>${p.aiReason}</div>` : ""}
    </div>`).join("")}
  </div>` : ""}

  <!-- Ingredient Table -->
  ${system ? `
  <div class="section">
    <div class="section-title">Ingredient Breakdown</div>
    <table>
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Product</th>
          <th>Function</th>
        </tr>
      </thead>
      <tbody>
        ${ingredientRows}
      </tbody>
    </table>
  </div>` : ""}

  <!-- Footer -->
  <div class="footer">
    <p><strong>BARE-X</strong> · Skin Intelligence System</p>
    <p style="margin-top:4px;">This report is for informational purposes only and does not constitute medical advice.</p>
    <p style="margin-top:4px;">© ${now.getFullYear()} Bare-X · barex.com</p>
  </div>

</div>
</body>
</html>`;
}
