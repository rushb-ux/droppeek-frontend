'use client'
import { useRouter } from "next/router"
import RatingStars from "../../src/components/ui/RatingStars"
import { useEffect, useState } from "react";

import {
  Box,
  Heading,
  Text,
  VStack,
  Tag,
  Image,
  HStack,
} from "@chakra-ui/react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import sites from "../../src/data/sites"

import PromoCode from "@/components/ui/promoCode"
import { AlternativesList } from "@/components/ui/AlternativesList" 
type Box = {
  node: {
    name: string;
    price: number;
    iconUrl: string;
  };
};





export default function SiteReviewPage() {
  const router = useRouter()
  const { id } = router.query
  const site = sites.find((s) => s.id === id)
  const [salesData, setSalesData] = useState<Box[]>([]);

  useEffect(() => {
      async function fetchBoxes() {
        try {
          const res = await fetch("/api/fetchBoxes");
          const data = await res.json();
          setSalesData(data.data.boxes.edges.slice(0, 5)); // 这里注意是 edges
        } catch (error) {
          console.error("Failed to fetch boxes", error);
        }
      }
      fetchBoxes();
    }, []);
      

  if (!site) {
    return (
      <Box p={10} textAlign="center">
        <Heading size="md">Site Not Found</Heading>
      </Box>
    )
  }

  return (
    <>
      {/* Hero 区域 */}
      <Box
        position="relative"
        maxW="1200px"
        mx="auto"
        mt={40}
        minH="500px"
        borderRadius="xl"
        backgroundImage="url('/images/hero-bg.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        boxShadow="lg"
        overflow="hidden"
        px={10} 
        py={12}
      >
        {/* 遮罩 */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-b, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))"

          zIndex={1}
        />

        {/* 内容 */}
        <Box maxW="1000px" mx="auto" px={12} position="relative" zIndex={2} color="white">
          <HStack spacing={4} mb={4}>
            <Image src={site.logo} alt={site.name} boxSize="60px" />
            <h2 className="font-poetsen text-5xl text-shadow-lg">{site.name}</h2>
            <RatingStars rating={site.rating} />
            
          </HStack>

          <Text className="text-2xl max-w-[800px] mb-4">
            {site.description}
          </Text>

          {/* Pros */}
          <Box mb={4}>
            <HStack spacing={3} wrap="wrap">
              {site.pros?.map((item, index) => (
                <Tag key={index} colorScheme="green" variant="solid">
                  <CheckIcon mr={1} /> {item}
                </Tag>
              ))}
            </HStack>
          </Box>

          {/* Cons */}
          <Box mb={4}>
            <HStack spacing={3} wrap="wrap">
              {site.cons?.map((item, index) => (
                <Tag key={index} colorScheme="red" variant="subtle">
                  <CloseIcon mr={1} /> {item}
                </Tag>
              ))}
            </HStack>
          </Box>

          {/* Promo Codes */}
          {site.promoCodes?.length > 0 && (
            <Box mt={10}>
            <PromoCode
                code={site.promoCodes[0]}
                bonusText={site.promoText}
                description={site.promoDescription}
            />
            </Box>
 
  

          )}
        </Box>
      </Box>

      {/* Expert Review & Alternatives */}
        <Box maxW="1200px" mx="auto" mt={20} mb={16} px={6}>
        <HStack spacing={6} align="flex-start">
            {/* Top 5 Sales + Expert Review） */}
              <Box flex="2">
                {/* Top 5 Sales (24H) */}
                <Box mb={8}>
                  <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Top 5 Mystery Boxes (24H)
                  </Text>

                  <Box overflowX="auto" pb={2}>
                    <HStack spacing={4} minW="max-content">
                      {salesData.map((item, index) => (
                        <Box
                          key={index}
                          minW="140px"
                          bg="white"
                          borderRadius="xl"
                          boxShadow="md"
                          p={3}
                          textAlign="center"
                          flexShrink={0}
                          _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                        >
                          <Image
                            src={item.node.iconUrl}
                            alt={item.node.name}
                            width="100%"
                            height="100px"
                            objectFit="cover"
                            borderRadius="md"
                            mb={2}
                          />
                          <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
                            {item.node.name}
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            ${item.node.price}
                          </Text>
                        </Box>
                      ))}
                    </HStack>
                  </Box>
                </Box>


                {/* Expert Review */}
                <Box
                  p={6}
                  bg="white"
                  borderRadius="xl"
                  borderWidth={1}
                  boxShadow="md"
                >
                  <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Expert Review
                  </Text>
                  <Text whiteSpace="pre-line" className="font-dm-serif">
                    {site.review}
                  </Text>
                </Box>
              </Box>
            {/* Alternatives - */}
            <Box
            flex="1"
            p={6}
            bg="white"
            borderRadius="xl"
            borderWidth={1}
            boxShadow="md"
            >
            <Text fontSize="xl" fontWeight="bold" mb={4}>Alternatives</Text>
            <AlternativesList
                alternatives={sites.filter((s) => s.id !== id)}
            />
            </Box>
        </HStack>
        </Box>

    </>
  )
}
