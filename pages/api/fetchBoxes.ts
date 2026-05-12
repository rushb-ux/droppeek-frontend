import { NextApiRequest, NextApiResponse } from "next";
import type { BoxTrackerResult } from "@/lib/boxTrackers";
import { fetchLatestBoxes, normalizeSiteId } from "@/lib/boxTrackers";

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const HALF_DAY_IN_SECONDS = 60 * 60 * 12;
const ONE_DAY_IN_MS = ONE_DAY_IN_SECONDS * 1000;

type BoxesApiResponse = {
  siteId: string;
  boxes: BoxTrackerResult["boxes"];
  topBoxes: BoxTrackerResult["topBoxes"];
  allBoxes: BoxTrackerResult["allBoxes"];
  source: BoxTrackerResult["source"];
  generatedAt: string;
  nextRefreshAt: string;
  cacheStatus: "hit" | "miss" | "stale";
};

type CacheEntry = {
  response: BoxesApiResponse;
  expiresAt: number;
};

type DroppeekGlobal = typeof globalThis & {
  __droppeekBoxesCache?: Map<string, CacheEntry>;
  __droppeekBoxesPending?: Map<string, Promise<CacheEntry>>;
};

const droppeekGlobal = globalThis as DroppeekGlobal;
const boxesCache = droppeekGlobal.__droppeekBoxesCache ?? new Map<string, CacheEntry>();
const pendingFetches = droppeekGlobal.__droppeekBoxesPending ?? new Map<string, Promise<CacheEntry>>();

droppeekGlobal.__droppeekBoxesCache = boxesCache;
droppeekGlobal.__droppeekBoxesPending = pendingFetches;

function setCacheHeaders(res: NextApiResponse) {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${ONE_DAY_IN_SECONDS}, stale-while-revalidate=${HALF_DAY_IN_SECONDS}`
  );
}

async function getBoxesCacheEntry(siteId: string): Promise<CacheEntry> {
  const pendingFetch = pendingFetches.get(siteId);

  if (pendingFetch) {
    return pendingFetch;
  }

  const fetchPromise = fetchLatestBoxes(siteId)
    .then((result) => {
      const generatedAt = new Date();
      const nextRefreshAt = new Date(generatedAt.getTime() + ONE_DAY_IN_MS);
      const entry: CacheEntry = {
        response: {
          siteId,
          boxes: result.boxes,
          topBoxes: result.topBoxes,
          allBoxes: result.allBoxes,
          source: result.source,
          generatedAt: generatedAt.toISOString(),
          nextRefreshAt: nextRefreshAt.toISOString(),
          cacheStatus: "miss",
        },
        expiresAt: nextRefreshAt.getTime(),
      };

      boxesCache.set(siteId, entry);
      return entry;
    })
    .finally(() => {
      pendingFetches.delete(siteId);
    });

  pendingFetches.set(siteId, fetchPromise);
  return fetchPromise;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { siteId } = req.query;

  if (!siteId || typeof siteId !== "string") {
    return res.status(400).json({ error: "Missing siteId" });
  }

  const normalizedSiteId = normalizeSiteId(siteId);
  const cached = boxesCache.get(normalizedSiteId);

  setCacheHeaders(res);

  if (cached && cached.expiresAt > Date.now()) {
    return res.status(200).json({
      ...cached.response,
      cacheStatus: "hit",
    });
  }

  try {
    const entry = await getBoxesCacheEntry(normalizedSiteId);

    return res.status(200).json(entry.response);
  } catch (error) {
    console.error(`Fetch boxes failed for ${normalizedSiteId}:`, error);

    if (cached) {
      return res.status(200).json({
        ...cached.response,
        cacheStatus: "stale",
      });
    }

    return res.status(500).json({ error: "Failed to fetch boxes" });
  }
}
