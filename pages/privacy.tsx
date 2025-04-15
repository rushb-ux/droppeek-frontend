import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function PrivacyPolicyPage() {
  return (
    <Box maxW="800px" mx="auto" py={10} px={4}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Privacy Policy
      </Heading>

      <Box borderWidth="1px" borderRadius="md" p={8} boxShadow="sm">
        <VStack spacing={6} align="start">
          <Text>
            At Droppeek, we value your privacy. This Privacy Policy outlines the types of information we collect, how we use it, and your rights regarding your data.
          </Text>

          <Text>
            <strong>1. Information We Collect:</strong> We may collect non-personal data such as browser type, pages visited, and referral source to help us improve our website. We do not collect personally identifiable information unless voluntarily submitted by users (e.g., via contact forms).
          </Text>

          <Text>
            <strong>2. Cookies:</strong> Droppeek may use cookies to enhance user experience and track aggregated site usage. You can disable cookies in your browser settings if desired.
          </Text>

          <Text>
            <strong>3. Use of Information:</strong> The data we collect is used solely for analytics, improving our services, and responding to user inquiries. We do not sell or share your data with third parties.
          </Text>

          <Text>
            <strong>4. Third-Party Links:</strong> Our site may contain links to external websites. We are not responsible for the content or privacy practices of those sites.
          </Text>

          <Text>
            <strong>5. Data Security:</strong> We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
          </Text>

          <Text>
            <strong>6. Changes to This Policy:</strong> We may update this Privacy Policy occasionally. Any changes will be posted on this page with the updated date.
          </Text>

          <Text>
            <strong>7. Contact:</strong> For privacy-related questions, please reach out via our official X account: <a href="https://x.com/aaron_key5303" target="_blank" rel="noopener noreferrer">droppeek</a>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
