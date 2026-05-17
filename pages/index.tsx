import { useState } from "react";
import { FaStar, FaChevronRight, FaChevronDown, FaChevronUp, FaShieldAlt, FaDatabase, FaChartLine } from "react-icons/fa";
import { getAllPostSlugs } from "../utils/posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DisqusThread from "@/components/ui/DisqusThread";

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
  Badge,
  Flex,
  Container,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/next-js";

// FAQ Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Box
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{ borderColor: "blue.300", boxShadow: "md" }}
    >
      <Button
        w="full"
        h="auto"
        p={6}
        bg="transparent"
        justifyContent="space-between"
        borderRadius="none"
        _hover={{ bg: "gray.50" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text fontSize="lg" fontWeight="bold" color="gray.800" textAlign="left">
          {question}
        </Text>
        <Icon
          as={isOpen ? FaChevronUp : FaChevronDown}
          color="blue.500"
          boxSize={5}
        />
      </Button>
      
      <Box
        overflow="hidden"
        maxH={isOpen ? "500px" : "0"}
        transition="max-height 0.3s ease"
      >
        <Box p={6} pt={0}>
          <Text color="gray.600" lineHeight="tall" whiteSpace="pre-line">
            {answer}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

const websites = [
  {
    id: "hypedrop",
    name: "HypeDrop",
    description: "Popular mystery box platform with gaming focus.",
    url: "https://hypedrop.com/r/droppeek",
    domain: "hypedrop.com",
    rating: 4,
    image: "/images/hypedrop.png",
    trackedBoxes: "652",
    catalogStatus: "Live + snapshot",
    bonus: "20% deposit",
    risk: "Medium",
    bestFor: "Largest tracked catalog",
  },
  {
    id: "metadraw",
    name: "MetaDraw",
    description: "Diverse mystery boxes with transparent odds and provably fair draws.",
    url: "https://www.metadraw.com/r/droppeek",
    domain: "metadraw.com",
    rating: 4,
    image: "/images/metadraw.png",
    trackedBoxes: "Live",
    catalogStatus: "API detected",
    bonus: "Review bonus",
    risk: "Low",
    bestFor: "Provably fair boxes",
  },  
  {
    id: "JemLit",
    name: "JemLit",
    description: "JemLit offers daily mystery box drops with hypebeast, gaming, and tech prizes.",
    url: "https://jemlit.com/en/a/droppeek",
    domain: "jemlit.com",
    rating: 3,
    image: "/images/jemlit.png",
    trackedBoxes: "Page scan",
    catalogStatus: "Page adapter",
    bonus: "Referral offer",
    risk: "Medium",
    bestFor: "Hypebeast drops",
  },
  {
    id: "mysteryboxbrand",
    name: "MysteryBoxBrand",
    description: "Premium mystery boxes with high-quality, non-duplicate items.",
    url: "https://mysteryboxbrand.com/r/droppeek",
    domain: "mysteryboxbrand.com",
    rating: 3,
    image: "/images/mysteryboxbrand.png",
    trackedBoxes: "Live",
    catalogStatus: "API detected",
    bonus: "Promo available",
    risk: "Medium",
    bestFor: "Premium boxes",
  },
  {
    id: "rillabox",
    name: "RillaBox",
    description: "Crypto-based mystery boxes with fair odds and 150+ themes.",
    url: "https://rillabox.com/",
    domain: "rillabox.com",
    rating: 3,
    image: "/images/rillabox.png",
    trackedBoxes: "Manual",
    catalogStatus: "Needs adapter",
    bonus: "Crypto-friendly",
    risk: "Medium",
    bestFor: "Crypto deposits",
  },
  {
    id: "lootie",
    name: "Lootie",
    description: "Gaming and hypebeast mystery boxes.",
    url: "https://lootie.com/r/droppeek",
    domain: "lootie.com",
    rating: 2.5,
    image: "/images/lootie.png",
    trackedBoxes: "Unavailable",
    catalogStatus: "No live catalog",
    bonus: "40% deposit",
    risk: "High",
    bestFor: "Risk research",
  },
  {
    id: "hapabox",
    name: "HapaBox",
    description: "Diverse mystery box games with authentic items and provably fair draws.",
    url: "https://www.hapabox.com/r/droppeek",
    domain: "hapabox.com",
    rating: 4,
    image: "/images/hapabox.png",
    trackedBoxes: "Live",
    catalogStatus: "API detected",
    bonus: "$50 box",
    risk: "Low",
    bestFor: "Game modes",
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
  const posts = getAllPostSlugs();
  return { props: { posts } };
}

export default function HomePage({ posts }: { posts: { slug: string; title: string; thumbnail?: string | null }[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayedPosts = showAll ? posts : posts.slice(0, 10);
  const riskScore = { High: 3, Medium: 2, Low: 1 } as const;
  const trendGroups = [
    {
      title: "Top Rated",
      description: "Highest current Droppeek review scores.",
      items: [...websites].sort((a, b) => b.rating - a.rating).slice(0, 5),
      value: (site: (typeof websites)[number]) => `${site.rating}/5`,
    },
    {
      title: "Catalog Coverage",
      description: "Platforms with the strongest box catalog visibility.",
      items: [websites[0], websites[6], websites[1], websites[3], websites[2]],
      value: (site: (typeof websites)[number]) => site.trackedBoxes,
    },
    {
      title: "Risk Watch",
      description: "Platforms worth reading carefully before opening boxes.",
      items: [...websites].sort((a, b) => riskScore[b.risk as keyof typeof riskScore] - riskScore[a.risk as keyof typeof riskScore]).slice(0, 5),
      value: (site: (typeof websites)[number]) => `${site.risk} risk`,
    },
  ];
  const categories = [
    { label: "Gaming", count: "236 boxes" },
    { label: "Sneakers", count: "118 boxes" },
    { label: "Watches", count: "94 boxes" },
    { label: "Tech", count: "88 boxes" },
    { label: "TCG", count: "73 boxes" },
    { label: "Luxury", count: "67 boxes" },
    { label: "Crypto-friendly", count: "3 platforms" },
    { label: "High Risk", count: "1 platform" },
  ];

  return (
    <Box position="relative" minH="100vh" overflow="hidden" bg="#F3F6FA">
      {/* Hero Section */}
      <Box
        position="relative"
        bg="#F8FAFD"
        borderBottom="1px solid"
        borderColor="blue.100"
      >
        <Container maxW="1200px" pt={{ base: 12, md: 16 }} pb={{ base: 10, md: 14 }}>
          <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 8, lg: 14 }} align="center">
            <VStack spacing={7} align={{ base: "center", lg: "flex-start" }} flex="1.1">
              <Badge
                bg="blue.50"
                color="blue.700"
                border="1px solid"
                borderColor="blue.100"
                borderRadius="md"
                px={3}
                py={1}
                textTransform="uppercase"
                fontSize="xs"
              >
                Mystery box radar for 2026
              </Badge>

              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl" }}
                lineHeight="1"
                letterSpacing="0"
                textAlign={{ base: "center", lg: "left" }}
                maxW="760px"
                color="gray.900"
              >
                Explore mystery box platforms and spot safer openings.
              </Heading>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                maxW="700px"
                color="gray.600"
                lineHeight="1.75"
                textAlign={{ base: "center", lg: "left" }}
              >
                Track platform rankings, live box catalogs, promo offers, and risk signals in one place.
                Droppeek is moving from static reviews into a searchable mystery box intelligence layer.
              </Text>

              <HStack spacing={3} wrap="wrap" justify={{ base: "center", lg: "flex-start" }}>
                <Link href="/platforms" style={{ textDecoration: "none" }}>
                  <Button colorScheme="blue" size="lg" borderRadius="md">
                    View Rankings
                  </Button>
                </Link>
                <Link href="/site/hypedrop" style={{ textDecoration: "none" }}>
                  <Button
                    size="lg"
                    borderRadius="md"
                    variant="outline"
                    bg="white"
                    borderColor="gray.300"
                    color="gray.800"
                    _hover={{ bg: "gray.50" }}
                  >
                    Inspect #1 Platform
                  </Button>
                </Link>
              </HStack>
            </VStack>

            <SimpleGrid
              columns={{ base: 2, sm: 4, lg: 2 }}
              spacing={3}
              flex="0.9"
              w="full"
            >
              {[
                { label: "Tracked Boxes", value: "650+", icon: FaDatabase },
                { label: "Reviewed Platforms", value: "7", icon: FaShieldAlt },
                { label: "Catalog Checks", value: "Daily", icon: FaChartLine },
                { label: "Live/API Sources", value: "4", icon: FaStar },
              ].map((metric) => (
                <Box
                  key={metric.label}
                  bg="white"
                  border="1px solid"
                  borderColor="blue.100"
                  borderRadius="md"
                  p={5}
                >
                  <Icon as={metric.icon} color="blue.500" boxSize={5} mb={5} />
                  <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" lineHeight="1" color="gray.900">
                    {metric.value}
                  </Text>
                  <Text fontSize="xs" color="gray.500" textTransform="uppercase" mt={2}>
                    {metric.label}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Flex>
        </Container>
      </Box>

      {/* Radar Overview Section */}
      <Box bg="#F3F6FA" py={{ base: 8, md: 12 }} position="relative" zIndex={2}>
        <Container maxW="1200px">
          <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} mb={6} gap={4} direction={{ base: "column", md: "row" }}>
            <VStack align="flex-start" spacing={1}>
              <Heading size="lg" color="gray.900">
                Trending Platforms
              </Heading>
              <Text color="gray.600">
                Fast scanning panels for ratings, catalog visibility, and risk.
              </Text>
            </VStack>
            <Badge colorScheme="green" fontSize="sm" px={3} py={1} borderRadius="md" fontWeight="semibold">
              Daily catalog checks
            </Badge>
          </Flex>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4} mb={8}>
            {trendGroups.map((group) => (
              <Box
                key={group.title}
                bg="white"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                overflow="hidden"
              >
                <Box px={5} py={4} borderBottom="1px solid" borderColor="gray.200">
                  <Heading size="md" color="gray.900">
                    {group.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    {group.description}
                  </Text>
                </Box>
                <VStack spacing={0} align="stretch">
                  {group.items.map((site, index) => (
                    <Link href={`/site/${site.id}`} key={`${group.title}-${site.id}`} style={{ textDecoration: "none" }}>
                      <Flex
                        align="center"
                        justify="space-between"
                        gap={3}
                        px={5}
                        py={3}
                        borderBottom={index === group.items.length - 1 ? "0" : "1px solid"}
                        borderColor="gray.100"
                        _hover={{ bg: "blue.50" }}
                      >
                        <HStack spacing={3}>
                          <Text w="18px" fontSize="sm" fontWeight="bold" color="gray.500">
                            {index + 1}
                          </Text>
                          <Image
                            src={`https://www.google.com/s2/favicons?sz=64&domain=${site.domain}`}
                            alt={`${site.name} logo`}
                            boxSize="24px"
                            borderRadius="sm"
                          />
                          <Box>
                            <Text fontSize="sm" fontWeight="bold" color="gray.900">
                              {site.name}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              {site.bestFor}
                            </Text>
                          </Box>
                        </HStack>
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color={
                            group.title === "Risk Watch"
                              ? site.risk === "High"
                                ? "red.600"
                                : site.risk === "Medium"
                                  ? "orange.600"
                                  : "green.600"
                              : "green.600"
                          }
                          whiteSpace="nowrap"
                        >
                          {group.value(site)}
                        </Text>
                      </Flex>
                    </Link>
                  ))}
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="md" p={{ base: 4, md: 5 }} mb={8}>
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} gap={4} direction={{ base: "column", md: "row" }} mb={4}>
              <VStack align="flex-start" spacing={1}>
                <Heading size="md" color="gray.900">
                  Discover by Category
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Browse box themes and platform signals without leaving the ranking flow.
                </Text>
              </VStack>
              <Link href="/platforms" style={{ textDecoration: "none" }}>
                <HStack color="blue.600" spacing={2}>
                  <Text fontSize="sm" fontWeight="semibold">Show all</Text>
                  <Icon as={FaChevronRight} boxSize={3} />
                </HStack>
              </Link>
            </Flex>
            <HStack spacing={3} wrap="wrap">
              {categories.map((category) => (
                <Badge
                  key={category.label}
                  bg="gray.50"
                  color="gray.700"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  px={3}
                  py={2}
                  textTransform="none"
                  fontSize="sm"
                >
                  {category.label} <Text as="span" color="gray.400">/ {category.count}</Text>
                </Badge>
              ))}
            </HStack>
          </Box>

          <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="md" overflow="hidden">
            <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} gap={4} direction={{ base: "column", md: "row" }} px={5} py={4} borderBottom="1px solid" borderColor="gray.200">
              <VStack align="flex-start" spacing={1}>
                <Heading size="lg" color="gray.900">
                  Mystery Box Platform Rankings
                </Heading>
                <Text color="gray.600">
                  A data-first ranking view with catalog status, tracked boxes, offers, and risk level.
                </Text>
              </VStack>
              <Badge colorScheme="blue" fontSize="sm" px={3} py={1} borderRadius="md" fontWeight="semibold">
                2026 radar
              </Badge>
            </Flex>

            <Flex
              display={{ base: "none", lg: "grid" }}
              gridTemplateColumns="64px 1.5fr 0.8fr 1fr 0.8fr 1fr 0.9fr 90px"
              gap={4}
              px={5}
              py={3}
              bg="gray.50"
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              {["#", "Platform", "Rating", "Catalog", "Boxes", "Offer", "Risk", "Review"].map((header) => (
                <Text key={header} fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase">
                  {header}
                </Text>
              ))}
            </Flex>

            <VStack spacing={0} align="stretch">
              {websites.map((site, index) => (
                <Link href={`/site/${site.id}`} key={site.id} style={{ textDecoration: "none" }}>
                  <Flex
                    display={{ base: "flex", lg: "grid" }}
                    direction={{ base: "column", lg: "row" }}
                    gridTemplateColumns="64px 1.5fr 0.8fr 1fr 0.8fr 1fr 0.9fr 90px"
                    align={{ base: "stretch", lg: "center" }}
                    gap={{ base: 3, lg: 4 }}
                    px={5}
                    py={4}
                    borderBottom={index === websites.length - 1 ? "0" : "1px solid"}
                    borderColor="gray.200"
                    _hover={{ bg: "blue.50" }}
                  >
                    <Text fontSize="sm" color="gray.500" fontWeight="bold">
                      #{index + 1}
                    </Text>
                    <HStack spacing={3}>
                      <Image
                        src={`https://www.google.com/s2/favicons?sz=64&domain=${site.domain}`}
                        alt={`${site.name} logo`}
                        boxSize="30px"
                        borderRadius="md"
                      />
                      <Box>
                        <Text fontSize="md" fontWeight="bold" color="gray.900">
                          {site.name}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {site.domain}
                        </Text>
                      </Box>
                    </HStack>
                    <HStack spacing={1}>
                      <Icon as={FaStar} color="yellow.400" boxSize={3} />
                      <Text fontSize="sm" fontWeight="semibold" color="gray.900">{site.rating}/5</Text>
                    </HStack>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                      {site.catalogStatus}
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                      {site.trackedBoxes}
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                      {site.bonus}
                    </Text>
                    <Badge
                      colorScheme={site.risk === "Low" ? "green" : site.risk === "High" ? "red" : "orange"}
                      borderRadius="md"
                      w="fit-content"
                    >
                      {site.risk}
                    </Badge>
                    <HStack color="blue.600" spacing={2}>
                      <Text fontSize="sm" fontWeight="semibold">View</Text>
                      <Icon as={FaChevronRight} boxSize={3} />
                    </HStack>
                  </Flex>
                </Link>
              ))}
            </VStack>
          </Box>
        </Container>
      </Box>

      {/* Latest Reviews + Market Snapshot Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} maxW="1200px" mx="auto" mb={12} px={4} alignItems="start">
        {/* Latest Reviews */}
        <Box
          gridColumn={{ md: "span 2" }}
          bg="white"
          p={6}
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
        >
          <Flex justify="space-between" align="center" mb={6}>
            <VStack align="flex-start" spacing={1}>
              <Heading size="lg" color="gray.800">Latest Reviews</Heading>
              <Text color="gray.600" fontSize="sm">Fresh insights and platform updates</Text>
            </VStack>
            <Badge colorScheme="blue" fontSize="sm" px={3} py={1} borderRadius="full">
              {posts.length} Reviews
            </Badge>
          </Flex>

          <VStack spacing={3} align="stretch">
            {displayedPosts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <Box
                  p={4}
                  border="1px solid"
                  borderColor="gray.100"
                  borderRadius="md"
                  transition="all 0.3s ease"
                  _hover={{
                    borderColor: "blue.200",
                    bg: "blue.50",
                  }}
                >
                  <HStack spacing={4}>
                    <Box
                      w="60px"
                      h="60px"
                      borderRadius="lg"
                      overflow="hidden"
                      bg="gray.100"
                      flexShrink={0}
                    >
                      {post.thumbnail ? (
                        <Image
                          src={post.thumbnail}
                          alt={post.title}
                          w="full"
                          h="full"
                          objectFit="cover"
                        />
                      ) : (
                        <Box w="full" h="full" bg="gray.200" />
                      )}
                    </Box>
                    <VStack align="flex-start" spacing={1} flex={1}>
                      <Text fontSize="md" fontWeight="bold" color="gray.800" noOfLines={2}>
                        {post.title}
                      </Text>
                      <HStack spacing={2}>
                        <Badge colorScheme="green" size="sm">Review</Badge>
                        <Text fontSize="xs" color="gray.500">
                          Recent
                        </Text>
                      </HStack>
                    </VStack>
                    <Icon as={FaChevronRight} color="gray.400" boxSize={4} />
                  </HStack>
                </Box>
              </Link>
            ))}

            <Flex justify="center" pt={2}>
              {!showAll && posts.length > 10 && (
                <Button
                  onClick={() => setShowAll(true)}
                  variant="outline"
                  colorScheme="blue"
                  size="sm"
                  borderRadius="full"
                  leftIcon={<Icon as={FaChevronDown} />}
                >
                  Show More Reviews
                </Button>
              )}
              {showAll && (
                <Button
                  onClick={() => setShowAll(false)}
                  variant="outline"
                  colorScheme="gray"
                  size="sm"
                  borderRadius="full"
                  leftIcon={<Icon as={FaChevronUp} />}
                >
                  Show Less
                </Button>
              )}
            </Flex>
          </VStack>
        </Box>

        {/* Market Snapshot */}
        <Box
          bg="white"
          p={6}
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
        >
          <VStack align="flex-start" spacing={1} mb={6}>
            <Heading size="lg" color="gray.800">Industry Overview</Heading>
            <Text color="gray.600" fontSize="sm">Droppeek catalog and platform coverage</Text>
          </VStack>

          <VStack spacing={0} align="stretch" borderTop="1px solid" borderColor="gray.200">
            {[
              { label: "Total boxes tracked", value: "650+" },
              { label: "Platforms reviewed", value: websites.length },
              { label: "Live/API catalogs", value: "4" },
              { label: "Unavailable catalogs", value: "1" },
              { label: "Primary refresh cycle", value: "Daily" },
            ].map((item) => (
              <Flex
                key={item.label}
                justify="space-between"
                align="center"
                py={4}
                borderBottom="1px solid"
                borderColor="gray.200"
              >
                <Text fontSize="sm" color="gray.600">
                  {item.label}
                </Text>
                <Text fontSize="lg" color="gray.900" fontWeight="bold">
                  {item.value}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>

      {/* FAQ Section */}
      <Box maxW="1000px" mx="auto" mb={12}>
        <Heading size="lg" mb={6} textAlign="center">FAQ</Heading>
        <VStack spacing={4} align="stretch">
          <FAQItem
            question="What is a mystery box platform?"
            answer="A mystery box platform is an online service where users can purchase digital boxes that contain random items. These items may range from high-end fashion, limited-edition collectibles, to gaming gear or tech gadgets. After opening the box, users either receive the prize directly or can exchange it, depending on the platform's policy. Mystery box sites blend the excitement of surprise with the potential to win premium products."
          />
          
          <FAQItem
            question="Is it legit to open mystery boxes online?"
            answer="Yes — as long as you use a reputable platform. At Droppeek, we only feature platforms that are verified, widely trusted, and have passed our internal review for fairness, transparency, and user safety. While mystery boxes carry an element of chance, legitimate sites clearly state odds, offer secure payments, and have strong community reputations. Always avoid sites that lack transparency or user reviews."
          />
          
          <FAQItem
            question="What is a mystery box comparison site like Droppeek?"
            answer="Droppeek is a neutral comparison and navigation platform for mystery box websites. We help users discover and evaluate different mystery box platforms by offering in-depth reviews, platform ratings, bonus comparisons, and safety assessments — all in one place. We do not sell boxes ourselves but guide users to the most reputable options."
          />
          
          <FAQItem
            question="What kind of information does Droppeek provide?"
            answer="We provide:
• Verified platform reviews and user feedback
• Bonus and promo code comparisons
• Security and fairness assessments
• Prize delivery time comparisons
• Resell/withdrawal options across platforms
• Daily updates on new events and changes"
          />
          
          <FAQItem
            question="How does Droppeek remain independent?"
            answer="We strive to stay objective and unbiased. Some platforms may have affiliate partnerships with us, but this does not influence our ratings or recommendations. All reviews and rankings are based on a combination of user data, feature analysis, and real-world testing."
          />
          
          <FAQItem
            question="Can I leave a review or rating?"
            answer="Yes! We encourage real user feedback to keep the platform transparent and up-to-date. You can submit your review on each platform's detail page — every voice helps improve the experience for others."
          />
        </VStack>
      </Box>
      
      {/* Comments Section */}
      <Box
        maxW="1000px"
        mx="auto"
        mt={8}
        mb={12}
        p={6}
        borderWidth={1}
        borderRadius="lg"
        borderColor="gray.200"
        bg="white"
      >
        <VStack align="flex-start" spacing={1} mb={6}>
          <Heading size="lg" color="gray.800">Community Discussion</Heading>
          <Text color="gray.600">Join the conversation with fellow mystery box enthusiasts</Text>
        </VStack>
        <DisqusThread identifier="homepage" title="Droppeek Homepage Comments" />
      </Box>

      {/* Enhanced Footer */}
      <Box
        as="footer"
        bg="gray.900"
        color="white"
        mt={20}
        position="relative"
        overflow="hidden"
      >
        {/* Background Pattern */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage="url('data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 100 100&quot;><defs><pattern id=&quot;dots&quot; width=&quot;20&quot; height=&quot;20&quot; patternUnits=&quot;userSpaceOnUse&quot;><circle cx=&quot;10&quot; cy=&quot;10&quot; r=&quot;1&quot; fill=&quot;white&quot; opacity=&quot;0.05&quot;/></pattern></defs><rect width=&quot;100&quot; height=&quot;100&quot; fill=&quot;url(%23dots)&quot;/></svg>')"
          opacity={0.3}
        />
        
        <Box maxW="container.xl" mx="auto" px={4} position="relative" zIndex={2}>
          {/* Main Footer Content */}
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 4 }} 
            spacing={8} 
            py={12}
          >
            {/* Brand Section */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
              <Flex align="center" gap={3}>
                <Box
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  borderRadius="lg"
                  p={3}
                  color="white"
                >
                  <Icon as={FaStar} boxSize={6} />
                </Box>
                <VStack spacing={0} align="flex-start">
                  <Text fontSize="2xl" fontWeight="black" color="white">
                    DropPeek
                  </Text>
                  <Text fontSize="sm" color="gray.400" fontWeight="medium">
                    Mystery Box Reviews
                  </Text>
                </VStack>
              </Flex>
              <Text 
                fontSize="sm" 
                color="gray.400" 
                textAlign={{ base: "center", md: "left" }}
                maxW="280px"
                lineHeight="tall"
              >
                Your trusted source for mystery box platform reviews and comparisons. 
                We help you make informed decisions and avoid scams.
              </Text>
              
              {/* Trust Badges */}
              <HStack spacing={3} wrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                <Badge colorScheme="green" variant="subtle" px={3} py={1} borderRadius="full">
                  Verified Reviews
                </Badge>
                <Badge colorScheme="blue" variant="subtle" px={3} py={1} borderRadius="full">
                  Scam Protection
                </Badge>
              </HStack>
            </VStack>

            {/* Quick Links */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={3}>
              <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                Quick Links
              </Text>
              <VStack spacing={2} align={{ base: "center", md: "flex-start" }}>
                <ChakraLink 
                  href="/" 
                  color="gray.400" 
                  _hover={{ color: "white", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  Home
                </ChakraLink>
                <ChakraLink 
                  href="/platforms" 
                  color="gray.400" 
                  _hover={{ color: "white", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  All Platforms
                </ChakraLink>
                <ChakraLink 
                  href="/reviews" 
                  color="gray.400" 
                  _hover={{ color: "white", textDecoration: "none" }}
                  transition="color 0.2s"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  Reviews
                  <Badge colorScheme="red" size="sm">New</Badge>
                </ChakraLink>
                <ChakraLink 
                  href="/blog" 
                  color="gray.400" 
                  _hover={{ color: "white", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  Blog
                </ChakraLink>
              </VStack>
            </VStack>

            {/* Platform Categories */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={3}>
              <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                Top Platforms
              </Text>
              <VStack spacing={2} align={{ base: "center", md: "flex-start" }}>
                <ChakraLink 
                  href="/site/hypedrop" 
                  color="gray.400" 
                  _hover={{ color: "white", textDecoration: "none" }}
                  transition="color 0.2s"
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  HypeDrop
                  <Badge colorScheme="yellow" size="xs">#1</Badge>
                </ChakraLink>
                <ChakraLink 
                  href="/site/metadraw" 
                  color="gray.400" 
                  _hover={{ color: "white", textDecoration: "none" }}
                  transition="color 0.2s"
                >
                  MetaDraw
                </ChakraLink>
                <ChakraLink 
                  href="/platforms" 
                  color="blue.400" 
                  _hover={{ color: "blue.300", textDecoration: "none" }}
                  transition="color 0.2s"
                  fontSize="sm"
                >
                  View All Platforms →
                </ChakraLink>
              </VStack>
            </VStack>

            {/* Contact & Stats */}
            <VStack align={{ base: "center", md: "flex-start" }} spacing={3}>
              <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                Community
              </Text>
              
              {/* Stats */}
              <VStack spacing={3} align={{ base: "center", md: "flex-start" }}>
                <HStack spacing={3}>
                  <VStack spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold" color="white">50K+</Text>
                    <Text fontSize="xs" color="gray.500">Users</Text>
                  </VStack>
                  <VStack spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold" color="white">25+</Text>
                    <Text fontSize="xs" color="gray.500">Platforms</Text>
                  </VStack>
                  <VStack spacing={0}>
                    <Text fontSize="2xl" fontWeight="bold" color="white">1K+</Text>
                    <Text fontSize="xs" color="gray.500">Reviews</Text>
                  </VStack>
                </HStack>
                
                {/* Contact */}
                <VStack spacing={2} align={{ base: "center", md: "flex-start" }}>
                  <ChakraLink 
                    href="/contact" 
                    color="gray.400" 
                    _hover={{ color: "white", textDecoration: "none" }}
                    transition="color 0.2s"
                  >
                    📧 Contact Us
                  </ChakraLink>
                  <ChakraLink 
                    href="mailto:info@droppeek.com" 
                    color="gray.400" 
                    _hover={{ color: "white", textDecoration: "none" }}
                    transition="color 0.2s"
                    fontSize="sm"
                  >
                    info@droppeek.com
                  </ChakraLink>
                </VStack>
              </VStack>
            </VStack>
          </SimpleGrid>

          {/* Bottom Bar */}
          <Divider borderColor="gray.700" />
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            py={6}
            gap={4}
          >
            <Text fontSize="sm" color="gray.500" textAlign={{ base: "center", md: "left" }}>
              © 2026 DropPeek. All rights reserved. | 
              <Text as="span" color="gray.400" ml={1}>
                Making mystery box shopping safer for everyone.
              </Text>
            </Text>
            
            <HStack spacing={6} wrap="wrap" justify={{ base: "center", md: "flex-end" }}>
              <ChakraLink 
                href="/about" 
                fontSize="sm" 
                color="gray.500" 
                _hover={{ color: "white" }}
                transition="color 0.2s"
              >
                About
              </ChakraLink>
              <ChakraLink 
                href="/contact" 
                fontSize="sm" 
                color="gray.500" 
                _hover={{ color: "white" }}
                transition="color 0.2s"
              >
                Contact
              </ChakraLink>
              <ChakraLink 
                href="/terms" 
                fontSize="sm" 
                color="gray.500" 
                _hover={{ color: "white" }}
                transition="color 0.2s"
              >
                Terms
              </ChakraLink>
              <ChakraLink 
                href="/privacy" 
                fontSize="sm" 
                color="gray.500" 
                _hover={{ color: "white" }}
                transition="color 0.2s"
              >
                Privacy
              </ChakraLink>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
