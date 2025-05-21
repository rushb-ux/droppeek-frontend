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
          //  fallback 静态数据
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
      else if (siteId === "hapabox") {
        return res.status(200).json([
          {
            name: "Apple M4 Chip",
            slug: "apple-m4-chip",
            price: 3.33,
            iconUrl: "https://static.hapabox.com/upload/79a5c2d6377447ecacd1330138f116c2_source.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp"
          },
          {
            name: "Pokemon Treasure",
            slug: "pokemon-treasure",
            price: 15.79,
            iconUrl: "https://static.hapabox.com/upload/271c1d19794a4a4fb59c49ea958abe71_source.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp"
          },
          {
            name: "Gold Coin",
            slug: "gold-coin",
            price: 299.77,
            iconUrl: "https://static.hapabox.com/upload/0650bcc52f904b06a10e28023fe61b18_source.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp"
          },
          {
            name: "50% Lucky Tackle",
            slug: "lucky-tackle",
            price: 19.55,
            iconUrl: "https://static.hapabox.com/upload/092cb2b71fdb4888b5997eb4a6f5b1af_source.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp"
          },
          {
            name: "La Perla Mystery Box",
            slug: "la-perla",
            price: 5.81,
            iconUrl: "https://static.hapabox.com/upload/3455e1a9749c48cdb04db2795aa5164c_source.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_400,h_400/format,webp"
          }
        ]);
      }
      

      else if (siteId === "mysteryboxbrand") {
        return res.status(200).json([
          {
            name: "Free Mystery Box",
            slug: "free-mystery-box",
            price: 0.01,
            iconUrl: "https://mysteryboxbrand.com/storage/box/mu3JfoeWmexKQ8CmKjrQ2JplPA4aIt0eCRwQclY0.webp"
          },
          {
            name: "Apple Box",
            slug: "apple-box",
            price: 9.99,
            iconUrl: "https://mysteryboxbrand.com/storage/box/QEjhcv5ANMeA0TzblkfxmcQBgvP6kDRq4k7oD8CB.png"
          },
          {
            name: "Xbox VS PlayStation",
            slug: "xbox-vs-playstation",
            price: 9.99,
            iconUrl: "https://mysteryboxbrand.com/storage/box/oZdIaCep6L747Dly1GgFMDYU5nBXvPl6kBzDDVmB.png"
          },
          {
            name: "PC Premium",
            slug: "pc-premium",
            price: 34.99,
            iconUrl: "https://mysteryboxbrand.com/storage/box/XAtp0ckyy8qZO1dZVeNrU6s8anaaSr78yuczm2hg.webp"
          },
          {
            name: "Yeezy",
            slug: "yeezy",
            price: 6.99,
            iconUrl: "https://mysteryboxbrand.com/storage/box/PKzFcxopW3xVg8jthbXM6OGucwBK3TiajTZQLaT0.webp"
          }
        ]);
      }
      

      else if (siteId === "rillabox") {
        return res.status(200).json([
          {
            name: "Adidas x BAPE",
            slug: "adidas-bape",
            price: 18.79,
            iconUrl: "https://cdn.rillabox.com/media/boxes/BAPE_X_ADIDAS-mock_box_1.png"
          },
          {
            name: "Adidas x Gucci",
            slug: "adidas-gucci",
            price: 69.99,
            iconUrl: "https://cdn.rillabox.com/media/boxes/GUCCI_X_ADIDAS-mock_box_9ZpKWQf.png"
          },
          {
            name: "Adin Ross",
            slug: "adin-ross",
            price: 12.89,
            iconUrl: "https://cdn.rillabox.com/media/boxes/Adin-Ross_1BsHVRx.png"
          },
          {
            name: "Alienware",
            slug: "alienware",
            price: 14.49,
            iconUrl: "https://cdn.rillabox.com/media/boxes/19-ALIENWARE-Box-mock_box_CQzoSjY.png"
          },
          {
            name: "Amazon",
            slug: "amazon",
            price: 8.89,
            iconUrl: "https://cdn.rillabox.com/media/boxes/Amazon_I2y4LL8.png"
          }
        ]);
      }
      
      
      
      else if (siteId === "JemLit") {
        return res.status(200).json([
          {
            name: "Apple Selection",
            slug: "apple-ebox-boosted",
            price: 66.51,
            iconUrl: "https://d3ht839xyrpcqw.cloudfront.net/195304/conversions/2c3e88c7b1270c44662aeefcd65b236e-default.png"
          },
          {
            name: "Samsung Galaxy",
            slug: "galaxy",
            price: 30.0,
            iconUrl: "https://d3ht839xyrpcqw.cloudfront.net/195316/conversions/7e283b9cd91fd947eeb3c545d7b99a10-default.png"
          },
          {
            name: "Apple Finds",
            slug: "apple-ebox",
            price: 4.07,
            iconUrl: "https://d3ht839xyrpcqw.cloudfront.net/195302/conversions/ee5be33bfc42d68e6b821eb862a65395-default.png"
          },
          {
            name: "Electronics",
            slug: "electronics",
            price: 13.29,
            iconUrl: "https://d3ht839xyrpcqw.cloudfront.net/195855/conversions/4c926bb83a7db2a6daee628ad8e300d4-default.png"
          },
          {
            name: "iPhone 16 Box",
            slug: "iphone-16-pro",
            price: 23.94,
            iconUrl: "https://d3ht839xyrpcqw.cloudfront.net/196046/conversions/d9e046ebdfbf168d17b800f0a7f45a2c-default.png"
          }
        ]);
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
