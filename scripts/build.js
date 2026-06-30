const fs = require("fs");
const path = require("path");

// 强制使用 GitHub Actions 当前目录
const root = process.cwd();
const postsDir = path.join(root, "posts");

console.log("ROOT:", root);
console.log("POSTS DIR:", postsDir);

if (!fs.existsSync(postsDir)) {
  console.log("ERROR: posts folder not found");
  process.exit(1);
}

const files = fs.readdirSync(postsDir);

let posts = [];

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const raw = fs.readFileSync(filePath, "utf8");

  const title = (raw.match(/title:\s*(.*)/)?.[1] || "").trim();
  const category = (raw.match(/category:\s*(.*)/)?.[1] || "").trim();
  const date = (raw.match(/date:\s*(.*)/)?.[1] || "").trim();

  const content = raw.split("---").slice(2).join("---").trim();

  posts.push({ title, category, date, content });
}

fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));

console.log("SUCCESS POSTS:", posts.length);
