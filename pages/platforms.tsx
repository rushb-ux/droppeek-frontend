import { Box, Heading, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react"
import Link from "next/link"
import sites from "@/data/sites"

export default function PlatformListPage() {
  const rankedSites = [...sites].sort((a, b) => a.rank - b.rank)

  return (
    <Box maxW="1200px" mx="auto" px={6} py={12}>
      <Heading size="xl" mb={8}>Explore All Mystery Box Platforms</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} minChildWidth="250px">
        {rankedSites.map((site) => (
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
                  src={site.logo}
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
