import fs from "node:fs/promises";
import path from "node:path";

const API_URL = "https://api.hypedrop.com/graphql";
const SOURCE_URL = "https://www.hypedrop.com/boxes/na/list";
const OUTPUT_PATH = path.join(process.cwd(), "src/data/generated/hypedropCatalog.json");
const PAGE_SIZE = 100;
const MAX_BOXES = Number(process.env.HYPEDROP_MAX_BOXES ?? 1000);
const ALLOW_SMALLER_OUTPUT = process.env.HYPEDROP_ALLOW_SMALLER === "true";

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

function normalizeName(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ");
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

  const normalized = {
    name: normalizeName(name),
    slug,
    price,
    iconUrl,
    boxId: box?.id ? String(box.id) : slug,
    sourceUrl: `https://www.hypedrop.com/boxes/na/open/${slug}`,
    status: "PUBLIC",
    firstSeenAt: box?.createdAt,
    lastUpdatedAt: box?.updatedAt ?? new Date().toISOString(),
  };

  return normalized;
}

function mergeBoxes(boxes) {
  const byKey = new Map();

  for (const box of boxes) {
    const key = box.name.toLowerCase();

    if (!byKey.has(key)) {
      byKey.set(key, box);
    }
  }

  return [...byKey.values()];
}

async function readExistingCatalog() {
  try {
    const content = await fs.readFile(OUTPUT_PATH, "utf8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function buildBoxesQuery(after) {
  const afterArg = after ? `, after: "${after}"` : "";

  return `{
    boxes(first: ${PAGE_SIZE}${afterArg}, tags: ["featured"], orderBy: [ID_DESC]) {
      edges {
        node {
          id
          name
          price
          iconUrl
          slug
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }`;
}

async function fetchFeaturedBoxes() {
  const foundBoxes = [];
  let after = null;

  while (mergeBoxes(foundBoxes).length < MAX_BOXES) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        Origin: "https://www.hypedrop.com",
        Referer: SOURCE_URL,
      },
      body: JSON.stringify({ query: buildBoxesQuery(after) }),
    });

    if (!response.ok) {
      throw new Error(`HypeDrop catalog request failed: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors?.length) {
      throw new Error(`HypeDrop catalog request failed: ${json.errors[0].message}`);
    }

    const edges = json.data?.boxes?.edges ?? [];
    foundBoxes.push(...edges.map((edge) => normalizeBox(edge.node)).filter(Boolean));

    if (!json.data?.boxes?.pageInfo?.hasNextPage) {
      break;
    }

    after = json.data.boxes.pageInfo.endCursor;
    if (!after) {
      break;
    }
  }

  return mergeBoxes(foundBoxes).slice(0, MAX_BOXES);
}

async function main() {
  const boxes = await fetchFeaturedBoxes();
  const existingCatalog = await readExistingCatalog();
  const existingCount = Number(existingCatalog?.count ?? 0);

  if (boxes.length === 0 || (!ALLOW_SMALLER_OUTPUT && boxes.length < existingCount)) {
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
        source: API_URL,
        sourcePage: SOURCE_URL,
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
