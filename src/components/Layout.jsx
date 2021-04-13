import React from "react";
import { Grid, Container, Header, Divider, Table } from "semantic-ui-react";
import { graphql } from "gatsby";
import CodeBlock from "./codeblock.jsx";
// import Toccer from "src/components/toccer.jsx";
import { MDXRenderer } from "gatsby-plugin-mdx";

import "katex/dist/katex.min.css";

import { MDXProvider } from "@mdx-js/react";

const Layout = ({ data: { mdx } }) => {
  console.log(mdx);
  return (
    <MDXProvider
      components={{
        h1: (props) => <Header as="h1" dividing {...props} />,
        // h2: (props) => <Divider horizontal section {...props} />,
        pre: ({ children }) => {
          return <CodeBlock {...children.props} />;
        },
        table: Table,
        th: (props) => (
          <Table.HeaderCell
            {...props}
            {...(props.align && { textAlign: props.align })}
          />
        ),
        td: (props) => (
          <Table.Cell
            {...props}
            {...(props.align && { textAlign: props.align })}
          />
        ),
        hr: Divider,
      }}
    >
      <Grid>
        <Grid.Column width={4}>
          {/* <Toccer headings={data.mdx.tableOfContents.items} /> */}
        </Grid.Column>
        <Grid.Column width={9}>
          {mdx.frontmatter.title && (
            <Header as="h1" style={{ fontSize: "4em", fontWeight: "900" }}>
              {mdx.frontmatter.title}
            </Header>
          )}
          {mdx.frontmatter.subtitle && (
            <Header as="h2" style={{ fontSize: "2em" }}>
              {mdx.frontmatter.subtitle}
            </Header>
          )}
          {(mdx.frontmatter.title || mdx.frontmatter.subtitle) && (
            <Divider hidden section />
          )}
          <Container>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </Container>
        </Grid.Column>
      </Grid>
    </MDXProvider>
  );
};

export default Layout;

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        subtitle
      }
      tableOfContents
    }
  }
`;
