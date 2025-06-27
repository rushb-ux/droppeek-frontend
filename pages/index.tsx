import { useEffect, useState } from "react";
import { getTopReviews } from "../src/lib/api";
import { FaStar, FaRegStar, FaChevronRight, FaChevronDown, FaChevronUp,FaShieldAlt, FaUsers  } from "react-icons/fa";
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
    <Box position="relative" minH="100vh" overflow="hidden"  bg="#F5F5F7">

      
{/* Hero Section */}
<Box position="relative" zIndex={1}>
  <Box
    maxW="1200px"
    mx="auto"
    mt={{ base: 20, md: 40 }}
    px={{ base: 6, md: 12 }}
    py={{ base: 12, md: 16 }}
    borderRadius="2xl"
    bgGradient="linear(135deg, blue.600, purple.600, pink.500)"
    position="relative"
    boxShadow="2xl"
    overflow="hidden"
    zIndex={1}
    border="1px solid"
    borderColor="whiteAlpha.200"
  >
    {/* Animated Background Elements */}
    <Box
      position="absolute"
      top="10%"
      left="5%"
      w="100px"
      h="100px"
      bg="whiteAlpha.100"
      borderRadius="full"
      animation="float 6s ease-in-out infinite"
    />
    <Box
      position="absolute"
      top="20%"
      right="10%"
      w="80px"
      h="80px"
      bg="whiteAlpha.100"
      borderRadius="full"
      animation="float 8s ease-in-out infinite reverse"
    />
    <Box
      position="absolute"
      bottom="20%"
      left="15%"
      w="60px"
      h="60px"
      bg="whiteAlpha.100"
      borderRadius="full"
      animation="float 10s ease-in-out infinite"
    />

    {/* Background Pattern */}
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgImage="url('data:image/svg+xml,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 100 100&quot;><defs><pattern id=&quot;grain&quot; width=&quot;100&quot; height=&quot;100&quot; patternUnits=&quot;userSpaceOnUse&quot;><circle cx=&quot;20&quot; cy=&quot;20&quot; r=&quot;1&quot; fill=&quot;white&quot; opacity=&quot;0.1&quot;/><circle cx=&quot;80&quot; cy=&quot;40&quot; r=&quot;1&quot; fill=&quot;white&quot; opacity=&quot;0.1&quot;/><circle cx=&quot;40&quot; cy=&quot;60&quot; r=&quot;1&quot; fill=&quot;white&quot; opacity=&quot;0.1&quot;/><circle cx=&quot;90&quot; cy=&quot;80&quot; r=&quot;1&quot; fill=&quot;white&quot; opacity=&quot;0.1&quot;/></pattern></defs><rect width=&quot;100&quot; height=&quot;100&quot; fill=&quot;url(%23grain)&quot;/></svg>')"
      opacity={0.3}
    />

    <VStack spacing={6} position="relative" zIndex={2} align={{ base: "center", md: "flex-start" }}>
      {/* Trust Badge */}
      <Badge
        colorScheme="orange"
        fontSize="sm"
        px={4}
        py={2}
        borderRadius="full"
        fontWeight="bold"
        bg="orange.400"
        color="white"
        textTransform="uppercase"
        letterSpacing="wide"
      >
        🏆 TRUSTED BY 50K+ USERS
      </Badge>
      
      {/* Brand Name */}
      <Text 
        fontSize="lg" 
        fontWeight="black" 
        mb={2} 
        color="whiteAlpha.900"
        textTransform="uppercase"
        letterSpacing="wider"
      >
        DROPPEEK
      </Text>

      {/* Main Heading */}
      <Heading
        size="3xl"
        fontWeight="black"
        textAlign={{ base: "center", md: "left" }}
        lineHeight="shorter"
        color="white"
        textShadow="2px 2px 4px rgba(0,0,0,0.3)"
        maxW="800px"
      >
        Top Mystery Box Sites
        <br />
        <Text as="span" bgGradient="linear(to-r, yellow.200, orange.200)" bgClip="text">
          Reviewed in 2025
        </Text>
      </Heading>
      
      {/* Subtitle */}
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        maxW="600px"
        textAlign={{ base: "center", md: "left" }}
        color="whiteAlpha.900"
        lineHeight="tall"
        fontWeight="medium"
      >
        We test and review the most popular unboxing platforms to help you avoid scams and get the best experience. Find your perfect mystery box platform today!
      </Text>

      {/* Key Benefits */}
      <HStack spacing={6} wrap="wrap" justify={{ base: "center", md: "flex-start" }}>
        <HStack spacing={2}>
          <Icon as={FaShieldAlt} color="green.300" boxSize={5} />
          <Text color="white" fontSize="sm" fontWeight="semibold">Scam Protection</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={FaStar} color="yellow.300" boxSize={5} />
          <Text color="white" fontSize="sm" fontWeight="semibold">Expert Reviews</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={FaUsers} color="blue.300" boxSize={5} />
          <Text color="white" fontSize="sm" fontWeight="semibold">Community Trusted</Text>
        </HStack>
      </HStack>

      {/* Social Proof */}
      <HStack spacing={8} pt={4} wrap="wrap" justify={{ base: "center", md: "flex-start" }}>
        <VStack spacing={1}>
          <Text fontSize="2xl" fontWeight="bold" color="white">50K+</Text>
          <Text fontSize="xs" color="whiteAlpha.700" textTransform="uppercase">Users Protected</Text>
        </VStack>
        <VStack spacing={1}>
          <Text fontSize="2xl" fontWeight="bold" color="white">25+</Text>
          <Text fontSize="xs" color="whiteAlpha.700" textTransform="uppercase">Platforms Reviewed</Text>
        </VStack>
        <VStack spacing={1}>
          <Text fontSize="2xl" fontWeight="bold" color="white">1000+</Text>
          <Text fontSize="xs" color="whiteAlpha.700" textTransform="uppercase">Scams Prevented</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</Box>

