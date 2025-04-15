import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function TermsPage() {
  return (
    <Box maxW="800px" mx="auto" py={10} px={4}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Terms of Service
      </Heading>

      <Box borderWidth="1px" borderRadius="md" p={8} boxShadow="sm">
        <VStack spacing={6} align="start">
          <Text>
            These Terms of Service ("Terms") govern your use of Droppeek.com ("we", "our", or "us"). By accessing or using our website, you agree to be bound by these Terms.
          </Text>

          <Text>
            <strong>1. Use of the Website:</strong> You may use Droppeek.com only for lawful purposes and in accordance with these Terms. You agree not to use our website in any way that violates applicable laws or regulations.
          </Text>

          <Text>
            <strong>2. Intellectual Property:</strong> All content on this site, including text, graphics, logos, and software, is the property of Droppeek or its content suppliers and is protected by copyright laws.
          </Text>

          <Text>
            <strong>3. Third-Party Links:</strong> Our site may contain links to third-party websites. We are not responsible for the content, policies, or practices of any third-party websites or services.
          </Text>

          <Text>
            <strong>4. Disclaimer:</strong> All reviews and opinions on Droppeek are based on personal evaluation and research. We do not guarantee the accuracy or reliability of third-party services or products.
          </Text>

          <Text>
            <strong>5. Limitation of Liability:</strong> In no event shall Droppeek be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of the site.
          </Text>

          <Text>
            <strong>6. Changes to Terms:</strong> We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the site constitutes your acceptance of the revised Terms.
          </Text>

          <Text>
            <strong>7. Contact:</strong> For questions regarding these Terms, please contact us via our official X account: <a href="https://x.com/aaron_key5303" target="_blank" rel="noopener noreferrer">droppeek</a>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
