const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "../posts");

const files = fs.readdirSync(postsDir);

let posts = [];

files.forEach(file => {
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8");

  const title = raw.match(/title:\s*(.*)/)?.[1]?.trim() || "";
  const category = raw.match(/category:\s*(.*)/)?.[1]?.trim() || "";
  const date = raw.match(/date:\s*(.*)/)?.[1]?.trim() || "";

  const content = raw.split("---").slice(2).join("---").trim();

  posts.push({
    title,
    category,
    date,
    content
  });
});

fs.writeFileSync(
  path.join(__dirname, "../posts.json"),
  JSON.stringify(posts, null, 2)
);

console.log("build success");
