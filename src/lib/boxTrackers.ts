import { curatedBoxCatalog } from "@/data/boxCatalog";

export type BoxItem = {
  name: string;
  slug: string;
  price: number;
  iconUrl: string;
  platformId?: string;
  boxId?: string;
  category?: string;
  status?: string;
  sourceUrl?: string;
  firstSeenAt?: string;
  lastSeenAt?: string;
  lastUpdatedAt?: string;
};

export type BoxTrackerResult = {
  boxes: BoxItem[];
  topBoxes: BoxItem[];
  allBoxes: BoxItem[];
  source: "live" | "snapshot" | "fallback";
  adapterStatus?: "ok" | "blocked" | "empty" | "fallback";
  error?: string;
};

const LATEST_BOX_LIMIT = 10;
const TOP_BOX_LIMIT = 5;
const ALL_BOX_LIMIT = 500;
const SNAPSHOT_TTL_MS = 1000 * 60 * 60 * 24 * 7;

type CatalogStrategy = "api" | "page" | "browser" | "manual";

type CatalogAdapter = {
  siteId: string;
  label: string;
  strategy: CatalogStrategy;
  fetch: () => Promise<BoxTrackerResult>;
};

type CatalogSnapshot = {
  result: BoxTrackerResult;
  generatedAt: string;
  expiresAt: number;
};

type DroppeekGlobal = typeof globalThis & {
  __droppeekCatalogSnapshots?: Map<string, CatalogSnapshot>;
};

const droppeekGlobal = globalThis as DroppeekGlobal;
const catalogSnapshots = droppeekGlobal.__droppeekCatalogSnapshots ?? new Map<string, CatalogSnapshot>();

droppeekGlobal.__droppeekCatalogSnapshots = catalogSnapshots;

const fallbackBoxes: Record<string, BoxItem[]> = curatedBoxCatalog;

export function normalizeSiteId(siteId: string) {
  return siteId.trim().toLowerCase();
}

function normalizeBox(box: Partial<BoxItem>): BoxItem | null {
  if (!box.name || !box.slug || typeof box.price !== "number" || !box.iconUrl) {
    return null;
  }

  return {
    name: box.name,
    slug: box.slug,
    price: box.price,
    iconUrl: box.iconUrl,
    platformId: box.platformId,
    boxId: box.boxId,
    category: box.category,
    status: box.status,
    sourceUrl: box.sourceUrl,
    firstSeenAt: box.firstSeenAt,
    lastSeenAt: box.lastSeenAt,
    lastUpdatedAt: box.lastUpdatedAt,
  };
}

function isBoxItem(box: BoxItem | null): box is BoxItem {
  return box !== null;
}

function uniqueBoxes(boxes: BoxItem[]) {
  const seen = new Set<string>();

  return boxes.filter((box) => {
    const key = `${box.slug || slugify(box.name)}:${box.name.toLowerCase()}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function parsePrice(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value !== "string") {
    return NaN;
  }

  const numeric = value.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return numeric ? Number(numeric[0]) : NaN;
}

function absolutizeStorageImage(path: string) {
  if (path.startsWith("http")) {
    return path;
  }

  return `https://mysteryboxbrand.com/storage/${path.replace(/^\/?storage\/?/, "")}`;
}

function normalizeHapaboxImage(url: string) {
  if (!url || !url.startsWith("https://static.hapabox.com/")) {
    return url;
  }

  if (url.includes("x-oss-process=")) {
    return url;
  }

  return `${url}?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp`;
}

function normalizeMetadrawImage(url: string) {
  if (!url) {
    return "";
  }

  if (url.startsWith("http")) {
    return url;
  }

  return `https://images.metadraw.com/${url.replace(/^\/+/, "")}`;
}

type MetadrawBoxRow = BoxItem & {
  openTimes: number;
};

async function fetchHypedropBoxes(orderBy: "RECOMMENDED" | "NEWEST", first: number): Promise<BoxItem[]> {
  const response = await fetch("https://hypedrop.com/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({
      operationName: "BoxesPage",
      variables: { filters: {}, orderBy, first },
      query: `query BoxesPage { boxes(orderBy: ${orderBy}, first: ${first}) { edges { node { name price iconUrl slug } } } }`,
    }),
  });

  if (!response.ok) {
    throw new Error(`HypeDrop request failed: ${response.status}`);
  }

  const json = await response.json();
  const boxes = json?.data?.boxes?.edges
    ?.map((edge: any) => normalizeBox(edge?.node))
    .filter(isBoxItem);

  if (!Array.isArray(boxes) || boxes.length === 0) {
    throw new Error("HypeDrop response did not include boxes");
  }

  return uniqueBoxes(boxes).slice(0, first);
}

