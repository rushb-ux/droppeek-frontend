import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { siteId } = req.query;
  if (!siteId || typeof siteId !== "string") {
    return res.status(400).json({ error: "Missing siteId" });
  }

  try {
    let boxes: any[] = [];

    if (siteId === "hypedrop") {
        try {
          const response = await fetch("https://hypedrop.com/api/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "Mozilla/5.0"
            },
            body: JSON.stringify({
              operationName: "BoxesPage",
              variables: { filters: {}, orderBy: "RECOMMENDED", first: 5 },
              query: `query BoxesPage { boxes(orderBy: RECOMMENDED, first: 5) { edges { node { name price iconUrl slug } } } }`
            })
          });
      
          if (!response.ok) throw new Error("Live fetch failed");
      
          const json = await response.json();
          boxes = json.data.boxes.edges.map((e: any) => e.node);
        } catch (e) {
          // 🟡 fallback 静态数据
          boxes = [
            {
              name: "Starbucks",
              slug: "starbucks",
              price: 12.02,
              iconUrl: "https://static.hypedrop.com/HypeDrop_starbuck.png"
            },
            {
              name: "McDonalds",
              slug: "mcdonalds",
              price: 6.66,
              iconUrl: "https://static.hypedrop.com/HypeDrop_I'm%20lovin'%20it_Box_Design_Export.png"
            },
            {
              name: "Battle for Jordans",
              slug: "battle-for-jordans",
              price: 21.45,
              iconUrl: "https://imgix.hypedrop.com/images/HypeDrop_Battle%20for%20Jordans_Box_Design_Export.png"
            },
            {
              name: "1 in 10",
              slug: "1-in-10",
              price: 107.01,
              iconUrl: "https://static.hypedrop.com/HypeDrop_1in10.png"
            },
            {
              name: "Great Eggspectations",
              slug: "great-eggspectations",
              price: 29.19,
              iconUrl: "https://static.hypedrop.com/HypeDrop_GREAT-EGGSPECTATIONS.png"
            }
          ];
        }
      }
      

      else if (siteId === "lootie") {
        boxes = [
          {
            name: "Hype x Tech",
            slug: "hype-x-tech",
            price: 2.99,
            iconUrl: "https://media.lootie.com/images/case-images/OFFCL_Hypebeast_2.png?quality=75&width=180"
          },
          {
            name: "Supreme X Louis Vuitton",
            slug: "supreme-x-louis-vuitton",
            price: 29.99,
            iconUrl: "https://media.lootie.com/images/case-images/OFFCL_2024_300x300_33.png?quality=75&width=170"
          },
          {
            name: "iPhone 15",
            slug: "iphone-box",
            price: 4.99,
            iconUrl: "https://media.lootie.com/images/case-images/OFFCL_Iphone_15.png?quality=75&width=170"
          },
          {
            name: "Off-White Lucky",
            slug: "off-white-lucky-zh1067om7",
            price: 4.99,
            iconUrl: "https://media.lootie.com/images/case-images/OFFCL_Box_offwhite_3.png?quality=75&width=170"
          },
          {
            name: "Jordan Heaven",
            slug: "jordan-heaven",
            price: 19.99,
            iconUrl: "https://media.lootie.com/images/case-images/OFFCL_Box_jordan_1.png?quality=75&width=170"
          }
        ];
      }

    else if (siteId === "hypeloot") {
      boxes = [
        {
          name: "Cheap Starter",
          slug: "cheap-starter",
          price: 0.59,
          iconUrl: "https://cdn.hypeloot.com/_prod_/storage/boxes/09a3ad7e-48b4-4548-9032-5f53a2020ba4.png?w=220"
        },
        {
          name: "Dunk Low",
          slug: "dunk-low",
          price: 63.68,
          iconUrl: "https://cdn.hypeloot.com/_prod_/storage/boxes/bc9b066c-7604-4aa5-8af5-53995307c437.png?w=220"
        },
        {
          name: "Mixed Designer",
          slug: "mixed-designer",
          price: 115.88,
          iconUrl: "https://cdn.hypeloot.com/_prod_/storage/boxes/e7df9a5f-dab8-4fd2-9d75-21d987d3e772.png?w=220"
        },
        {
          name: "Nike Budget",
          slug: "nike-budget",
          price: 0.8,
          iconUrl: "https://cdn.hypeloot.com/_prod_/storage/boxes/80a8186b-1cd6-49f1-9b31-101d0ba65b60.png?w=220"
        },
        {
          name: "GoPro Box",
          slug: "gopro-box",
          price: 18.68,
          iconUrl: "https://cdn.hypeloot.com/_prod_/storage/boxes/0f78f489-071e-41a7-b07f-5438e7c80a84.png?w=220"
        }
      ];
    }

    return res.status(200).json(boxes);
  } catch (e) {
    console.error("Fetch failed:", e);
    return res.status(500).json({ error: "Failed to fetch boxes" });
  }
}
