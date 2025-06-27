import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"

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
        imageUrl: data.imageUrl || "/media/placeholder.jpg",

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
        maxW="800px"
        mx="auto"
        mt={{ base: 20, md: 28 }}
        px={{ base: 4, md: 6 }}
      >

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {frontmatter.title}
            </h1>
          <p className="mt-2 text-sm md:text-base text-gray-500">
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          {frontmatter.description && (
            <p className="mt-4 max-w-xl text-lg text-gray-300">{frontmatter.description}</p>
          )}
      </Box>

      {/* 正文内容 */} d
      <Box maxW="800px" mx="auto" py={10} px={{ base: 4, md: 6 }}>
        <Box
        maxW="800px"
        mx="auto"
        py={10}
        px={{ base: 4, md: 6 }}
        className="prose prose-neutral dark:prose-invert max-w-none"
      >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => {
            const isExternal = props.src?.startsWith("http");
            const fixedSrc = isExternal
              ? props.src
              : props.src?.startsWith("/media/")
              ? props.src
              : `/media/${props.src?.replace(/^media\//, "")}`;
            return (
              <img
                {...props}
                src={fixedSrc}
                className="rounded-lg my-4 max-w-full mx-auto"
                alt={props.alt || ""}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>


    </Box>
      </Box>
    </div>
    
  );
}