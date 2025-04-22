import { useEffect, useState } from "react";
import { getTopReviews } from "../src/lib/api";
import { FaStar, FaRegStar } from "react-icons/fa";


import {
  Box,
  Heading,
  VStack,
  Image,
  Text,
  Link,
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
    url: "https://hypedrop.com/r/droppeek", //opencases05
    domain: "hypedrop.com",
    rating: 3.5,
  },
  {
    id: "hypeloot",
    name: "HypeLoot",
    description: "Luxury-themed mystery box unboxings.",
    url: "https://hypeloot.com/r/droppekk", //opencases05
    domain: "hypeloot.com",
    rating: 3,
  },
  {
    id: "lootie",
    name: "Lootie",
    description: "Gaming and hypebeast mystery boxes.",
    url: "https://lootie.com/r/droppeek", //tgvoice70
    domain: "lootie.com",
    rating: 2.5,
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

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchData() {
      const latestReviews = await getTopReviews();
      setReviews(latestReviews.data ?? []);
    }
    fetchData();
  }, []);

  return (
<Box position="relative" minH="100vh" overflow="hidden">
 

  {/* 最底层模糊背景图层 */}
  <Box
    position="absolute"
    top={0}
    left={0}
    right={0}
    bottom={0}
    zIndex={-1}
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
      bgGradient: 'linear(to-b, rgba(255,255,255,0.1) 30%, white 100%)',
    }}
  />

  <Box position="relative" zIndex={1}>

  {/* Hero 框 */}
  <Box
  maxW="1200px"
  mx="auto"
  mt={40}
  px={60}
  py={40}
  borderRadius="xl"
  backgroundImage="url('/images/hero-bg.png')"
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
    bgGradient: 'linear(to-b, rgba(0,0,0,0.85), rgba(0,0,0,0.1))',  // hero背景颜色修改
    zIndex: 1,
  }}
>
  {/* 记录 zIndex > 遮罩 */}
  <Box position="relative" zIndex={2} textAlign="left" color="white">
    <Text fontSize="sm" fontWeight="bold" mb={2}>
      DROPPEEK
    </Text>
    <h1 className="font-poetsen text-6xl mb=2">
      Top Mystery Box Sites Reviewed in 2025
    </h1>
    <Text className="text-3xl" textAlign="center">
      We test and review the most popular unboxing platforms to help you avoid scams and get the best experience.
    </Text>
  </Box>
</Box>

  </Box>

  {/* Card区容器 */}
  <Box
    maxW="1000px"
    mx="auto"
    mt={-20}
    bg="white"
    p={6}
    borderRadius="xl"
    boxShadow="0px 10px 30px #5d995d"
    position="relative"
    zIndex={2}
  >

      {/* Website Card Grid */}
      <Box mt={10}>
        <Heading size="lg" mb={4}>
          Recommended Mystery Box Sites
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {websites.map((site, index) => (
            <Link
              href={`/site/${site.id}`} 
              target={site.url.startsWith("http") ? "_blank" : undefined}
              rel={site.url.startsWith("http") ? "noopener noreferrer" : undefined}
              key={index}
              _hover={{ textDecoration: "none" }}
            >
              <Box
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
                    boxSize="48px"
                  />
                  <HStack spacing={1}>  
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        as={i < Math.floor(site.rating) ? FaStar : FaRegStar}
                        key={i}
                        color={i < site.rating ? "yellow.400" : "gray.300"}
                        boxSize={5}
                      />
                    ))}
                    <Text fontSize="sm" color="gray.600" ml={1}>
                    </Text>
                  </HStack>
                </HStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="xl" fontWeight="bold">{site.name}</Text>
                  <Text fontSize="sm" color="gray.600">{site.description}</Text>
                </VStack>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Box>

      {/* Divider */}
      <Divider my={10} />

      {/* Latest Reviews */}
      <Box>
        <Heading size="lg">Latest Reviews</Heading>
        <VStack spacing={4} align="stretch" mt={4}>
          {reviews.map((review) => {
            const imageUrl =
              review?.attributes?.Image?.data?.attributes?.url;

            return (
              <Box key={review.id} borderWidth={1} p={4} borderRadius="md">
                {imageUrl && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                    alt={review.attributes?.title || "Image"}
                    boxSize="100px"
                    mr={4}
                  />
                )}
                <Text fontWeight="bold">
                  {review.attributes?.title || "Untitled"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {review.attributes?.publishedAt || "Unknown date"}
                </Text>
              </Box>
            );
          })}
        </VStack>
      </Box>

      {/* FAQ Section */}
      <Box mt={16}>
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
    </Box>
    
  );
}
