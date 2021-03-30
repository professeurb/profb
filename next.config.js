const frontmatter = require("remark-frontmatter");
const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");

const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [frontmatter, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
  future: {
    webpack5: true,
  },
});
