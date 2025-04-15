import {
    Box,
    Heading,
    Text,
    Image,
    Badge,
    HStack,
    SimpleGrid,
    Link,
    Icon,
    VStack,
  } from "@chakra-ui/react";
  import { FaStar, FaRegStar, FaArrowRight } from "react-icons/fa";
  
  const hypedropBoxes = [
    {
      name: "Legacy",
      slug: "legacy",
      rating: 2,
      price: "$19323.17",
    },
    {
      name: "No Limit",
      slug: "no-limit",
      rating: 2,
      price: "$5530.67",
    },
    {
      name: "1 in 10",
      slug: "1-in-10",
      rating: 3,
      price: "$108.3",
    },
  ];
  
  export default function MysteryBoxesPage() {
    return (
      <Box maxW="1000px" mx="auto" p={4}>
        <Heading size="xl" mb={6}>
          Popular Mystery Boxes
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {hypedropBoxes.map((box, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              _hover={{ boxShadow: "md", transform: "scale(1.01)" }}
              transition="all 0.2s"
            >
              <Image
                src={`https://www.google.com/s2/favicons?sz=64&domain=hypedrop.com`}
                alt="HypeDrop Logo"
                fallbackSrc="/images/placeholder.jpg"
                boxSize="48px"
                mb={3}
              />
  
              <VStack align="start" spacing={2}>

                {/* 平台标签 + 推广链接 */}
                <HStack justifyContent="space-between" w="100%">
                  <Badge colorScheme="teal">HYPEDROP</Badge>
                  <Link
                    href="https://hypedrop.com/r/droppeek"
                    fontSize="xs"
                    color="green.500"
                    isExternal
                  >
                    🎁 Get Started
                  </Link>
                </HStack>
  
                <Text fontWeight="bold" fontSize="lg">
                  {box.name}
                </Text>
  
                <Text fontSize="sm" color="gray.600">
                  {box.price}
                </Text>
  
                {/* 星星评分 */}
                <HStack spacing={1}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      as={i < box.rating ? FaStar : FaRegStar}
                      key={i}
                      color={i < box.rating ? "yellow.400" : "gray.300"}
                    />
                  ))}
                </HStack>
  
                {/* 箱子页面跳转 */}
                <Link
                  href={`https://www.hypedrop.com/boxes/view/na/${box.slug}`}
                  fontSize="sm"
                  color="blue.500"
                  isExternal
                >
                  View Box <Icon as={FaArrowRight} ml={1} />
                </Link>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  }
  