import { useEffect, useState } from "react";
import { getTopReviews } from "../src/lib/api";
import { FaStar, FaRegStar } from "react-icons/fa";
import { getAllPostSlugs } from "../utils/posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";


import {
  Box,
  Heading,
  VStack,
  Image,
  Text,
  SimpleGrid,
  Divider,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/next-js";

const websites = [
  {
    id: "hypedrop",
    name: "HypeDrop",
    description: "Popular mystery box platform with gaming focus.",
    url: "https://hypedrop.com/r/droppeek",
    domain: "hypedrop.com",
    rating: 4,
    image: "/images/hypedrop.png",
  },
  {
    id: "metadraw",
    name: "MetaDraw",
    description: "Diverse mystery boxes with transparent odds and provably fair draws.",
    url: "https://www.metadraw.com/r/droppeek",
    domain: "metadraw.com",
    rating: 4,
    image: "/images/metadraw.png"
  },  
  {
    id: "hypeloot",
    name: "HypeLoot",
    description: "Luxury-themed mystery box unboxings.",
    url: "https://hypeloot.com/r/droppekk",
    domain: "hypeloot.com",
    rating: 3.5,
    image: "/images/hypeloot.png",
  },
  {
    id: "JemLit",
    name: "JemLit",
    description: "JemLit offers daily mystery box drops with hypebeast, gaming, and tech prizes.",
    url: "https://jemlit.com/en/a/droppeek",
    domain: "jemlit.com",
    rating: 3,
    image: "/images/lootie.png",
  },

  {
    id: "mysteryboxbrand",
    name: "MysteryBoxBrand",
    description: "Premium mystery boxes with high-quality, non-duplicate items.",
    url: "https://mysteryboxbrand.com/r/droppeek",
    domain: "mysteryboxbrand.com",
    rating: 3,
    image: "/images/mysteryboxbrand.png"
  },
  
  {
    id: "rillabox",
    name: "RillaBox",
    description: "Crypto-based mystery boxes with fair odds and 150+ themes.",
    url: "https://rillabox.com/",
    domain: "rillabox.com",
    rating: 3,
    image: "/images/rillabox.png"
  },
  {
    id: "lootie",
    name: "Lootie",
    description: "Gaming and hypebeast mystery boxes.",
    url: "https://lootie.com/r/droppeek",
    domain: "lootie.com",
    rating: 2.5,
    image: "/images/jemlit.png",
  },
  {
    id: "hapabox",
    name: "HapaBox",
    description: "Diverse mystery box games with authentic items and provably fair draws.",
    url: "https://www.hapabox.com/r/droppeek",
    domain: "hapabox.com",
    rating: 4,
    image: "/images/hapabox.png"
  },  

];

type Review = {
  id: number;
  attributes?: {
    title?: string;
    publishedAt?: string;
    rating?: number;
    Image?: {
      data?: {
        attributes?: {
          url?: string;
        };
      };
    };
  };
};

export async function getStaticProps() {
  const posts = getAllPostSlugs(); // 本地文章
  return { props: { posts } };
}


export default function HomePage({ posts }: { posts: { slug: string; title: string; thumbnail?: string | null }[] }) {

  const [showAll, setShowAll] = useState(false);
  const displayedPosts = showAll ? posts : posts.slice(0, 10);
    

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* 最底层模糊背景图层 */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="1100px" 
        zIndex={-2}
        backgroundImage="url('/images/hero-bg.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        filter="blur(30px)"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient: 'linear(to-b, rgba(0,0,0,0.7) 0%, white 100%)',
        }}
      />
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={-1}
        pointerEvents="none"
        bgGradient="linear(to-b, rgba(0,0,0,0.4), rgba(255,255,255,0.1))"
      />
      

      {/* Hero 框 */}
      <Box position="relative" zIndex={1}>
        <Box
          maxW="1200px"
          mx="auto"
          mt={{ base: 20, md: 40 }}
          px={{ base: 6, md: 60 }}
          py={{ base: 10, md: 40 }}
          borderRadius="xl"
          backgroundImage="linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.25)),url('/images/hero-bg.png')"
          backgroundSize="cover"
          backgroundPosition="center"
          position="relative"
          boxShadow="lg"
          overflow="hidden"
          zIndex={1}
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgGradient: 'linear(to-b, rgba(0,0,0,0.85), rgba(0,0,0,0.1))',
            zIndex: 1,
          }}
        >
          <Box position="relative" zIndex={2} textAlign="left" color="white">
            <Text fontSize="sm" fontWeight="bold" mb={2}>
              DROPPEEK
            </Text>
            <div className="text-left px-6 max-w-screen-md">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-poetsen text-left break-words whitespace-normal w-full max-w-screen-md">
                Top Mystery Box Sites Reviewed in 2025
              </h1>
              <Text fontSize={{ base: "md", md: "2xl" }} textAlign={{ base: "left", md: "center" }}>
                We test and review the most popular unboxing platforms to help you avoid scams and get the best experience.
              </Text>
            </div>
          </Box>
        </Box>
      </Box>

      {/* 推荐卡片卡片区块 */}
      <Box
        maxW="1000px"
        mx="auto"
        mt={{ base: -10, md: -20 }}
        mb={12}
        px={{ base: 4, md: 6 }}   
        py={6}
        bg="white"
        borderRadius="xl"
        boxShadow="md"
        zIndex={2}
        position="relative"
      >
        <Heading size="lg" mb={4}>
          Recommended Mystery Box Sites
        </Heading>
        <Box
          as="div"
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
        >
                  
          <HStack spacing={4} minW="max-content" pb={2}>
            {websites.map((site) => (
              <Link
                href={`/site/${site.id}`}
                key={site.id}
                style={{ textDecoration: "none" }}
              >
                <Box
                  w="250px"
                  borderWidth={1}
                  borderColor="gray.200"
                  borderRadius="lg"
                  p={4}
                  minH="200px"
                  transition="all 0.3s ease"
                  boxShadow="sm"
                  _hover={{
                    boxShadow: "lg",
                    borderColor: "blue.400",
                    transform: "translateY(-5px)",
                  }}
                >
                  <HStack justify="space-between" align="center" mb={2}>
                    <Image
                      src={`https://www.google.com/s2/favicons?sz=64&domain=${site.domain}`}
                      alt={`${site.name} logo`}
                      boxSize={{ base: "36px", md: "48px" }}
                    />
                    <HStack spacing={1}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon
                          as={i < Math.floor(site.rating) ? FaStar : FaRegStar}
                          key={i}
                          color={i < site.rating ? "yellow.400" : "gray.300"}
                          boxSize={{ base: 4, md: 5 }}
                        />
                      ))}
                    </HStack>
                  </HStack>
                  <VStack align="start" spacing={1}>
                    <Text fontSize={{ base: "md", md: "xl" }} fontWeight="bold">
                      {site.name}
                    </Text>
                    <Text fontSize={{ base: "sm", md: "sm" }} color="gray.600" noOfLines={3}>
                      {site.description}
                    </Text>
                  </VStack>
                </Box>
              </Link>
            ))}
          </HStack>
        </Box>

      </Box>


      {/* Latest Reviews + Ranking 分栏区域 */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} maxW="1000px" mx="auto" mb={12} alignItems="start" >
        {/* Latest Reviews */}
        <Box
          gridColumn={{ md: "span 2" }}
          bg="transparent"
          p={6}
          borderRadius="xl"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
        >
          <Heading size="lg" mb={4}>Latest Reviews</Heading>
          <VStack spacing={4} align="stretch">

          {displayedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-100 transition">
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-gray-500 text-sm">Lastest Reviews</p>
                </div>
              </div>
            </Link>
          ))}
          {!showAll && posts.length > 10 && (
            <Button onClick={() => setShowAll(true)}>Show More</Button>
          )}
          {showAll && (
            <Button onClick={() => setShowAll(false)}>Show Less</Button>
          )}

          </VStack>
        </Box>


        {/* Top Sites Ranking */}
        <Box
          bg="transparent"
          p={6}
          borderRadius="xl"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
        >

          <Heading size="lg" mb={4}>Top Sites Ranking</Heading>
          <VStack spacing={4} align="stretch">
          {websites.map((site, i) => (
              <Link
                key={site.id}
                href={`/site/${site.id}`}  //生成链接
                style={{ textDecoration: "none" }}
              >
                <Box
                  position="relative"
                  overflow="hidden"
                  borderRadius="lg"
                  height="100px"
                  backgroundImage={`url('${site.image}')`}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "scale(1.02)",
                    boxShadow: "lg",
                  }}
                >
                  <Box position="absolute" inset={0} bg="blackAlpha.700" />
                  <Box position="relative" p={4} color="white">
                    <Text fontSize="sm" color="gray.300">
                      {site.name} Mystery Boxes
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      Ranked #{i + 1}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold">{site.name}</Text>
                  </Box>
                </Box>
              </Link>
            ))}


          </VStack>
        </Box>
      </SimpleGrid>

      {/* FAQ Section */}
      <Box maxW="1000px" mx="auto">
        <Heading size="lg">FAQ</Heading>
        <Box mt={4}>
          <Text fontWeight="bold">What is a mystery box platform?</Text>
          <Text mb={4} color="gray.600">
            A mystery box platform lets users purchase digital boxes that
            contain random prizes, often tied to gaming or fashion.
          </Text>
          <Text fontWeight="bold">
            Is it legit to open mystery boxes online?
          </Text>
          <Text mb={4} color="gray.600">
            We only recommend platforms that are verified and widely trusted in
            the community.
          </Text>
        </Box>
      </Box>
      <Box
        maxW="1000px" // 
        mx="auto"
        mt={8}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        borderColor="gray.200"
        bg="transparent"
      >
        <div className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert('Comment submitted!'); }}>
            <textarea
              placeholder="Write your comment here..."
              className="w-full border rounded p-2 mb-4"
              rows={4}
            ></textarea>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Box>  

      {/* Footer */}
      <Divider mt={16} />
      <Box
        as="footer"
        textAlign="center"
        py={8}
        fontSize="sm"
        color="gray.500"
      >
        <Text>© 2025 Droppeek. All rights reserved.</Text>
        <HStack justify="center" spacing={4} mt={2}>
          <ChakraLink href="/about">About</ChakraLink>
          <ChakraLink href="/contact">Contact</ChakraLink>
          <ChakraLink href="/terms">Terms</ChakraLink>
          <ChakraLink href="/privacy">Privacy</ChakraLink>
        </HStack>
      </Box>
    </Box>
  );
}