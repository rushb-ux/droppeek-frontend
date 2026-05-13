import { NextApiRequest, NextApiResponse } from "next";
import { listCatalogAdapters, normalizeSiteId, syncBoxCatalog } from "@/lib/boxTrackers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const siteId = typeof req.query.siteId === "string" ? normalizeSiteId(req.query.siteId) : null;
  const summaries = await syncBoxCatalog(siteId ? [siteId] : undefined);

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    generatedAt: new Date().toISOString(),
    adapters: listCatalogAdapters(),
    summaries,
  });
}
