module.exports = {
  siteMetadata: {
    title: "Le Professeur B. raconte",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      // Après enquête, cette version est correcte :
      // gatsby-remark-katex et remark-html-katex
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.jsx"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: { icon: false },
          },
          { resolve: `gatsby-remark-katex`, options: { strict: `ignore` } },
        ],
        remarkPlugins: [
          // require("remark-math"),
          require("remark-html-katex"),
        ],
        // rehypePlugins: [require("rehype-katex")],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
