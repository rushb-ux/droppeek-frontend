'use client'
import { useState } from "react";
import { useRouter } from "next/router";
import RatingStars from "../../src/components/ui/RatingStars";

import {
  Box,
  Heading,
  Text,
  VStack,
  Tag,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react";
import sites from "../../src/data/sites";

export default function SiteReviewPage() {
    const router = useRouter();
    const { id } = router.query;
  
    const [activeTab, setActiveTab] = useState<"review" | "promo" | "alt">("review");
  
    const site = sites.find((s) => s.id === id);
  
    if (!site) {
      return (
        <Box p={10} textAlign="center">
          <Heading size="md">Site Not Found</Heading>
        </Box>
      );
    }
  
    return (
      <>
        {/* hero 背景区域 */}
        <Box
          position="relative"
          maxW="1200px"
          mx="auto"
          mt={40}
          minH="700px"
          borderRadius="xl"
          backgroundImage="url('/images/hero-bg.png')"
          backgroundSize="cover"
          backgroundPosition="center"
          boxShadow="lg"
          overflow="hidden"
          p={10}
        >
          {/* 遮罩 */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-b, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2), transparent)"
            zIndex={1}
          />
          {/* 内容 */}
          <Box position="relative" zIndex={2} color="white">
            <HStack spacing={4} mb={4}>
                <Image src={site.logo} alt={site.name} boxSize="60px" />
                <Heading size="2xl">{site.name}</Heading>
                <HStack>
                <RatingStars rating={site.rating} />
                </HStack>
            </HStack>

  
            <Text fontSize="md" maxW="800px" mb={4}>
              {site.description}
            </Text>
  
            <HStack spacing={3} wrap="wrap">
              {site.tags?.map((tag, index) => (
                <Tag key={index} colorScheme="green" variant="solid">
                  {tag}
                </Tag>
              ))}
            </HStack>
          </Box>
        </Box>
  
        {/* 👉 按钮区域 */}
        <HStack spacing={4} justify="center" mt={10} mb={8}>
          <Button
            colorScheme="green"
            variant={activeTab === "review" ? "solid" : "outline"}
            onClick={() => setActiveTab("review")}
          >
            Expert Review
          </Button>
          <Button
            colorScheme="green"
            variant={activeTab === "promo" ? "solid" : "outline"}
            onClick={() => setActiveTab("promo")}
          >
            Promo Codes
          </Button>
          <Button
            colorScheme="green"
            variant={activeTab === "alt" ? "solid" : "outline"}
            onClick={() => setActiveTab("alt")}
          >
            Alternatives
          </Button>
        </HStack>
      </>
    );
  }
  