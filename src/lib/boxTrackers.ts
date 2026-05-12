export type BoxItem = {
  name: string;
  slug: string;
  price: number;
  iconUrl: string;
};

export type BoxTrackerResult = {
  boxes: BoxItem[];
  topBoxes: BoxItem[];
  source: "live" | "fallback";
};

const LATEST_BOX_LIMIT = 10;
const TOP_BOX_LIMIT = 5;

const fallbackBoxes: Record<string, BoxItem[]> = {
  hypedrop: [
    {
      name: "Starbucks",
      slug: "starbucks",
      price: 12.02,
      iconUrl: "https://static.hypedrop.com/HypeDrop_starbuck.png",
    },
    {
      name: "McDonalds",
      slug: "mcdonalds",
      price: 6.66,
      iconUrl: "https://static.hypedrop.com/HypeDrop_I'm%20lovin'%20it_Box_Design_Export.png",
    },
    {
      name: "Battle for Jordans",
      slug: "battle-for-jordans",
      price: 21.45,
      iconUrl: "https://imgix.hypedrop.com/images/HypeDrop_Battle%20for%20Jordans_Box_Design_Export.png",
    },
    {
      name: "1 in 10",
      slug: "1-in-10",
      price: 107.01,
      iconUrl: "https://static.hypedrop.com/HypeDrop_1in10.png",
    },
    {
      name: "Great Eggspectations",
      slug: "great-eggspectations",
      price: 29.19,
      iconUrl: "https://static.hypedrop.com/HypeDrop_GREAT-EGGSPECTATIONS.png",
    },
    {
      name: "10 All In One",
      slug: "10-all-in-one",
      price: 10.00,
      iconUrl: "/media/10allinonehypedrop.png",
    },
    {
      name: "Pajama Party",
      slug: "pajama-party",
      price: 5.00,
      iconUrl: "/media/pajamaparty.png",
    },
    {
      name: "Nail Salon",
      slug: "nail-salon",
      price: 2.99,
      iconUrl: "/media/nailsalon.png",
    },
    {
      name: "Black Ops",
      slug: "black-ops",
      price: 14.99,
      iconUrl: "/media/75155-hypedropblackops.png",
    },
    {
      name: "Small Juicer",
      slug: "small-juicer",
      price: 6.99,
      iconUrl: "/media/af4dc-hypedrop-small-juicer.png",
    },
  ],
  hapabox: [
    {
      name: "Apple M4 Chip",
      slug: "apple-m4-chip",
      price: 3.33,
      iconUrl: "https://static.hapabox.com/upload/79a5c2d6377447ecacd1330138f116c2_source.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp",
    },
    {
      name: "Pokemon Treasure",
      slug: "pokemon-treasure",
      price: 15.79,
      iconUrl: "https://static.hapabox.com/upload/271c1d19794a4a4fb59c49ea958abe71_source.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp",
    },
    {
      name: "Gold Coin",
      slug: "gold-coin",
      price: 299.77,
      iconUrl: "https://static.hapabox.com/upload/0650bcc52f904b06a10e28023fe61b18_source.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp",
    },
    {
      name: "50% Lucky Tackle",
      slug: "lucky-tackle",
      price: 19.55,
      iconUrl: "https://static.hapabox.com/upload/092cb2b71fdb4888b5997eb4a6f5b1af_source.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp",
    },
    {
      name: "La Perla Mystery Box",
      slug: "la-perla",
      price: 5.81,
      iconUrl: "https://static.hapabox.com/upload/3455e1a9749c48cdb04db2795aa5164c_source.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp",
    },
    { name: "1% Chance", slug: "one-percent-chance", price: 1.00, iconUrl: "/images/hapabox.png" },
    { name: "10% Shock", slug: "ten-percent-shock", price: 10.00, iconUrl: "/images/hapabox.png" },
    { name: "10% Victory", slug: "ten-percent-victory", price: 10.00, iconUrl: "/images/hapabox.png" },
    { name: "Treasure Hunt", slug: "treasure-hunt", price: 12.99, iconUrl: "/images/hapabox.png" },
    { name: "Bingo King", slug: "bingo-king", price: 15.99, iconUrl: "/images/hapabox.png" },
  ],
  metadraw: [
    { name: "Tight Budget", slug: "tight-budget", price: 0.16, iconUrl: "/images/Tight Budget.png" },
    { name: "Play The Card Right", slug: "play-the-card-right", price: 0.28, iconUrl: "/images/Play The Card Right.png" },
    { name: "Budget Shoes", slug: "budget-shoes", price: 0.51, iconUrl: "/images/Budget Shoes.png" },
    { name: "Cheap Dream", slug: "cheap-dream", price: 0.52, iconUrl: "/images/Cheap Dream.png" },
    { name: "Budget Box", slug: "budget-box", price: 2.22, iconUrl: "/images/Budget box.png" },
    { name: "Streamer Box", slug: "streamer-box", price: 4.99, iconUrl: "/images/metadraw.png" },
    { name: "GoPro Box", slug: "gopro-box", price: 7.99, iconUrl: "/images/metadraw.png" },
    { name: "For Her Box", slug: "for-her-box", price: 9.99, iconUrl: "/images/metadraw.png" },
    { name: "Tech Box", slug: "tech-box", price: 14.99, iconUrl: "/images/metadraw.png" },
    { name: "Luxury Box", slug: "luxury-box", price: 49.00, iconUrl: "/images/metadraw.png" },
  ],
  mysteryboxbrand: [
    {
      name: "Free Mystery Box",
      slug: "free-mystery-box",
      price: 0.01,
      iconUrl: "https://mysteryboxbrand.com/storage/box/mu3JfoeWmexKQ8CmKjrQ2JplPA4aIt0eCRwQclY0.webp",
    },
    {
      name: "Apple Box",
      slug: "apple-box",
      price: 9.99,
      iconUrl: "https://mysteryboxbrand.com/storage/box/QEjhcv5ANMeA0TzblkfxmcQBgvP6kDRq4k7oD8CB.png",
    },
    {
      name: "Xbox VS PlayStation",
      slug: "xbox-vs-playstation",
      price: 9.99,
      iconUrl: "https://mysteryboxbrand.com/storage/box/oZdIaCep6L747Dly1GgFMDYU5nBXvPl6kBzDDVmB.png",
    },
    {
      name: "PC Premium",
      slug: "pc-premium",
      price: 34.99,
      iconUrl: "https://mysteryboxbrand.com/storage/box/XAtp0ckyy8qZO1dZVeNrU6s8anaaSr78yuczm2hg.webp",
    },
    {
      name: "Yeezy",
      slug: "yeezy",
      price: 6.99,
      iconUrl: "https://mysteryboxbrand.com/storage/box/PKzFcxopW3xVg8jthbXM6OGucwBK3TiajTZQLaT0.webp",
    },
    { name: "iPhone 14", slug: "iphone-14", price: 14.99, iconUrl: "/images/mysteryboxbrand.png" },
    { name: "Amazon Mystery", slug: "amazon-mystery", price: 9.99, iconUrl: "/images/mysteryboxbrand.png" },
    { name: "Sneaker Box", slug: "sneaker-box", price: 19.99, iconUrl: "/images/mysteryboxbrand.png" },
    { name: "Luxury Mystery", slug: "luxury-mystery", price: 49.99, iconUrl: "/images/mysteryboxbrand.png" },
    { name: "Gaming Mystery", slug: "gaming-mystery", price: 24.99, iconUrl: "/images/mysteryboxbrand.png" },
  ],
  rillabox: [
    { name: "Adidas x BAPE", slug: "adidas-bape", price: 18.79, iconUrl: "https://cdn.rillabox.com/media/boxes/BAPE_X_ADIDAS-mock_box_1.png" },
    { name: "Adidas x Gucci", slug: "adidas-gucci", price: 69.99, iconUrl: "https://cdn.rillabox.com/media/boxes/GUCCI_X_ADIDAS-mock_box_9ZpKWQf.png" },
    { name: "Adin Ross", slug: "adin-ross", price: 12.89, iconUrl: "https://cdn.rillabox.com/media/boxes/Adin-Ross_1BsHVRx.png" },
    { name: "Alienware", slug: "alienware", price: 14.49, iconUrl: "https://cdn.rillabox.com/media/boxes/19-ALIENWARE-Box-mock_box_CQzoSjY.png" },
    { name: "Amazon", slug: "amazon", price: 8.89, iconUrl: "https://cdn.rillabox.com/media/boxes/Amazon_I2y4LL8.png" },
    { name: "Apple Tech", slug: "apple-tech", price: 19.99, iconUrl: "/images/rillabox.png" },
    { name: "Sneaker Vault", slug: "sneaker-vault", price: 24.99, iconUrl: "/images/rillabox.png" },
    { name: "Streetwear Drop", slug: "streetwear-drop", price: 14.99, iconUrl: "/images/rillabox.png" },
    { name: "Gaming Setup", slug: "gaming-setup", price: 29.99, iconUrl: "/images/rillabox.png" },
    { name: "Luxury Picks", slug: "luxury-picks", price: 49.99, iconUrl: "/images/rillabox.png" },
  ],
  jemlit: [
    {
      name: "Apple Selection",
      slug: "apple-ebox-boosted",
      price: 66.51,
      iconUrl: "https://d3ht839xyrpcqw.cloudfront.net/195304/conversions/2c3e88c7b1270c44662aeefcd65b236e-default.png",
    },
    {
      name: "Samsung Galaxy",
      slug: "galaxy",
      price: 30,
      iconUrl: "https://d3ht839xyrpcqw.cloudfront.net/195316/conversions/7e283b9cd91fd947eeb3c545d7b99a10-default.png",
    },
    {
      name: "Apple Finds",
      slug: "apple-ebox",
      price: 4.07,
      iconUrl: "https://d3ht839xyrpcqw.cloudfront.net/195302/conversions/ee5be33bfc42d68e6b821eb862a65395-default.png",
    },
    {
      name: "Electronics",
      slug: "electronics",
      price: 13.29,
      iconUrl: "https://d3ht839xyrpcqw.cloudfront.net/195855/conversions/4c926bb83a7db2a6daee628ad8e300d4-default.png",
    },
    {
      name: "iPhone 16 Box",
      slug: "iphone-16-pro",
      price: 23.94,
      iconUrl: "https://d3ht839xyrpcqw.cloudfront.net/196046/conversions/d9e046ebdfbf168d17b800f0a7f45a2c-default.png",
    },
    { name: "Digital Discovery", slug: "digital-discovery", price: 9.99, iconUrl: "/images/jemlit.png" },
    { name: "Galaxy Z Flip", slug: "galaxy-z-flip", price: 34.99, iconUrl: "/images/jemlit.png" },
    { name: "Gaming Mystery", slug: "gaming-mystery", price: 19.99, iconUrl: "/images/jemlit.png" },
    { name: "Luxury Tech", slug: "luxury-tech", price: 49.99, iconUrl: "/images/jemlit.png" },
    { name: "Budget Finds", slug: "budget-finds", price: 2.99, iconUrl: "/images/jemlit.png" },
  ],
  lootie: [
    { name: "Hype x Tech", slug: "hype-x-tech", price: 2.99, iconUrl: "https://media.lootie.com/images/case-images/OFFCL_Hypebeast_2.png?quality=75&width=180" },
    { name: "Supreme X Louis Vuitton", slug: "supreme-x-louis-vuitton", price: 29.99, iconUrl: "https://media.lootie.com/images/case-images/OFFCL_2024_300x300_33.png?quality=75&width=170" },
    { name: "iPhone 15", slug: "iphone-box", price: 4.99, iconUrl: "https://media.lootie.com/images/case-images/OFFCL_Iphone_15.png?quality=75&width=170" },
    { name: "Off-White Lucky", slug: "off-white-lucky-zh1067om7", price: 4.99, iconUrl: "https://media.lootie.com/images/case-images/OFFCL_Box_offwhite_3.png?quality=75&width=170" },
    { name: "Jordan Heaven", slug: "jordan-heaven", price: 19.99, iconUrl: "https://media.lootie.com/images/case-images/OFFCL_Box_jordan_1.png?quality=75&width=170" },
    { name: "Lucky Dunky", slug: "lucky-dunky", price: 9.99, iconUrl: "/images/lootie.png" },
    { name: "Apple Starter", slug: "apple-starter", price: 4.99, iconUrl: "/images/lootie.png" },
    { name: "Designer Finds", slug: "designer-finds", price: 14.99, iconUrl: "/images/lootie.png" },
    { name: "Gaming Gear", slug: "gaming-gear", price: 19.99, iconUrl: "/images/lootie.png" },
    { name: "Streetwear Mystery", slug: "streetwear-mystery", price: 24.99, iconUrl: "/images/lootie.png" },
  ],
  hypeloot: [
    { name: "Cheap Starter", slug: "cheap-starter", price: 0.59, iconUrl: "/images/hypeloot.png" },
    { name: "Nike Budget", slug: "nike-budget", price: 0.8, iconUrl: "/images/hypeloot.png" },
    { name: "Dunk Low", slug: "dunk-low", price: 63.68, iconUrl: "/images/hypeloot.png" },
    { name: "GoPro Box", slug: "gopro-box", price: 18.68, iconUrl: "/images/hypeloot.png" },
    { name: "Mixed Designer", slug: "mixed-designer", price: 115.88, iconUrl: "/images/hypeloot.png" },
    { name: "Sneaker Starter", slug: "sneaker-starter", price: 4.99, iconUrl: "/images/hypeloot.png" },
    { name: "Streetwear Box", slug: "streetwear-box", price: 9.99, iconUrl: "/images/hypeloot.png" },
    { name: "Gaming Gear", slug: "gaming-gear", price: 14.99, iconUrl: "/images/hypeloot.png" },
    { name: "Apple Tech", slug: "apple-tech", price: 24.99, iconUrl: "/images/hypeloot.png" },
    { name: "Luxury Watch", slug: "luxury-watch", price: 49.99, iconUrl: "/images/hypeloot.png" },
  ],
};

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
  };
}

