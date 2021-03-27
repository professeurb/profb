// import fs from "fs";
import path from "path";
import matter from "gray-matter";

// const articleDirectory = path.join(process.cwd(), "_articles");

// export async function bla() {
//   const truc = require.context("../pages", true, /\.[a-z]+$/);
//   const stuff = [];
//   for (const key of truc.keys()) {
//     stuff.push(key);
//   }
//   return stuff;
// }

// export async function getArticles() {
//   const articles = require.context("_articles/", true, /index\.mdx$/);
//   const data = articles.keys().map((key) => key.split("/").slice(1, -1));

//   return data;
// }

// export async function getArticle(slug) {
//   slug.push("index.mdx");
//   const the_path = path.join(articleDirectory, slug.join("/"));
//   // const content = fs.readFileSync(the_path, "utf8");

//   return [];
// }