async function fetchHypedropTracker(): Promise<BoxTrackerResult> {
  const topBoxes = await fetchHypedropBoxes("RECOMMENDED", TOP_BOX_LIMIT);

  try {
    const allBoxes = await fetchHypedropBoxes("NEWEST", ALL_BOX_LIMIT);
    const boxes = allBoxes.slice(0, LATEST_BOX_LIMIT);

    return {
      boxes,
      topBoxes,
      allBoxes,
      source: "live",
    };
  } catch {
    return {
      boxes: topBoxes,
      topBoxes,
      allBoxes: topBoxes,
      source: "live",
    };
  }
}

async function fetchHapaboxRows() {
  const response = await fetch("https://api.hapabox.com/item/list/v2", {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0",
      siteCode: "main",
    },
  });

  if (!response.ok) {
    throw new Error(`HapaBox request failed: ${response.status}`);
  }

  const json = await response.json();
  const rows = json?.data?.rows;

  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("HapaBox response did not include boxes");
  }

  return rows.filter((item: any) => item?.category === "BOX");
}

function mapHapaboxRows(rows: any[]): BoxItem[] {
  return rows
    .filter((item: any) => item?.category === "BOX")
    .map((item: any) =>
      normalizeBox({
        name: item.name ?? item.item_short_title,
        slug: String(item.id ?? slugify(item.name ?? item.item_short_title ?? "")),
        price: parsePrice(item.lowest_price),
        iconUrl: normalizeHapaboxImage(item.item_main_imgs),
      })
    )
    .filter(isBoxItem);
}

async function fetchHapaboxTracker(): Promise<BoxTrackerResult> {
  const rows = await fetchHapaboxRows();
  const latestRows = [...rows].sort((a: any, b: any) => Number(b?.firstUpTime ?? 0) - Number(a?.firstUpTime ?? 0));
  const allBoxes = uniqueBoxes(mapHapaboxRows(latestRows)).slice(0, ALL_BOX_LIMIT);
  const boxes = allBoxes.slice(0, LATEST_BOX_LIMIT);
  const topBoxes = uniqueBoxes(mapHapaboxRows(rows)).slice(0, TOP_BOX_LIMIT);

  if (boxes.length === 0) {
    throw new Error("HapaBox response did not include valid boxes");
  }

  return { boxes, topBoxes, allBoxes, source: "live" };
}

function extractMetadrawRows(payload: any): any[] {
  const catalog = payload?.data?.data ?? payload?.data ?? payload;
  const containers = Array.isArray(catalog) ? catalog : [catalog];
  const rows: any[] = [];

  for (const container of containers) {
    if (Array.isArray(container?.boxes)) {
      rows.push(...container.boxes);
    } else if (Array.isArray(container)) {
      rows.push(...container);
    }
  }

  return rows;
}