function isBoxItem(box: BoxItem | null): box is BoxItem {
  return box !== null;
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

  return boxes.slice(0, first);
}

async function fetchHypedropTracker(): Promise<BoxTrackerResult> {
  const topBoxes = await fetchHypedropBoxes("RECOMMENDED", TOP_BOX_LIMIT);

  try {
    return {
      boxes: await fetchHypedropBoxes("NEWEST", LATEST_BOX_LIMIT),
      topBoxes,
      source: "live",
    };
  } catch {
    return {
      boxes: topBoxes,
      topBoxes,
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
  const boxes = mapHapaboxRows(latestRows).slice(0, LATEST_BOX_LIMIT);
  const topBoxes = mapHapaboxRows(rows).slice(0, TOP_BOX_LIMIT);

  if (boxes.length === 0) {
    throw new Error("HapaBox response did not include valid boxes");
  }

  return { boxes, topBoxes, source: "live" };
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

  return {
    boxes: boxes.slice(0, LATEST_BOX_LIMIT),
    topBoxes: boxes.slice(0, TOP_BOX_LIMIT),
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

    return mapMysteryBoxBrandRows(rankedRows).slice(0, TOP_BOX_LIMIT);
  } catch {
    return mapMysteryBoxBrandRows(rows).slice(0, TOP_BOX_LIMIT);
  }
}

async function fetchMysteryBoxBrandTracker(): Promise<BoxTrackerResult> {
  const rows = await fetchMysteryBoxBrandRows();
  const latestRows = [...rows].sort(
    (a: any, b: any) => new Date(b?.updated_at ?? 0).getTime() - new Date(a?.updated_at ?? 0).getTime()
  );
  const boxes = mapMysteryBoxBrandRows(latestRows).slice(0, LATEST_BOX_LIMIT);
  const topBoxes = await fetchMysteryBoxBrandTopBoxes(rows);

  if (boxes.length === 0) {
    throw new Error("MysteryBoxBrand response did not include valid boxes");
  }

  return { boxes, topBoxes, source: "live" };
}

const liveFetchers: Record<string, () => Promise<BoxTrackerResult>> = {
  hypedrop: fetchHypedropTracker,
  hapabox: fetchHapaboxTracker,
  jemlit: fetchJemlitTracker,
  mysteryboxbrand: fetchMysteryBoxBrandTracker,
};

export async function fetchLatestBoxes(siteId: string): Promise<BoxTrackerResult> {
  const normalizedSiteId = normalizeSiteId(siteId);
  const fallback = fallbackBoxes[normalizedSiteId] ?? [];
  const liveFetcher = liveFetchers[normalizedSiteId];

  if (!liveFetcher) {
    return {
      boxes: fallback.slice(0, LATEST_BOX_LIMIT),
      topBoxes: fallback.slice(0, TOP_BOX_LIMIT),
      source: "fallback",
    };
  }

  try {
    return await liveFetcher();
  } catch (error) {
    console.error(`Failed to fetch live boxes for ${normalizedSiteId}:`, error);
    return {
      boxes: fallback.slice(0, LATEST_BOX_LIMIT),
      topBoxes: fallback.slice(0, TOP_BOX_LIMIT),
      source: "fallback",
    };
  }
}
