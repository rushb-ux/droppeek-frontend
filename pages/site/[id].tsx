import Link from "next/link"
import { useRouter } from "next/router"
import RatingStars from "../../src/components/ui/RatingStars"
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import DisqusThread from '@/components/ui/DisqusThread'


import {
  Box,
  Heading,
  Text,
  VStack,
  Tag,
  Image,
  HStack,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import sites from "../../src/data/sites"
// import EmojiReactions from "@/components/ui/EmojiReactions";



import PromoCode from "@/components/ui/promoCode"
import { AlternativesList } from "@/components/ui/AlternativesList" 
import { getAllPostSlugs } from "../../utils/posts"
type SalesBox = {
    name: string;
    price: number;
    iconUrl: string;
    slug: string;
};

type RelatedReview = {
  slug: string;
  title: string;
  thumbnail?: string | null;
  imageUrl?: string;
  platform?: string | null;
};

type SiteReviewPageProps = {
  initialSiteId: string;
  relatedReviews: RelatedReview[];
};

export async function getStaticPaths() {
  return {
    paths: sites.map((site) => ({ params: { id: site.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const site = sites.find((item) => item.id === params.id);

  if (!site) {
    return { notFound: true };
  }

  const relatedReviews = getAllPostSlugs()
    .filter((post) => post.platform?.toLowerCase() === site.name.toLowerCase())
    .slice(0, 3);

  return {
    props: {
      initialSiteId: params.id,
      relatedReviews,
    },
  };
}






export default function SiteReviewPage({ initialSiteId, relatedReviews }: SiteReviewPageProps) {
  const router = useRouter()
  const routeId = router.query.id
  const siteId = typeof routeId === "string" ? routeId : initialSiteId
  const site = sites.find((s) => s.id === siteId)
  const [salesData, setSalesData] = useState<SalesBox[]>([]);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  
  useEffect(() => {
    if (!siteId) return;
    fetch(`/api/fetchBoxes?siteId=${siteId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSalesData(data);
        } else {
          console.error("Invalid data format", data);
          setSalesData([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch sales boxes", err);
        setSalesData([]);
      });
  }, [siteId]);
  
  
      

  if (!site) {
    return (
      <Box p={10} textAlign="center">
        <Heading size="md">Site Not Found</Heading>
      </Box>
    )
  }

  return (
    <>
    {/* 最底层模糊背景图层 */}
    <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="1100px" 
        zIndex={-2}
        backgroundImage="url('/images/hero-bg.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        filter="blur(30px)"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgGradient: 'linear(to-b, rgba(0,0,0,0.7) 0%, white 100%)',
        }}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="1100px"
        zIndex={-1}
        bgGradient="linear(to-b, rgba(0,0,0,0.7), rgba(255,255,255,0))"
      />
      {/* Hero 区域 */}
      <Box
        position="relative"
        maxW="1200px"
        mx="auto"
        mt={40}
        minH="500px"
        borderRadius="xl"
        backgroundImage={`url('${site.image || "/images/hero-bg.png"}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        boxShadow="lg"
        overflow="hidden"
        px={{ base: 4, md: 10 }}
        py={{ base: 8, md: 12 }}

      >
        {/* 遮罩 */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-b, rgba(0, 0, 0, 1.15), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))"

          zIndex={1}
        />

        {/* 内容 */}
        <Box maxW="full" px={{ base: 4, md: 12 }} position="relative" zIndex={2} color="white">
        <HStack
          spacing={4}
          mb={4}
          align="start"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Image src={site.logo} alt={site.name} boxSize="60px" />
          <h2 className="font-poetsen text-2xl sm:text-4xl md:text-5xl text-shadow-lg">
            {site.name}
          </h2>
          <RatingStars rating={site.rating} />
        </HStack>


          <Text className="text-base sm:text-lg md:text-2xl max-w-[800px] mb-4">
            {site.description}
          </Text>

          {/* Pros */}
            <Box mb={4}>
              <Flex wrap="wrap" gap={3}>
                {site.pros?.map((item, index) => (
                  <Tag key={index} colorScheme="green" variant="solid">
                    <CheckIcon mr={1} /> {item}
                  </Tag>
                ))}
              </Flex>
            </Box>

            {/* Cons */}
            <Box mb={4}>
              <Flex wrap="wrap" gap={3}>
                {site.cons?.map((item, index) => (
                  <Tag key={index} colorScheme="red" variant="subtle">
                    <CloseIcon mr={1} /> {item}
                  </Tag>
                ))}
              </Flex>
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
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={6}
          align="flex-start"
        >            
        {/* Top 5 Sales + Expert Review） */}
              <Box flex="2">
                {/* Top 5 Sales (24H) */}
                <Box p={6} borderWidth={1} borderRadius="xl" bg="white" boxShadow="md" mb={6}>
                  <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Top 5 Sales (24H)
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
                          src={item.iconUrl}
                          alt={item.name}
                          width="100%"
                          height="100px"
                          objectFit="cover"
                          borderRadius="md"
                          mb={2}
                        />
                        <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
                          {item.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          ${item.price}
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

                  {Array.isArray(site.reviewPoints) && site.reviewPoints.length > 0 ? (
                    <VStack align="start" spacing={4}>
                      {site.reviewPoints.map((point, index) => (
                        <Box key={index}>
                          <Text fontWeight="bold" fontSize="md" mb={1}>
                            {index + 1}. {point.highlights}
                          </Text>
                          <Text color="gray.700" fontSize="sm">
                            {point.text}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <Text whiteSpace="pre-line" className="font-dm-serif">
                      {site.review}
                    </Text>
                  )}

                  {relatedReviews.length > 0 && (
                    <Box mt={10}>
                      <Flex
                        align={{ base: "flex-start", md: "center" }}
                        justify="space-between"
                        direction={{ base: "column", md: "row" }}
                        gap={2}
                        mb={4}
                      >
                        <Box>
                          <Text fontSize="xl" fontWeight="bold">
                            Related Reviews
                          </Text>
                          <Text fontSize="sm" color="gray.500">
                            More hands-on reviews connected to {site.name}.
                          </Text>
                        </Box>
                        <Link href="/reviews">
                          <Text fontSize="sm" fontWeight="semibold" color="blue.500">
                            View all reviews →
                          </Text>
                        </Link>
                      </Flex>

                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                        {relatedReviews.map((review) => (
                          <Link key={review.slug} href={`/blog/${review.slug}`}>
                            <Box
                              h="100%"
                              borderWidth={1}
                              borderColor="gray.200"
                              borderRadius="xl"
                              overflow="hidden"
                              bg="gray.50"
                              transition="all 0.2s ease"
                              _hover={{
                                transform: "translateY(-2px)",
                                boxShadow: "md",
                                borderColor: "blue.200",
                              }}
                            >
                              <Image
                                src={review.thumbnail || review.imageUrl || "/media/placeholder.jpg"}
                                alt={review.title}
                                w="100%"
                                h="120px"
                                objectFit="cover"
                              />
                              <Box p={4}>
                                <Text
                                  fontSize="sm"
                                  fontWeight="bold"
                                  color="gray.800"
                                  noOfLines={2}
                                >
                                  {review.title}
                                </Text>
                                <Text mt={3} fontSize="xs" fontWeight="semibold" color="blue.500">
                                  Read review →
                                </Text>
                              </Box>
                            </Box>
                          </Link>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )}

                  {/* 评论区 */}
                  <Box mt={10}>
                    <DisqusThread identifier={`/site/${site.id}`} title={site.name} />
                  </Box>
                  
                </Box>

                {/* Emoji Reaction Feedback
                <EmojiReactions siteId={site.id} emojiCounts={site.emojiCounts} /> */}


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
                alternatives={sites.filter((s) => s.id !== site.id)}
            />
            </Box>
        </Flex>
        <Box className="mt-10 text-center">
          <Separator className="my-4" />
          <Text className="text-lg font-medium mb-3">Was this page helpful?</Text>
          <div className="flex justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors ${feedback === "up" ? "text-green-600" : "hover:text-green-500"}`}
              onClick={() => setFeedback("up")}
            >
              <ThumbsUp className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors ${feedback === "down" ? "text-red-600" : "hover:text-red-500"}`}
              onClick={() => setFeedback("down")}
            >
              <ThumbsDown className="h-6 w-6" />
            </Button>
          </div>
          {feedback && (
            <Text className="mt-2 text-sm text-gray-500">
              {feedback === "up" ? "Thanks for your feedback!" : "Thanks, we’ll try to improve this page."}
            </Text>
          )}
        </Box>

        </Box>

    </>
  )
}
