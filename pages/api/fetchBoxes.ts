import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    data: {
      boxes: {
        edges: [
          {
            node: {
              name: "Starbucks",
              iconUrl: "https://static.hypedrop.com/HypeDrop_starbuck.png",
              price: 12.02,
            },
          },
          {
            node: {
              name: "McDonalds",
              iconUrl: "https://static.hypedrop.com/HypeDrop_I'm%20lovin'%20it_Box_Design_Export.png",
              price: 6.66,
            },
          },
          {
            node: {
              name: "Battle for Jordans",
              iconUrl: "https://imgix.hypedrop.com/images/HypeDrop_Battle%20for%20Jordans_Box_Design_Export.png",
              price: 21.45,
            },
          },
          {
            node: {
              name: "1 in 10",
              iconUrl: "https://static.hypedrop.com/HypeDrop_1in10.png",
              price: 107.01,
            },
          },
          {
            node: {
              name: "Great Eggspectations",
              iconUrl: "https://static.hypedrop.com/HypeDrop_GREAT-EGGSPECTATIONS.png",
              price: 29.19,
            },
          },
        ],
      },
    },
  });
}
