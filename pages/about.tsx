import { Box, Heading, Text } from "@chakra-ui/react";

export default function AboutPage() {
  return (
    <Box maxW="800px" mx="auto" mt={8} px={4}>
      <Box borderWidth="1px" borderRadius="md" p={8} boxShadow="sm">
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          About Us
        </Heading>
        <Text fontSize="lg" lineHeight="1.8">
          We are passionate about mystery boxes and committed to delivering honest, transparent reviews of online unboxing platforms.<br />
        </Text>
        <Box h={4} />
        <Text fontSize="lg" lineHeight="1.8">
          Since our launch, we've helped users discover trusted mystery box sites with real rewards — from gaming-themed boxes to luxury surprises. Our mission is to cut through the hype and show what’s truly worth opening.<br />
        </Text>
        <Box h={4} />
        <Text fontSize="lg" lineHeight="1.8">
          We test, analyze, and review every box so you don’t have to waste time or money. Whether you're chasing hype drops or rare collectibles, we provide detailed breakdowns, odds analysis, and real results to guide your choices.<br />
        </Text>
        <Box h={4} />
        <Text fontSize="lg" lineHeight="1.8">
          Join us as we explore the best mystery box sites — and share the truth behind the box.
        </Text>
      </Box>
    </Box>
  );
}
