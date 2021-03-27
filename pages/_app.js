import React from "react";

import "katex/dist/katex.min.css";
import { ThemeProvider } from "theme-ui";
import theme from "style/theme";
import Prism from "@theme-ui/prism";
import CodeBlock from "@components/codeblock";
import { Container } from "theme-ui";

import Footer from "@components/header";

// https://theme-ui.com/theme-spec

const my_components = {
  // h1: (props) => <h1 style={{ color: "green" }} {...props} />,
  // pre: (props) => <div {...props} />,
  pre: ({ children }) => {
    console.log("Pre");
    console.log(children);
    // return <>{children}</>;
    return (
      <>
        <CodeBlock {...children.props} />
        {/* <Prism {...children.props} /> */}
      </>
    );
  },
  code: Prism,
  // inlineCode: (props) => {
  //   console.log("Code");
  //   console.log(props);
  //   return <Prism {...props} />;
  // },
};

export default function App(props) {
  const { Component, pageProps } = props;
  // if (props.Component.isMDXComponent) console.log(props);
  // Ce n'est pas très orthodoxe ainsi, mais cela donne une chance
  // de récupérer des infos.
  const pageComponent = Component(pageProps);
  // if (props.Component.isMDXComponent) console.log(component);
  return (
    <ThemeProvider theme={theme} components={my_components}>
      <Footer />
      {props.Component.isMDXComponent && (
        <Container sx={{ my: "50pt", variant: "text.heading" }}>
          <h1>{pageComponent.props.meta.title}</h1>
          <h2>{pageComponent.props.meta.subtitle}</h2>
        </Container>
      )}
      <Container>{pageComponent}</Container>
    </ThemeProvider>
  );
}
