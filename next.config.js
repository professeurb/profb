const frontmatter = require("remark-frontmatter");
const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");

// Ajout d'ids pour la création d'une table des matières
const autoHeading = require("remark-heading-autoid");

const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [autoHeading, frontmatter, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
  future: {
    webpack5: true,
  },
});

// Front-matter stuff
// https://www.josephrex.me/frontmatter-with-nextjs-and-mdx/
