import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllPostSlugs() {
  const folders = fs.readdirSync(POSTS_DIR).filter((name) => {
    const fullPath = path.join(POSTS_DIR, name);
    return fs.statSync(fullPath).isDirectory() &&
           fs.existsSync(path.join(fullPath, "index.md")); // ✅ 目录存在且包含 index.md
  });

  return folders.map((folder) => {
    const fullPath = path.join(POSTS_DIR, folder, "index.md");
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(fileContent);
    return {
      slug: folder,
      title: data.title || folder,
    };
  });
}
