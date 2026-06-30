const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const postsDir = path.join(root, "posts");

if (!fs.existsSync(postsDir)) {
  throw new Error("posts folder missing: " + postsDir);
}

const files = fs.readdirSync(postsDir);

let posts = [];

for (const file of files) {
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");

  const title = (raw.match(/title:\s*(.*)/)?.[1] || "").trim();
  const category = (raw.match(/category:\s*(.*)/)?.[1] || "").trim();
  const date = (raw.match(/date:\s*(.*)/)?.[1] || "").trim();

  const content = raw.split("---").slice(2).join("---").trim();

  posts.push({ title, category, date, content });
}

fs.writeFileSync(
  path.join(root, "posts.json"),
  JSON.stringify(posts, null, 2)
);

console.log("SUCCESS:", posts.length);
