const fs = require("fs");

const files = fs.readdirSync("./posts");

let posts = [];

files.forEach(file => {
  const raw = fs.readFileSync(`./posts/${file}`, "utf8");

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

fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));
