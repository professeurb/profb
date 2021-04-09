import React from "react";
import { Grid, Container, Header } from "semantic-ui-react";
import { useStaticQuery, graphql } from "gatsby";

import "katex/dist/katex.min.css";

import { MDXProvider } from "@mdx-js/react";

const Layout = ({ title, children, ...props }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      mdx {
        tableOfContents
      }
    }
  `);
  console.log(data);
  return (
    <MDXProvider
      components={{
        h1: (props) => <Header as="h1" dividing {...props} />,
      }}
    >
      <Grid>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={9}>
          {props.pageContext.frontmatter.title && (
            <Header as="h1">{props.pageContext.frontmatter.title}</Header>
          )}
          <Container>{children}</Container>
        </Grid.Column>
      </Grid>
    </MDXProvider>
  );
};

export default Layout;

// https://scottspence.com/2020/02/13/smooth-scroll-toc-gatsby/
