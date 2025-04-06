import { useEffect, useState } from "react";
import { getReviews, getTopReviews } from "../src/lib/api";
import {
  Box,
  Heading,
  VStack,
  Image,
  Text,
  Link,
  SimpleGrid,
  Button,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/next-js";


// 之后我替换网站
const websites = [
  {
    name: "HypeDrop",
    description: "Popular mystery box platform with gaming focus.",
    image: "/images/hypedrop.jpg",
    url: "/site/hypedrop",
  },
  {
    name: "HypeLoot",
    description: "Luxury-themed mystery box unboxings.",
    image: "/images/hypeloot.jpg",
    url: "/site/hypeloot",
  },
];

type Review = {
  id: number;
  attributes: {
    title: string;
    publishedAt: string;
    rating: number;
    image?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [topReviews, setTopReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchData() {
      const latestReviews = await getReviews();
      const popularReviews = await getTopReviews();
      setReviews(latestReviews.data ?? []);
      setTopReviews(popularReviews.data ?? []);
    }
    fetchData();
  }, []);

  return (
    <Box maxW="1000px" mx="auto" p={4}>
      {/* Hero Section */}
      <Box textAlign="center" py={10}>
        <Heading size="2xl">Best Mystery Box Sites in 2024</Heading>
        <Text mt={2}>Discover the top unboxing platforms and get honest reviews</Text>
      </Box>

      {/* Website Card Grid */}
      <Box mt={10}>
        <Heading size="lg" mb={4}>Recommended Mystery Box Sites</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {websites.map((site, index) => (
            <Link href={site.url} key={index} _hover={{ textDecoration: "none" }}>
              <Box borderWidth={1} borderRadius="lg" p={4}>
                <Image src={site.image} alt={site.name} borderRadius="md" mb={3} />
                <Text fontSize="xl" fontWeight="bold">{site.name}</Text>
                <Text fontSize="sm" color="gray.600">{site.description}</Text>
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
          {reviews.map((review) => (
            <Box key={review.id} borderWidth={1} p={4} borderRadius="md">
              {review.attributes.image?.data?.attributes.url && (
                <Image
                  src={review.attributes.image.data.attributes.url}
                  alt={review.attributes.title}
                  boxSize="100px"
                  mr={4}
                />
              )}
              <Text fontWeight="bold">{review.attributes.title}</Text>
              <Text fontSize="sm" color="gray.500">{review.attributes.publishedAt}</Text>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* FAQ Section */}
      <Box mt={16}>
        <Heading size="lg">FAQ</Heading>
        <Box mt={4}>
          <Text fontWeight="bold">What is a mystery box platform?</Text>
          <Text mb={4} color="gray.600">
            A mystery box platform lets users purchase digital boxes that contain random prizes, often tied to gaming or fashion.
          </Text>
          <Text fontWeight="bold">Is it legit to open mystery boxes online?</Text>
          <Text mb={4} color="gray.600">
            We only recommend platforms that are verified and widely trusted in the community.
          </Text>
        </Box>
      </Box>
      
      <Divider mt={16} />
      <Box as="footer" textAlign="center" py={8} fontSize="sm" color="gray.500">
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



