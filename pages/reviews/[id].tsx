import { useRouter } from "next/router";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { NextSeo } from "next-seo";  // ✅ 引入 next-seo
import sites from "@/data/sites";

export default function ReviewPage() {
  const router = useRouter();
  const { id } = router.query;
  const site = sites.find((s) => s.id === parseInt(id as string));

  if (!site) return <Text>Site not found</Text>;

  return (
    <>
      {/* ✅ 添加动态 SEO */}
      <NextSeo
        title={`${site.name} Review | Mystery Box`}
        description={`Read our detailed review of ${site.name}, including ratings, bonuses, and more.`}
        canonical={`https://your-site.com/reviews/${site.id}`}  // 你的网站 URL
        openGraph={{
          title: `${site.name} Review | Mystery Box`,
          description: `Read our detailed review of ${site.name}, including ratings, bonuses, and more.`,
          url: `https://your-site.com/reviews/${site.id}`,
          type: "article",
          images: [
            {
              url: `https://your-site.com${site.logo}`, // 站点 logo 作为 OG 图片
              width: 800,
              height: 600,
              alt: `${site.name} Logo`,
            },
          ],
        }}
      />

      {/* ✅ 页面主要内容 */}
      <Box maxW="700px" mx="auto" p={4}>
        <Heading>{site.name} Review</Heading>
        <Text fontSize="lg">
          Rating: {site.rating} ⭐
        </Text>
        <Text mt={2}>
          Visit: <a href={site.url} target="_blank">{site.url}</a>
        </Text>
        <Button mt={4} colorScheme="blue" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </Box>
    </>
  );
}
