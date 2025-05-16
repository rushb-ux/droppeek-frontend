import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fixImagePath } from "@/lib/utils";

export function getBlogPosts() {
  const blogDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(blogDir);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.md$/, "");

      return {
        title: data.title,
        description: data.description || "",
        date: data.date ? new Date(data.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }) : "",
        category: data.category || "Uncategorized",
        readTime: data.readTime || "3 min read",
        imageUrl: fixImagePath(data.image || "/images/default-blog.png"),
        slug,
        content,
      };      
    });
}




export function getAllPostSlugs() {
  const postsDir = path.join(process.cwd(), "content/posts")
  const folders = fs.readdirSync(postsDir)

  return folders
  .filter((folder) => {
    const fullPath = path.join(postsDir, folder)
    return fs.statSync(fullPath).isDirectory()
  })
  .map((folder) => {
    const filePath = path.join(postsDir, folder, "index.md")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    const imageMatch = content.match(/!\[[^\]]*\]\((.*?)\)/)
    const thumbnail = imageMatch ? imageMatch[1] : null

    console.log(`[POST] ${folder}`);
    console.log(`  → thumbnail = ${thumbnail}`);
    
    return {
      slug: folder,
      title: data.title || "Untitled",
      thumbnail,
    }
  })

}