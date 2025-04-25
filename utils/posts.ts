import fs from "fs"
import path from "path"
import matter from "gray-matter"

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