function mapMetadrawRows(rows: any[]): MetadrawBoxRow[] {
  return rows
    .map((item: any) => {
      const name = item?.name ?? item?.title;
      const slug = String(item?.slug ?? item?.id ?? slugify(name ?? ""));
      const price = parsePrice(item?.price);
      const iconUrl = normalizeMetadrawImage(item?.image_url ?? item?.imageUrl ?? item?.image ?? "");
      const box = normalizeBox({ name, slug, price, iconUrl });

      if (!box) {
        return null;
      }

      return {
        ...box,
        openTimes: Number(item?.open_times ?? item?.openTimes ?? 0),
      };
    })
    .filter((box): box is MetadrawBoxRow => box !== null);
}

async function fetchMetadrawTracker(): Promise<BoxTrackerResult> {
  const response = await fetch("https://api.metadraw.com/api/v1/boxes?preview=true", {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en",
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`MetaDraw request failed: ${response.status}`);
  }

  const json = await response.json();
  const mappedBoxes = mapMetadrawRows(extractMetadrawRows(json));
  const allBoxes = uniqueBoxes(mappedBoxes).slice(0, ALL_BOX_LIMIT);

  if (allBoxes.length === 0) {
    throw new Error("MetaDraw response did not include valid boxes");
  }

  const topBoxes = uniqueBoxes([...mappedBoxes].sort((a, b) => b.openTimes - a.openTimes)).slice(0, TOP_BOX_LIMIT);

  return {
    boxes: allBoxes.slice(0, LATEST_BOX_LIMIT),
    topBoxes: topBoxes.length > 0 ? topBoxes : allBoxes.slice(0, TOP_BOX_LIMIT),
    allBoxes,
    source: "live",
  };
}

async function fetchJemlitTracker(): Promise<BoxTrackerResult> {
  const response = await fetch("https://jemlit.com/en/box", {
    headers: {
      Accept: "text/html",
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`JemLit request failed: ${response.status}`);
  }

  const html = await response.text();
  const cardPattern = /<li>\s*<a\s+href="([^"]+)"[\s\S]*?<img\s+src="([^"]+)"\s+alt="([^"]+)"[\s\S]*?<h3[^>]*>\s*([\s\S]*?)\s*<\/h3>[\s\S]*?<div[^>]*>\s*([^<]+)\s*<\/div>/g;
  const boxes: BoxItem[] = [];
  const seen = new Set<string>();

  for (const match of html.matchAll(cardPattern)) {
    const [, href, iconUrl, imageAlt, heading, priceText] = match;
    const name = decodeHtml(heading || imageAlt);
    const price = parsePrice(priceText);
    const slug = href.split("/").filter(Boolean).pop() ?? slugify(name);

    if (!name || seen.has(slug)) {
      continue;
    }

    const box = normalizeBox({
      name,
      slug,
      price,
      iconUrl,
    });

    if (box) {
      seen.add(slug);
      boxes.push(box);
    }
  }

  if (boxes.length === 0) {
    throw new Error("JemLit page did not include valid boxes");
  }

  const allBoxes = uniqueBoxes(boxes).slice(0, ALL_BOX_LIMIT);

  return {
    boxes: allBoxes.slice(0, LATEST_BOX_LIMIT),
    topBoxes: allBoxes.slice(0, TOP_BOX_LIMIT),
    allBoxes,
    source: "live",
  };
}

async function fetchMysteryBoxBrandRows() {
  const response = await fetch("https://mysteryboxbrand.com/api/box", {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0",
    },
  });

  if (!response.ok) {
    throw new Error(`MysteryBoxBrand request failed: ${response.status}`);
  }

  const json = await response.json();
  const rows = json?.boxes;

  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("MysteryBoxBrand response did not include boxes");
  }

  return rows.filter((item: any) => item?.status === "PUBLISHED");
}

function mapMysteryBoxBrandRows(rows: any[]): BoxItem[] {
  return rows
    .filter((item: any) => item?.status === "PUBLISHED")
    .map((item: any) =>
      normalizeBox({
        name: item.name,
        slug: item.slug ?? slugify(item.name ?? ""),
        price: parsePrice(item.price),
        iconUrl: absolutizeStorageImage(item.featured_image ?? ""),
      })
    )
    .filter(isBoxItem);
}

