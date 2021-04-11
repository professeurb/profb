import React from "react";
import { Grid, Container, Header, Divider, Table } from "semantic-ui-react";
import { useStaticQuery, graphql } from "gatsby";
import CodeBlock from "./codeblock.jsx";
// import Toccer from "src/components/toccer.jsx";

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
  console.log(props);
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
          {props.pageContext.frontmatter.title && (
            <Header as="h1" style={{ fontSize: "4em", fontWeight: "900" }}>
              {props.pageContext.frontmatter.title}
            </Header>
          )}
          {props.pageContext.frontmatter.subtitle && (
            <Header as="h2" style={{ fontSize: "2em" }}>
              {props.pageContext.frontmatter.subtitle}
            </Header>
          )}
          {(props.pageContext.frontmatter.title ||
            props.pageContext.frontmatter.subtitle) && (
            <Divider hidden section />
          )}
          <Container>{children}</Container>
        </Grid.Column>
      </Grid>
    </MDXProvider>
  );
};

export default Layout;

// https://scottspence.com/2020/02/13/smooth-scroll-toc-gatsby/
