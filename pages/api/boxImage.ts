import { NextApiRequest, NextApiResponse } from "next";

const palettes: Record<string, [string, string, string]> = {
  hype: ["#0f172a", "#2563eb", "#f8fafc"],
  luxury: ["#111827", "#b45309", "#fff7ed"],
  sneaker: ["#0f172a", "#7c3aed", "#f5f3ff"],
  gaming: ["#111827", "#16a34a", "#ecfdf5"],
  fashion: ["#1f2937", "#db2777", "#fdf2f8"],
  food: ["#1f2937", "#dc2626", "#fff7ed"],
  collectibles: ["#172554", "#0891b2", "#ecfeff"],
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shortLabel(value: string) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const firstLine = words.slice(0, 2).join(" ");
  const secondLine = words.slice(2, 5).join(" ");

  return [firstLine, secondLine].filter(Boolean);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const name = typeof req.query.name === "string" ? req.query.name : "Mystery Box";
  const theme = typeof req.query.theme === "string" ? req.query.theme : "hype";
  const [bg, accent, text] = palettes[theme] ?? palettes.hype;
  const [lineOne, lineTwo] = shortLabel(name).map(escapeXml);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360" role="img" aria-label="${escapeXml(name)}">
  <defs>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
    <linearGradient id="box" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.92"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.52"/>
    </linearGradient>
  </defs>
  <rect width="480" height="360" rx="40" fill="url(#card)"/>
  <circle cx="402" cy="66" r="88" fill="#ffffff" opacity="0.10"/>
  <circle cx="72" cy="314" r="104" fill="#ffffff" opacity="0.08"/>
  <path d="M139 122h202l40 48-142 68-140-68 40-48Z" fill="url(#box)"/>
  <path d="M99 170l140 68v72L99 240v-70Z" fill="#ffffff" opacity="0.72"/>
  <path d="M381 170l-142 68v72l142-70v-70Z" fill="#ffffff" opacity="0.58"/>
  <path d="M139 122l100 50 102-50" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.95"/>
  <text x="240" y="54" text-anchor="middle" fill="${text}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800" letter-spacing="2">HYPEDROP</text>
  <text x="240" y="274" text-anchor="middle" fill="${text}" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="800">${lineOne}</text>
  ${lineTwo ? `<text x="240" y="312" text-anchor="middle" fill="${text}" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" opacity="0.92">${lineTwo}</text>` : ""}
</svg>`;

  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=604800, immutable");
  return res.status(200).send(svg);
}
