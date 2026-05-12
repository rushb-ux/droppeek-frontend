import { NextApiRequest, NextApiResponse } from "next";
import { fetchLatestBoxes, normalizeSiteId } from "@/lib/boxTrackers";

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
const HALF_DAY_IN_SECONDS = 60 * 60 * 12;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { siteId } = req.query;

  if (!siteId || typeof siteId !== "string") {
    return res.status(400).json({ error: "Missing siteId" });
  }

  const normalizedSiteId = normalizeSiteId(siteId);
  const generatedAt = new Date();
  const nextRefreshAt = new Date(generatedAt.getTime() + ONE_DAY_IN_SECONDS * 1000);

  try {
    const result = await fetchLatestBoxes(normalizedSiteId);

    res.setHeader(
      "Cache-Control",
      `public, s-maxage=${ONE_DAY_IN_SECONDS}, stale-while-revalidate=${HALF_DAY_IN_SECONDS}`
    );

    return res.status(200).json({
      siteId: normalizedSiteId,
      boxes: result.boxes,
      topBoxes: result.topBoxes,
      allBoxes: result.allBoxes,
      source: result.source,
      generatedAt: generatedAt.toISOString(),
      nextRefreshAt: nextRefreshAt.toISOString(),
    });
  } catch (error) {
    console.error(`Fetch boxes failed for ${normalizedSiteId}:`, error);
    return res.status(500).json({ error: "Failed to fetch boxes" });
  }
}
