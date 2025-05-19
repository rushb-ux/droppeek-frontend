import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Box } from "@chakra-ui/react";

interface Props {
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    image?: string;
  };
  content: string;
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const blogDir = path.join(process.cwd(), "content/blog");

  const postSlugs = fs.readdirSync(postsDir).filter((name) =>
    fs.statSync(path.join(postsDir, name)).isDirectory()
  );

  const blogSlugs = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));

  const paths = [
    ...postSlugs.map((slug) => ({ params: { slug } })),
    ...blogSlugs.map((slug) => ({ params: { slug } })),
  ];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const blogPath = path.join(process.cwd(), "content/blog", `${params.slug}.md`);
  const postPath = path.join(process.cwd(), "content/posts", params.slug, "index.md");

  let fileContent = "";
  if (fs.existsSync(blogPath)) {
    fileContent = fs.readFileSync(blogPath, "utf8");
  } else if (fs.existsSync(postPath)) {
    fileContent = fs.readFileSync(postPath, "utf8");
  } else {
    return { notFound: true };
  }

  const { data, content } = matter(fileContent);

  return {
    props: {
      frontmatter: {
        title: data.title || "Untitled",
        description: data.description || "",
        image: data.image || "/images/hero-bg.png",
        date: data.date ? data.date.toString() : "",
      },
      content,
    },
  };
}

export default function ArticlePage({ frontmatter, content }: Props) {
  return (
    <div>
      {/* Hero 区 */}
      <Box
        maxW="1200px"
        mx="auto"
        mt={{ base: 20, md: 40 }}
        px={{ base: 6, md: 60 }}
        py={{ base: 10, md: 40 }}
        borderRadius="xl"
        backgroundImage={`linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.25)),url('${frontmatter.image}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        boxShadow="lg"
        overflow="hidden"
        color="white"
      >
        <Box position="relative" zIndex={2} textAlign="left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-poetsen text-left break-words whitespace-normal max-w-screen-md">
            {frontmatter.title}
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-200">{frontmatter.date}</p>
          {frontmatter.description && (
            <p className="mt-4 max-w-xl text-lg text-gray-300">{frontmatter.description}</p>
          )}
        </Box>
      </Box>

      {/* 正文内容 */}
      <Box maxW="800px" mx="auto" py={10} px={{ base: 4, md: 6 }}>
        <Box
        maxW="800px"
        mx="auto"
        py={10}
        px={{ base: 4, md: 6 }}
        className="prose prose-neutral dark:prose-invert max-w-none"
      >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
      </Box>
    </div>
  );
}
