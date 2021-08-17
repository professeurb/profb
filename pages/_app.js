import React from "react";

import "katex/dist/katex.min.css";
import "semantic-ui-css/semantic.min.css";

import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "@components/codeblock";
import Footer from "@components/header";
import { Container, Header, Divider } from "semantic-ui-react";

const components = {
  h1: (props) => <Header as="h1" {...props} />,
  h2: (props) => <Header as="h2" {...props} />,
  h3: (props) => <Header as="h3" {...props} />,
  pre: ({ children }) => {
    return <CodeBlock {...children.props} />;
  },
};

export default function App(props) {
  const { Component, pageProps } = props;
  // Ce n'est pas très orthodoxe ainsi, mais cela donne une chance
  // de récupérer des infos.
  const pageComponent = Component(pageProps);
  // On peut jeter un œil ici :
  // https://leerob.io/snippets/mdx-table-of-contents
  const anchors = pageComponent.props.children // React.Children.toArray(children)
    .filter(
      (child) =>
        child.props?.mdxType && ["h1", "h2", "h3"].includes(child.props.mdxType)
    )
    .map((child) => ({
      url: "#" + child.props.id,
      depth:
        (child.props?.mdxType &&
          parseInt(child.props.mdxType.replace("h", ""), 0)) ??
        0,
      text: child.props.children,
    }));

  console.log(pageComponent);
  console.log(anchors);

  // if (props.Component.isMDXComponent) console.log(pageComponent);
  return (
    <MDXProvider components={components}>
      <Footer />
      {props.Component.isMDXComponent && (
        <>
          <Container text>
            <h1 style={{ fontSize: "3em" }}>
              {pageComponent.props.meta.title}
            </h1>
            <h2 style={{ fontSize: "2em" }}>
              {pageComponent.props.meta.subtitle}
            </h2>
          </Container>
          <Divider hidden />
        </>
      )}
      <Container text>{pageComponent}</Container>
    </MDXProvider>
  );
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const mdxFiles = fs.readdirSync(postsDirectory);
  // const mdxFiles = fs.readdirSync("posts")
  // Loop through all post files and create array of slugs (to create links)
  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
  // Optionally loop through files, get content, and parse frontmatter
  // const postsWithFrontmatter = files.map((filename) => {
  //   const postContent = fs
  //     .readFileSync(path.join("posts", params.slug + ".mdx"))
  //     .toString();
  //   // Dont do this.
  //   // const frontmatter = matter(postContent)
  //   // Parse the MDX as an AST instead
  //   // Use the MDX library to parse here "server-side"
  //   // Pass the parsed data back to page component below
  //   return {
  //     slug: filename.replace(".mdx", ""),
  //     frontmatter,
  //   };
  // });
  return {
    props: {
      posts: paths,
      // or posts: postsWithFrontmatter
    },
  };
}
