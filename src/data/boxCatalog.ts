import type { BoxItem } from "@/lib/boxTrackers";
import generatedHypedropCatalog from "./generated/hypedropCatalog.json";

function generatedBoxImage(siteId: string, name: string, theme = "hype") {
  return `/api/boxImage?siteId=${encodeURIComponent(siteId)}&theme=${encodeURIComponent(theme)}&name=${encodeURIComponent(name)}`;
}

const generatedHypedropBoxes = generatedHypedropCatalog.count > 0 ? (generatedHypedropCatalog.boxes as BoxItem[]) : [];

function mergeCatalogBoxes(...catalogs: BoxItem[][]) {
  const seen = new Set<string>();
  const merged: BoxItem[] = [];

  for (const box of catalogs.flat()) {
    const key = box.slug || box.name.toLowerCase();

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    merged.push(box);
  }

  return merged;
}

const curatedHypedropBoxes: BoxItem[] = [
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
    iconUrl: "https://static.hypedrop.com/HypeDrop_I%27m%20lovin%27%20it_Box_Design_Export.png",
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
    price: 3.06,
    iconUrl: "/media/10allinonehypedrop.png",
  },
  {
    name: "Hello Kit",
    slug: "hello-kit",
    price: 45.48,
    iconUrl: "/media/hypedrop-hello-kit.png",
  },
  {
    name: "Denim Tears",
    slug: "denim-tears",
    price: 52.06,
    iconUrl: "/media/be98d-hpyedropdenimtears.png",
  },
  {
    name: "Pajama Party",
    slug: "pajama-party",
    price: 51.03,
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
  {
    name: "Hype Box",
    slug: "hype-box",
    price: 1.15,
    iconUrl: generatedBoxImage("hypedrop", "Hype Box", "hype"),
  },
  {
    name: "Cold Hearts",
    slug: "cold-hearts",
    price: 106.5,
    iconUrl: generatedBoxImage("hypedrop", "Cold Hearts", "luxury"),
  },
  {
    name: "Half A Dunk",
    slug: "half-a-dunk",
    price: 102.9,
    iconUrl: generatedBoxImage("hypedrop", "Half A Dunk", "sneaker"),
  },
  {
    name: "Pack Your Bag",
    slug: "pack-your-bag",
    price: 89.22,
    iconUrl: generatedBoxImage("hypedrop", "Pack Your Bag", "fashion"),
  },
  {
    name: "Fancy Gaming",
    slug: "fancy-gaming",
    price: 9.05,
    iconUrl: generatedBoxImage("hypedrop", "Fancy Gaming", "gaming"),
  },
  {
    name: "Budget Dream",
    slug: "budget-dream",
    price: 0.97,
    iconUrl: generatedBoxImage("hypedrop", "Budget Dream", "hype"),
  },
  {
    name: "iPhone Hunter",
    slug: "iphone-hunter",
    price: 1.08,
    iconUrl: generatedBoxImage("hypedrop", "iPhone Hunter", "gaming"),
  },
  {
    name: "Gaming Only",
    slug: "gaming-only",
    price: 1.73,
    iconUrl: generatedBoxImage("hypedrop", "Gaming Only", "gaming"),
  },
  {
    name: "Feeling Lucky",
    slug: "feeling-lucky",
    price: 2.82,
    iconUrl: generatedBoxImage("hypedrop", "Feeling Lucky", "sneaker"),
  },
  {
    name: "1% Yeezy",
    slug: "1-percent-yeezy",
    price: 4.97,
    iconUrl: generatedBoxImage("hypedrop", "1% Yeezy", "sneaker"),
  },
  {
    name: "Comic Corner",
    slug: "comic-corner",
    price: 40.37,
    iconUrl: generatedBoxImage("hypedrop", "Comic Corner", "collectibles"),
  },
  {
    name: "Regatta Dreams",
    slug: "regatta-dreams",
    price: 67.94,
    iconUrl: generatedBoxImage("hypedrop", "Regatta Dreams", "luxury"),
  },
  {
    name: "In the Bag",
    slug: "in-the-bag",
    price: 3.38,
    iconUrl: generatedBoxImage("hypedrop", "In the Bag", "fashion"),
  },
  {
    name: "Dunkin",
    slug: "dunkin",
    price: 7.92,
    iconUrl: generatedBoxImage("hypedrop", "Dunkin", "food"),
  },
  {
    name: "Black Lotus",
    slug: "black-lotus",
    price: 127.15,
    iconUrl: generatedBoxImage("hypedrop", "Black Lotus", "collectibles"),
  },
  {
    name: "Magic: The Gathering",
    slug: "magic-the-gathering",
    price: 123.46,
    iconUrl: generatedBoxImage("hypedrop", "Magic: The Gathering", "collectibles"),
  },
];

export const curatedBoxCatalog: Record<string, BoxItem[]> = {
  hypedrop: mergeCatalogBoxes(curatedHypedropBoxes, generatedHypedropBoxes),
};
