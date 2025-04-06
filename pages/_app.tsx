import { ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app"; 
import { useRouter } from "next/router"; // ✅ 获取当前 URL
import Navbar from "@/components/ui/Navbar"; // ✅ 确保 Navbar 被引入

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter(); // 获取当前 URL

  return (
    <>
      {/* ✅ 默认 SEO 配置 */}
      <DefaultSeo
        title="Best Mystery Boxes in 2024 | Mystery Box Rankings"
        description="Find the best mystery box websites with verified reviews and exclusive bonuses."
        openGraph={{
          type: "website",
          url: `https://your-site.com${router.asPath}`, // ✅ 动态获取 URL
          title: "Best Mystery Boxes in 2024",
          description:
            "Find the best mystery box websites with verified reviews and exclusive bonuses.",
          images: [{ url: "https://your-site.com/og-image.jpg" }],
        }}
      />

      {/* ✅ Chakra UI 组件包裹所有页面 */}
      <ChakraProvider>
        <Navbar /> {/* ✅ 确保 Navbar 被加载 */}
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
