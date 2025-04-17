'use client'
import { useState } from "react";
import { useRouter } from "next/router";
import RatingStars from "../../src/components/ui/RatingStars";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

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
          <Box 
            position="relative" 
            zIndex={2} 
            color="white" 
            px={14} 
            py={19}
            pt={20}
            maxW="1000px" 
            mx="auto">

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

          <Box mb={4}>
            <HStack mb={2} mt={6}>
            <CheckIcon color="green.400" boxSize={5} />
            </HStack>
            <HStack spacing={3} wrap="wrap">
            {site.pros?.map((item, index) => (
                <Tag key={index} colorScheme="green" variant="solid">
                {item}
                </Tag>
            ))}
            </HStack>
          </Box>

          <Box mb={4}>
          <HStack mb={2} mt={6}>
            <CloseIcon color="red.400" boxSize={5} />
            </HStack>

            <HStack spacing={3} wrap="wrap">
            {site.cons?.map((item, index) => (
                <Tag key={index} colorScheme="red" variant="subtle">
                {item}
                </Tag>
            ))}
            </HStack>
          </Box>
          </Box>

        </Box>
  
        {/* 按钮区域 */}
        <HStack spacing={4} justify="center" mt={10} mb={8}>
          <Button
            colorScheme="green"
            variant={activeTab === "review" ? "solid" : "outline"}
            onClick={() => setActiveTab("review")}
          >
            Expert Review
          </Button>

          {site.promoCodes?.length > 0 && (
          <Button
            colorScheme="green"
            variant={activeTab === "promo" ? "solid" : "outline"}
            onClick={() => setActiveTab("promo")}
          >
            Promo Codes
          </Button>
        )}
          <Button
            colorScheme="green"
            variant={activeTab === "alt" ? "solid" : "outline"}
            onClick={() => setActiveTab("alt")}
          >
            Alternatives
          </Button>
        </HStack>
        {/* ✅ 内容区容器 */}
        <Box
        maxW="1000px"
        mx="auto"
        px={6}
        py={8}
        bg="gray.700"
        borderRadius="xl"
        boxShadow="md"
        backdropFilter="blur(4px)"
        mt={6}
        >
        {activeTab === "review" && (
            <Text fontSize="md" color="white">
                {site.review}
            </Text>
        )}

        {activeTab === "promo" && (
            site.promoCodes?.length > 0 ? (
            <VStack spacing={3} align="start">
                {site.promoCodes.map((code, idx) => (
                <Tag key={idx} colorScheme="teal" variant="solid">
                    {code}
                </Tag>
                ))}
            </VStack>
            ) : (
            <Text color="gray.400" fontStyle="italic">
                This site currently does not offer promo codes.
            </Text>
            )
        )}

        {activeTab === "alt" && (
            <Text fontSize="md" color="white">
            {site.alternatives}
            </Text>
        )}
        </Box>

      </>
    );
  }
  