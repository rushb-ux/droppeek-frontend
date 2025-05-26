const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const BLOG_DIR = path.join(__dirname, "content", "blog");

function injectImageUrlToMarkdown() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  files.forEach((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");

    const match = raw.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
    if (!match) {
      console.warn(`⚠️ 跳过 ${file}（无 frontmatter）`);
      return;
    }

    const frontmatterRaw = match[1];
    const content = match[2];

    let frontmatter = yaml.load(frontmatterRaw);
    if (frontmatter.imageUrl) {
      console.log(`✅ 已有 imageUrl，跳过：${file}`);
      return;
    }

    const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (!imageMatch) {
      console.warn(`❌ 未找到图片：${file}`);
      return;
    }

    let imageUrl = imageMatch[1];

    if (!imageUrl.startsWith("http")) {
      if (imageUrl.startsWith("media/")) {
        imageUrl = imageUrl.replace(/^media\//, "/media/");
      } else if (!imageUrl.startsWith("/media/")) {
        imageUrl = "/media/" + imageUrl;
      }
    }

    frontmatter.imageUrl = imageUrl;

    const newYaml = yaml.dump(frontmatter, { lineWidth: -1 }).trim();
    const newContent = `---\n${newYaml}\n---\n${content}`;

    fs.writeFileSync(filePath, newContent, "utf-8");
    console.log(`🖼️  插入 imageUrl -> ${file}: ${imageUrl}`);
  });
}

injectImageUrlToMarkdown();
