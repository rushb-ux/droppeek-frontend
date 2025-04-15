import { Box, Heading, Text, Link, VStack } from "@chakra-ui/react";

export default function ContactPage() {
  return (
    <Box maxW="600px" mx="auto" py={10} px={4} textAlign="center">
      <Heading as="h1" size="xl" mb={6}>
        Contact Us
      </Heading>

      <VStack spacing={6}>
        <Text fontSize="lg">
          Have questions, feedback, or suggestions? Reach out to us anytime.
        </Text>

        <Text fontSize="lg">
          🐦 Connect on X (Twitter):{" "}
          <Link
            href="https://x.com/aaron_key5303"
            color="teal.500"
            isExternal
            fontWeight="bold"
          >
            @aaron_key5303
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
