import {
  Box,
  Heading,
  Link,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Badge,
  HStack,
  Stack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { getBlogPosts } from "../utils/posts";
import { GetStaticProps } from "next";

interface BlogPageProps {
  posts: {
    title: string;
    description: string;
    date: string;
    category: string;
    readTime: string;
    imageUrl: string;
    slug: string;
    content: string;
  }[];
}

const BlogPage = ({ posts }: BlogPageProps) => {
  return (
    <Box maxW="7xl" mx="auto" py={10} px={4}>
      <Heading as="h1" size="2xl" textAlign="center" mb={2}>
        Our Blog
      </Heading>
      <Text textAlign="center" mb={10}>
        Learn more about us, through honest mystery box reviews and platform updates.
      </Text>

      {/* Featured */}
      <Box mb={10}>
        <Stack direction={{ base: "column", md: "row" }} spacing={8}>
          <Image
            src={posts[0].imageUrl}
            alt={posts[0].title}
            objectFit="cover"
            w={{ base: "100%", md: "50%" }}
            h="300px"
            borderRadius="md"
          />
          <VStack align="start" spacing={3} justify="center">
            <Badge colorScheme="green">{posts[0].category}</Badge>
            <Link
              as={NextLink}
              href={`/blog/${posts[0].slug}`}
              fontWeight="bold"
              fontSize="2xl"
              color="teal.600"
            >
              {posts[0].title}
            </Link>
            <Text fontSize="sm" color="gray.500">
              {posts[0].date} · {posts[0].readTime}
            </Text>
            <Text>{posts[0].description}</Text>
          </VStack>
        </Stack>
      </Box>

      {/* Grid Posts */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {posts.slice(1).map((post, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            _hover={{ boxShadow: "lg" }}
          >
            <Image
              src={post.imageUrl}
              alt={post.title}
              objectFit="cover"
              w="100%"
              h="180px"
            />
            <Box p={5}>
              <Text fontSize="xs" color="gray.500" mb={1}>
                {post.category}
              </Text>
              <Link
                as={NextLink}
                href={`/blog/${post.slug}`}
                fontWeight="bold"
                fontSize="lg"
                color="teal.600"
              >
                {post.title}
              </Link>
              <Text fontSize="sm" color="gray.600" mt={2}>
                {post.description}
              </Text>
              <Text fontSize="xs" color="gray.400" mt={1}>
                {post.date} · {post.readTime}
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = getBlogPosts();

  // 日期从新到旧
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  console.log("📦 Blog posts fetched:", posts);
  return {
    props: { posts },
  };
};

export default BlogPage;
