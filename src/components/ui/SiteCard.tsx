import { Box, Image, Text, Badge, Button, HStack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Site {
  id: number;
  name: string;
  logo: string;
  url: string;
  tags: string[]; 
}

interface SiteCardProps {
  site: Site;
}

export default function SiteCard({ site }: SiteCardProps) {
  const router = useRouter();

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
      <HStack spacing={4}>
        <Image src={site.logo} boxSize="80px" borderRadius="md" />
        <VStack align="start">
          <Text fontSize="lg" fontWeight="bold">{site.name}</Text>
          <HStack>
            {site.tags.map((tag) => (
              <Badge colorScheme="blue" key={tag}>{tag}</Badge>
            ))}
          </HStack>
          <HStack>
            <Button colorScheme="gray" onClick={() => router.push(`/reviews/${site.id}`)}>
              More Info
            </Button>
            <Button colorScheme="green" as="a" href={site.url} target="_blank">
              Play Now
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}
