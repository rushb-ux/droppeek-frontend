import fs from "fs"
import path from "path"
import matter from "gray-matter"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Params = {
  slug: string
}

type FrontMatter = {
  title: string
  date: string
  [key: string]: any
}

type Props = {
  frontmatter: FrontMatter
  content: string
}

export async function getStaticPaths() {
  const postsDir = path.join("content", "posts")
  const folders = fs.readdirSync(postsDir)
  const paths = folders.map((folder) => ({
    params: { slug: folder },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: Params }) {
  const filePath = path.join("content", "posts", params.slug, "index.md")
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  if (data.date instanceof Date) {
    data.date = data.date.toISOString()
  }

  return {
    props: {
      frontmatter: data as FrontMatter,
      content,
    },
  }
}

export default function PostPage({ frontmatter, content }: Props) {
  return (
  <div className="prose dark:prose-invert mx-auto py-10 px-4">
    <h1>{frontmatter.title}</h1>
    <p className="text-sm text-gray-500">{frontmatter.date}</p>
    <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
            img: ({ node, ...props }) => (
            <img
                {...props}
                src={`/media/${props.src}`} // 确保路径正确
                className="rounded-lg my-4 max-w-full"
                alt={props.alt || ""}
            />
            ),
            }}
        >
            {content}
    </ReactMarkdown>
  </div>
)

}
