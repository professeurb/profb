// https://www.gatsbyjs.com/docs/creating-and-modifying-pages/

// const { graphql } = require("gatsby");

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (/\.mdx?$/.test(page.componentPath)) {
    console.log(page.componentPath);
    // const query = await graphql`
    //   query MyQuery {
    //     mdx(
    //       fileAbsolutePath: {
    //         eq: "/Users/olivier/Sites/prif/professeurb/src/pages/articles/quicksort1/index.mdx"
    //       }
    //     ) {
    //       tableOfContents
    //     }
    //   }
    // `;

    createPage({
      ...page,
      context: {
        ...page.context,
        house: `Gryffindor`,
      },
    });
  } else {
    createPage(page);
  }
};
