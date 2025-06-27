import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type BlogPostMeta = {
  slug: string
  title: string
  date: string
  description?: string
  platform?: string
}

export function getRelatedPosts(platformId: string): BlogPostMeta[] {
  const blogDir = path.join(process.cwd(), "content/blog")
  return fs.readdirSync(blogDir)
    .map((filename) => {
      const fullPath = path.join(blogDir, filename)
      const fileContent = fs.readFileSync(fullPath, "utf-8")
      const { data } = matter(fileContent)
      return {
        slug: filename.replace(/\\.md$/, ""),
        ...data,
      } as BlogPostMeta
    })
    .filter((post) => post.platform?.toLowerCase() === platformId.toLowerCase())
}
