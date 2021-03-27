const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");

const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
});
