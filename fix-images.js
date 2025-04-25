const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "content", "posts");
const MEDIA_DIR = path.join(__dirname, "media");

// 获取所有 media 子文件夹中的文件路径（media/xxx.png）
function findMediaFile(filename) {
  const folders = fs.readdirSync(MEDIA_DIR);

    // 只处理真正的文件夹
    for (const folder of folders) {
      const folderPath = path.join(MEDIA_DIR, folder);
      const stat = fs.statSync(folderPath);

      if (!stat.isDirectory()) continue; // 跳过 .DS_Store 等文件

      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        if (file === filename) {
          return path.join(folderPath, file);
        }
      }
    }


  return null;
}

// 遍历所有 post 文件夹
fs.readdirSync(POSTS_DIR).forEach((folder) => {
  const postPath = path.join(POSTS_DIR, folder, "index.md");

  if (!fs.existsSync(postPath)) return;

  let content = fs.readFileSync(postPath, "utf8");

  // 查找 markdown 中所有图片
  const imageMatches = [...content.matchAll(/!\[[^\]]*\]\((.*?)\)/g)];

  imageMatches.forEach((match) => {
    const rawPath = match[1];
    const fileName = rawPath.split("?")[0]; // 去掉参数
    const baseName = path.basename(fileName);

    const foundPath = findMediaFile(baseName);

    if (foundPath) {
      const newUrl = `/media/${baseName}`;
      content = content.replace(rawPath, newUrl);
    } else {
      console.log(`❌ Not found: ${baseName}`);
    }
  });

  fs.writeFileSync(postPath, content, "utf8");
  console.log(`✅ Updated: ${folder}/index.md`);
});
