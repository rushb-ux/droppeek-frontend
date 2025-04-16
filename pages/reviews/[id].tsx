import { useRouter } from "next/router";
import sites from "@/data/sites";
import {
  Box,
  Heading,
  Text,
  HStack,
  Tag,
  Image
} from "@chakra-ui/react";

export default function SiteDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const site = sites.find((s) => s.id === id);

  if (!site) return <Text>Site not found.</Text>;

  return (
    <Box maxW="800px" mx="auto" py={10} px={4}>
      <HStack spacing={4} mb={4}>
        <Image src={site.logo} alt={site.name} boxSize="60px" />
        <Heading>{site.name}</Heading>
      </HStack>

      <Text fontSize="md" mb={2}>Rating: {site.rating} ⭐</Text>

      <HStack spacing={2} mb={4}>
        {site.tags.map((tag, index) => (
          <Tag key={index} colorScheme="teal">{tag}</Tag>
        ))}
      </HStack>

      <Text fontSize="lg" whiteSpace="pre-line">{site.content}</Text>
    </Box>
  );
}