async function fetchMysteryBoxBrandTopBoxes(rows: any[]): Promise<BoxItem[]> {
  try {
    const response = await fetch("https://mysteryboxbrand.com/api/live-feed", {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      throw new Error(`MysteryBoxBrand live feed request failed: ${response.status}`);
    }

    const liveFeed = await response.json();
    if (!Array.isArray(liveFeed)) {
      throw new Error("MysteryBoxBrand live feed did not include rows");
    }

    const counts = new Map<string, number>();
    for (const item of liveFeed) {
      if (item?.box_slug) {
        counts.set(item.box_slug, (counts.get(item.box_slug) ?? 0) + 1);
      }
    }

    const rankedRows = [...rows].sort(
      (a: any, b: any) => (counts.get(b?.slug) ?? 0) - (counts.get(a?.slug) ?? 0)
    );

    return uniqueBoxes(mapMysteryBoxBrandRows(rankedRows)).slice(0, TOP_BOX_LIMIT);
  } catch {
    return uniqueBoxes(mapMysteryBoxBrandRows(rows)).slice(0, TOP_BOX_LIMIT);
  }
}

async function fetchMysteryBoxBrandTracker(): Promise<BoxTrackerResult> {
  const rows = await fetchMysteryBoxBrandRows();
  const latestRows = [...rows].sort(
    (a: any, b: any) => new Date(b?.updated_at ?? 0).getTime() - new Date(a?.updated_at ?? 0).getTime()
  );
  const allBoxes = uniqueBoxes(mapMysteryBoxBrandRows(latestRows)).slice(0, ALL_BOX_LIMIT);
  const boxes = allBoxes.slice(0, LATEST_BOX_LIMIT);
  const topBoxes = await fetchMysteryBoxBrandTopBoxes(rows);

  if (boxes.length === 0) {
    throw new Error("MysteryBoxBrand response did not include valid boxes");
  }

  return { boxes, topBoxes, allBoxes, source: "live" };
}

async function fetchUnavailableTracker(): Promise<BoxTrackerResult> {
  return fallbackResult([]);
}

const catalogAdapters: Record<string, CatalogAdapter> = {
  hypedrop: {
    siteId: "hypedrop",
    label: "HypeDrop",
    strategy: "api",
    fetch: fetchHypedropTracker,
  },
  hapabox: {
    siteId: "hapabox",
    label: "HapaBox",
    strategy: "api",
    fetch: fetchHapaboxTracker,
  },
  metadraw: {
    siteId: "metadraw",
    label: "MetaDraw",
    strategy: "api",
    fetch: fetchMetadrawTracker,
  },
  jemlit: {
    siteId: "jemlit",
    label: "JemLit",
    strategy: "page",
    fetch: fetchJemlitTracker,
  },
  mysteryboxbrand: {
    siteId: "mysteryboxbrand",
    label: "MysteryBoxBrand",
    strategy: "api",
    fetch: fetchMysteryBoxBrandTracker,
  },
  hypeloot: {
    siteId: "hypeloot",
    label: "HypeLoot",
    strategy: "manual",
    fetch: fetchUnavailableTracker,
  },
  rillabox: {
    siteId: "rillabox",
    label: "RillaBox",
    strategy: "manual",
    fetch: fetchUnavailableTracker,
  },
  lootie: {
    siteId: "lootie",
    label: "Lootie",
    strategy: "manual",
    fetch: fetchUnavailableTracker,
  },
};

function fallbackResult(fallback: BoxItem[]): BoxTrackerResult {
  const allBoxes = uniqueBoxes(fallback).slice(0, ALL_BOX_LIMIT);
  const topBoxes = allBoxes.slice(0, TOP_BOX_LIMIT);
  const latestStartIndex = allBoxes.length >= TOP_BOX_LIMIT + LATEST_BOX_LIMIT ? TOP_BOX_LIMIT : 0;

  return {
    boxes: allBoxes.slice(latestStartIndex, latestStartIndex + LATEST_BOX_LIMIT),
    topBoxes,
    allBoxes,
    source: "fallback",
    adapterStatus: allBoxes.length > 0 ? "fallback" : "empty",
  };
}

function snapshotResult(snapshot: CatalogSnapshot, error: unknown): BoxTrackerResult {
  return {
    ...snapshot.result,
    source: "snapshot",
    adapterStatus: "blocked",
    error: error instanceof Error ? error.message : "Catalog adapter failed",
  };
}

function storeSnapshot(siteId: string, result: BoxTrackerResult) {
  if (result.allBoxes.length === 0) {
    return;
  }

  catalogSnapshots.set(siteId, {
    result: {
      ...result,
      source: "live",
      adapterStatus: "ok",
    },
    generatedAt: new Date().toISOString(),
    expiresAt: Date.now() + SNAPSHOT_TTL_MS,
  });
}

function getValidSnapshot(siteId: string) {
  const snapshot = catalogSnapshots.get(siteId);

  if (!snapshot || snapshot.expiresAt <= Date.now()) {
    return null;
  }

  return snapshot;
}

export async function fetchLatestBoxes(siteId: string): Promise<BoxTrackerResult> {
  const normalizedSiteId = normalizeSiteId(siteId);
  const fallback = fallbackBoxes[normalizedSiteId] ?? [];
  const adapter = catalogAdapters[normalizedSiteId];

  if (!adapter) {
    return fallbackResult(fallback);
  }

  try {
    const result = await adapter.fetch();
    storeSnapshot(normalizedSiteId, result);
    return {
      ...result,
      source: "live",
      adapterStatus: "ok",
    };
  } catch (error) {
    console.error(`Failed to fetch live boxes for ${normalizedSiteId}:`, error);
    const snapshot = getValidSnapshot(normalizedSiteId);

    if (snapshot) {
      return snapshotResult(snapshot, error);
    }

    return {
      ...fallbackResult(fallback),
      error: error instanceof Error ? error.message : "Catalog adapter failed",
    };
  }
}

export type CatalogSyncSummary = {
  siteId: string;
  label: string;
  strategy: CatalogStrategy;
  status: BoxTrackerResult["source"];
  boxCount: number;
  topBoxCount: number;
  error?: string;
};

export async function syncBoxCatalog(siteIds = Object.keys(catalogAdapters)): Promise<CatalogSyncSummary[]> {
  const summaries = await Promise.all(
    siteIds.map(async (siteId) => {
      const normalizedSiteId = normalizeSiteId(siteId);
      const adapter = catalogAdapters[normalizedSiteId];

      if (!adapter) {
        const fallback = fallbackResult(fallbackBoxes[normalizedSiteId] ?? []);
        return {
          siteId: normalizedSiteId,
          label: normalizedSiteId,
          strategy: "manual" as CatalogStrategy,
          status: fallback.source,
          boxCount: fallback.allBoxes.length,
          topBoxCount: fallback.topBoxes.length,
          error: fallback.error,
        };
      }

      const result = await fetchLatestBoxes(normalizedSiteId);

      return {
        siteId: normalizedSiteId,
        label: adapter.label,
        strategy: adapter.strategy,
        status: result.source,
        boxCount: result.allBoxes.length,
        topBoxCount: result.topBoxes.length,
        error: result.error,
      };
    })
  );

  return summaries;
}

export function listCatalogAdapters() {
  return Object.values(catalogAdapters).map(({ siteId, label, strategy }) => ({
    siteId,
    label,
    strategy,
    hasSnapshot: catalogSnapshots.has(siteId),
  }));
}
