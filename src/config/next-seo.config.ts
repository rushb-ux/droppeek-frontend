// src/config/next-seo.config.ts
import { DefaultSeoProps } from "next-seo";

const SEO_CONFIG: DefaultSeoProps = {
  title: "Best Mystery Boxes in 2024 | Mystery Box Guide",
  description: "Find the best mystery box websites with verified reviews and exclusive bonuses.",
  canonical: "https://site1.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://site1.com",
    site_name: "Mystery Box Guide",
    images: [
      {
        url: "https://site1.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mystery Box Guide",
      },
    ],
  },
  twitter: {
    handle: "@yourtwitter",
    site: "@yourtwitter",
    cardType: "summary_large_image",
  },
};

export default SEO_CONFIG;
