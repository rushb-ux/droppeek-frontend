import { Box, Heading, Text, VStack, Link, Icon, Center } from "@chakra-ui/react";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <Center py={16}>
      <Box
        borderWidth="1px"
        borderRadius="md"
        p={8}
        maxW="400px"
        w="full"
        textAlign="center"
        boxShadow="md"
      >
        <Heading as="h1" size="lg" mb={4}>
          Contact Us
        </Heading>
        <Text fontSize="md" color="gray.600" mb={6}>
          If you'd like to reach out, feel free to connect with us on X.
        </Text>
        <Link
          href="https://x.com/aaron_key5303"
          isExternal
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="medium"
          color="blue.500"
          fontSize="lg"
        >
          <Icon as={FaXTwitter} boxSize={5} mr={2} />
          droppeek
        </Link>
      </Box>
    </Center>
  );
}