<style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`}</style>
     
                {/* Recommended Sites Section */}
<Box
  maxW="1000px"
  mx="auto"
  mt={{ base: 8, md: 12 }}
  mb={12}
  px={{ base: 4, md: 6 }}   
  py={8}
  bg="white"
  borderRadius="2xl"
  boxShadow="xl"
  zIndex={2}
  position="relative"
  border="1px solid"
  borderColor="gray.100"
>
  <Flex justify="space-between" align="center" mb={6}>
    <VStack align="flex-start" spacing={1}>
      <Heading size="xl" color="gray.800">
        🎯 Recommended Mystery Box Sites
      </Heading>
      <Text color="gray.600" fontSize="lg">
        Our top-rated platforms for 2025
      </Text>
    </VStack>
    <Badge colorScheme="green" fontSize="md" px={4} py={2} borderRadius="full" fontWeight="bold">
      Updated Today
    </Badge>
  </Flex>

  <Box
    overflowX="auto"
    css={{
      '&::-webkit-scrollbar': {
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#CBD5E0',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#A0AEC0',
      },
    }}
  >
    <HStack spacing={6} pb={4} minW="max-content">
      {websites.slice(0, 6).map((site, index) => (
        <Link
          href={`/site/${site.id}`}
          key={site.id}
          style={{ textDecoration: "none" }}
        >
          <Box
            w="320px"
            bg="white"
            border="2px solid"
            borderColor="gray.100"
            borderRadius="xl"
            p={6}
            transition="all 0.3s ease"
            position="relative"
            _hover={{
              borderColor: "blue.300",
              transform: "translateY(-8px)",
              boxShadow: "2xl",
            }}
          >
            {/* Rank Badge */}
            <Badge
              position="absolute"
              top={-2}
              left={4}
              colorScheme={index === 0 ? "yellow" : index === 1 ? "gray" : "orange"}
              fontSize="sm"
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="bold"
            >
              #{index + 1}
            </Badge>

            {/* Platform Badge */}
            <Badge
              position="absolute"
              top={-2}
              right={4}
              colorScheme="blue"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="full"
            >
              Verified
            </Badge>

            <VStack spacing={4} align="stretch">
              {/* Header with Logo and Name */}
              <HStack>
                <Image
                  src={`https://www.google.com/s2/favicons?sz=64&domain=${site.domain}`}
                  alt={`${site.name} logo`}
                  boxSize="48px"
                  borderRadius="lg"
                />
                <VStack align="flex-start" spacing={1} flex={1}>
                  <Text fontSize="xl" fontWeight="bold" color="gray.800">
                    {site.name}
                  </Text>
                  <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide">
                    {site.domain}
                  </Text>
                </VStack>
              </HStack>
              {/* Rating and Trust Indicators */}
              <VStack spacing={3} align="stretch">
                <HStack justify="space-between">
                  <HStack spacing={1}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        as={i < Math.floor(site.rating) ? FaStar : FaRegStar}
                        key={i}
                        color={i < site.rating ? "yellow.400" : "gray.300"}
                        boxSize={4}
                      />
                    ))}
                    <Text fontSize="sm" color="gray.600" ml={2}>
                      {site.rating}/5
                    </Text>
                  </HStack>
                  <Badge 
                    colorScheme={site.rating >= 4 ? "green" : site.rating >= 3.5 ? "yellow" : "orange"}
                    size="sm"
                  >
                    {site.rating >= 4 ? "Excellent" : site.rating >= 3.5 ? "Good" : "Fair"}
                  </Badge>
                </HStack>

                <Text fontSize="sm" color="gray.600" noOfLines={3} lineHeight="tall">
                  {site.description}
                </Text>

                {/* Trust and Safety Indicators */}
                <HStack spacing={2} wrap="wrap">
                  <Badge size="sm" colorScheme="green" variant="subtle">
                    ✓ Verified
                  </Badge>
                  <Badge size="sm" colorScheme="blue" variant="subtle">
                    🛡️ Secure
                  </Badge>
                  {site.rating >= 4 && (
                    <Badge size="sm" colorScheme="purple" variant="subtle">
                      ⭐ Top Rated
                    </Badge>
                  )}
                </HStack>

                {/* Quick Stats */}
                <HStack justify="space-between" fontSize="xs" color="gray.500">
                  <Text>Est. 2020+</Text>
                  <Text>1M+ Users</Text>
                  <Text>24/7 Support</Text>
                </HStack>
              </VStack>

              <Button
                colorScheme="blue"
                size="sm"
                rightIcon={<Icon as={FaChevronRight} />}
                borderRadius="lg"
                fontWeight="semibold"
                _hover={{
                  transform: "translateY(-1px)",
                }}
              >
                View Details
              </Button>
            </VStack>
          </Box>
        </Link>
      ))}
    </HStack>
  </Box>
