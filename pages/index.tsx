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
    name: "HypeDrop",
    description: "Popular mystery box platform with gaming focus.",
    url: "https://hypedrop.com/r/droppeek", //opencases05
    domain: "hypedrop.com",
    rating: 3.5,
  },
  {
    name: "HypeLoot",
    description: "Luxury-themed mystery box unboxings.",
    url: "https://hypeloot.com/r/droppekk", //opencases05
    domain: "hypeloot.com",
    rating: 3,
  },
  {
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
    <Box maxW="1000px" mx="auto" p={4}>
      {/* Hero Section */}
      <Box textAlign="center" py={10}>
        <Heading size="2xl">Best Mystery Box Sites in 2025</Heading>
        <Text mt={2}>
          Discover the top unboxing platforms and get honest reviews
        </Text>
      </Box>

      {/* Website Card Grid */}
      <Box mt={10}>
        <Heading size="lg" mb={4}>
          Recommended Mystery Box Sites
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {websites.map((site, index) => (
            <Link
              href={site.url}
              isExternal={site.url.startsWith("http")}
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
  );
}
