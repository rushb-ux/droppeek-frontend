import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const START_URL = "https://www.hypedrop.com/en/boxes";
const OUTPUT_PATH = path.join(process.cwd(), "src/data/generated/hypedropCatalog.json");
const MAX_SCROLLS = 40;
const SCROLL_DELAY_MS = 900;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parsePrice(value) {
  if (typeof value === "number") {
    return value;
  }

  const match = String(value ?? "").replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function normalizeImage(url) {
  if (!url) {
    return "";
  }

  if (url.startsWith("http") || url.startsWith("/")) {
    return url;
  }

  return `https://www.hypedrop.com/${url.replace(/^\/+/, "")}`;
}

function normalizeBox(box) {
  const name = box?.name ?? box?.title ?? box?.label;
  const price = parsePrice(box?.price ?? box?.priceInUsd ?? box?.cost ?? box?.value);
  const iconUrl = normalizeImage(
    box?.iconUrl ??
      box?.imageUrl ??
      box?.image ??
      box?.boxImage ??
      box?.thumbnail ??
      box?.media?.url ??
      box?.cover?.url
  );
  const slug = String(box?.slug ?? box?.id ?? slugify(name));

  if (!name || price === null || !iconUrl) {
    return null;
  }

  return {
    name: String(name).trim(),
    slug,
    price,
    iconUrl,
    boxId: box?.id ? String(box.id) : slug,
    sourceUrl: `https://www.hypedrop.com/en/boxes/view/na/${slug}`,
    status: "PUBLIC",
    lastUpdatedAt: new Date().toISOString(),
  };
}

function collectBoxesFromObject(value, boxes = []) {
  if (!value || typeof value !== "object") {
    return boxes;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectBoxesFromObject(item, boxes);
    }
    return boxes;
  }

  const normalized = normalizeBox(value);
  if (normalized) {
    boxes.push(normalized);
  }

  for (const nested of Object.values(value)) {
    if (nested && typeof nested === "object") {
      collectBoxesFromObject(nested, boxes);
    }
  }

  return boxes;
}

function mergeBoxes(boxes) {
  const byKey = new Map();

  for (const box of boxes) {
    const key = `${box.slug}:${box.name.toLowerCase()}`;

    if (!byKey.has(key)) {
      byKey.set(key, box);
    }
  }

  return [...byKey.values()].sort((a, b) => a.name.localeCompare(b.name));
}

async function readExistingCatalog() {
  try {
    const content = await fs.readFile(OUTPUT_PATH, "utf8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function collectDomBoxes(page) {
  return page.evaluate(() => {
    const parsePrice = (value) => {
      const match = String(value || "").replace(/,/g, "").match(/\$\s*(\d+(?:\.\d+)?)/);
      return match ? Number(match[1]) : null;
    };
    const slugify = (value) =>
      String(value || "")
        .toLowerCase()
        .replace(/&amp;/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return [...document.querySelectorAll("a[href*='/boxes/view/'], a[href*='/boxes/']")]
      .map((link) => {
        const card = link.closest("article, li, div") || link;
        const img = card.querySelector("img");
        const text = card.textContent || "";
        const href = link.href || "";
        const name =
          img?.alt ||
          card.querySelector("h1,h2,h3,h4,[data-testid*='name'],[class*='name'],[class*='title']")?.textContent ||
          text.split("\n").map((line) => line.trim()).filter(Boolean)[0];
        const price = parsePrice(text);
        const slug = href.split("/").filter(Boolean).pop() || slugify(name);
        const iconUrl = img?.currentSrc || img?.src || "";

        if (!name || price === null || !iconUrl) {
          return null;
        }

        return {
          name: name.trim(),
          slug,
          price,
          iconUrl,
          boxId: slug,
          sourceUrl: href,
          status: "PUBLIC",
          lastUpdatedAt: new Date().toISOString(),
        };
      })
      .filter(Boolean);
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
  });
  const foundBoxes = [];

  page.on("response", async (response) => {
    const url = response.url();
    const contentType = response.headers()["content-type"] ?? "";

    if (!contentType.includes("json") && !url.includes("graphql") && !url.includes("api")) {
      return;
    }

    try {
      const json = await response.json();
      foundBoxes.push(...collectBoxesFromObject(json));
    } catch {
      // Some GraphQL/API responses are streams or blocked payloads; DOM extraction covers those.
    }
  });

  await page.goto(START_URL, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForTimeout(5_000);

  let previousHeight = 0;
  for (let index = 0; index < MAX_SCROLLS; index += 1) {
    foundBoxes.push(...(await collectDomBoxes(page)));
    const height = await page.evaluate(() => document.body.scrollHeight);

    if (height === previousHeight && index > 4) {
      break;
    }

    previousHeight = height;
    await page.mouse.wheel(0, 1600);
    await sleep(SCROLL_DELAY_MS);
  }

  foundBoxes.push(...(await collectDomBoxes(page)));
  await browser.close();

  const boxes = mergeBoxes(foundBoxes);
  const existingCatalog = await readExistingCatalog();
  const existingCount = Number(existingCatalog?.count ?? 0);

  if (boxes.length === 0 || boxes.length < existingCount) {
    console.error(
      `Collected ${boxes.length} HypeDrop boxes; existing catalog has ${existingCount}. Keeping the existing catalog.`
    );
    process.exitCode = 2;
    return;
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(
    OUTPUT_PATH,
    `${JSON.stringify(
      {
        siteId: "hypedrop",
        source: START_URL,
        generatedAt: new Date().toISOString(),
        count: boxes.length,
        boxes,
      },
      null,
      2
    )}\n`
  );

  console.log(`Saved ${boxes.length} HypeDrop boxes to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