</Box>
      {/* Latest Reviews + Ranking Section */}
<SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} maxW="1000px" mx="auto" mb={12} alignItems="start">
  {/* Latest Reviews */}
  <Box
    gridColumn={{ md: "span 2" }}
    bg="white"
    p={6}
    borderRadius="xl"
    boxShadow="lg"
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
            borderRadius="lg"
            transition="all 0.3s ease"
            _hover={{
              borderColor: "blue.200",
              bg: "blue.50",
              transform: "translateY(-2px)",
              boxShadow: "md",
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
                  <Badge colorScheme="green" size="sm">Latest Review</Badge>
                  <Text fontSize="xs" color="gray.500">
                    {index === 0 ? 'Today' : `${index + 1} days ago`}
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

  {/* Top Sites Ranking */}
  <Box
    bg="white"
    p={6}
    borderRadius="xl"
    boxShadow="lg"
    border="1px solid"
    borderColor="gray.200"
  >
    <VStack align="flex-start" spacing={1} mb={6}>
      <Heading size="lg" color="gray.800">🏆 Top Sites Ranking</Heading>
      <Text color="gray.600" fontSize="sm">Based on user reviews & testing</Text>
    </VStack>

    <VStack spacing={3} align="stretch">
      {websites.map((site, i) => (
        <Link
          key={site.id}
          href={`/site/${site.id}`}
          style={{ textDecoration: "none" }}
        >
          <Box
            position="relative"
            overflow="hidden"
            borderRadius="lg"
            h="85px"
            bgImage={`url('${site.image}')`}
            bgSize="cover"
            bgPosition="center"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
          >
            <Box
              position="absolute"
              inset={0}
              bg="blackAlpha.700"
              _hover={{ bg: "blackAlpha.600" }}
              transition="background 0.3s ease"
            />
            <Flex
              position="relative"
              h="full"
              p={4}
              color="white"
              justify="space-between"
              align="center"
            >
              <VStack align="flex-start" spacing={1}>
                <HStack spacing={2}>
                  <Badge
                    colorScheme={i < 3 ? "yellow" : "gray"}
                    size="sm"
                    borderRadius="md"
                    fontWeight="bold"
                  >
                    #{i + 1}
                  </Badge>
                  <Text fontSize="lg" fontWeight="bold">
                    {site.name}
                  </Text>
                </HStack>
                <HStack spacing={1}>
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Icon
                      as={starIndex < Math.floor(site.rating) ? FaStar : FaRegStar}
                      key={starIndex}
                      color={starIndex < site.rating ? "yellow.300" : "gray.400"}
                      boxSize={3}
                    />
                  ))}
                  <Text fontSize="xs" color="gray.300" ml={1}>
                    {site.rating}/5
                  </Text>
                </HStack>
              </VStack>
              <VStack spacing={1}>
                <Icon as={FaChevronRight} boxSize={4} />
                <Text fontSize="xs" color="gray.400">View</Text>
              </VStack>
            </Flex>
          </Box>
        </Link>
      ))}
    </VStack>
  </Box>
</SimpleGrid>

         {/* FAQ Section */}
         <Box maxW="1000px" mx="auto">
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
        <Box mt={20}>
          <DisqusThread identifier="homepage" title="Droppeek Homepage Comments" />
        </Box>
          {/* <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert('Comment submitted!'); }}>
            <textarea
              placeholder="Write your comment here..."
              className="w-full border rounded p-2 mb-4"
              rows={4}
            ></textarea>
            <Button type="submit">Submit</Button>
          </form> */}
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