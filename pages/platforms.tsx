import { Box, Heading, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react"
import Link from "next/link"

const platforms = [
  {
    id: "hypedrop",
    name: "HypeDrop",
    description: "Popular mystery box platform with gaming focus.",
    image: "/images/hypedrop.png",
  },
  {
    id: "metadraw",
    name: "MetaDraw",
    description: "Diverse mystery boxes with transparent odds and provably fair draws.",
    image: "/images/metadraw.png"
  },
  {
    id: "hypeloot",
    name: "HypeLoot",
    description: "Luxury-themed mystery box unboxings.",
    image: "/images/hypeloot.png",
  },
  {
    id: "jemlit",
    name: "JemLit",
    description: "Daily drops with hypebeast and tech prizes.",
    image: "/images/lootie.png",
  },
  {
    id: "mysteryboxbrand",
    name: "MysteryBoxBrand",
    description: "Premium mystery boxes with high-quality, non-duplicate items.",
    image: "/images/mysteryboxbrand.png"
  },
  {
    id: "rillabox",
    name: "RillaBox",
    description: "Crypto-based mystery boxes with 150+ themes.",
    image: "/images/rillabox.png"
  },
  {
    id: "lootie",
    name: "Lootie",
    description: "Gaming and hypebeast mystery boxes.",
    image: "/images/jemlit.png"
  },
  {
    id: "hapabox",
    name: "HapaBox",
    description: "Fair, diverse mystery box games with authentic items.",
    image: "/images/hapabox.png"
  },
]

export default function PlatformListPage() {
  return (
    <Box maxW="1200px" mx="auto" px={6} py={12}>
      <Heading size="xl" mb={8}>Explore All Mystery Box Platforms</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} minChildWidth="250px">
        {platforms.map((site) => (
          <Link key={site.id} href={`/site/${site.id}`} passHref>
            <Box
              w="100%"
              minH="200px"
              p={5}
              borderWidth={1}
              borderRadius="lg"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
            >
              <VStack align="start" spacing={3}>
                <Image
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${site.id}.com`}
                    alt={`${site.name} logo`}
                    boxSize="48px"
                    objectFit="contain"
                />
                <Text fontSize="xl" fontWeight="bold">{site.name}</Text>
                <Text fontSize="sm" color="gray.600">{site.description}</Text>
              </VStack>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  )
}
