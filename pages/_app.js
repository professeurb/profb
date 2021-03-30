import React from "react";

import "katex/dist/katex.min.css";
import {
  ChakraProvider,
  extendTheme,
  Container,
  Heading,
} from "@chakra-ui/react";
// import theme from "style/theme";
// import Prism from "@theme-ui/prism";
import CodeBlock from "@components/codeblock";

import Footer from "@components/header";

// https://theme-ui.com/theme-spec

const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
});

const components = {
  h1: (props) => <Heading as="h1" {...props} />,
  h2: (props) => <Heading as="h2" {...props} />,
  // pre: (props) => <div {...props} />,
  pre: ({ children }) => {
    return <CodeBlock {...children.props} />;
  },
  // code: Prism,
  // inlineCode: (props) => {
  //   console.log("Code");
  //   console.log(props);
  //   return <Prism {...props} />;
  // },
};

export default function App(props) {
  // console.log(props)
  const { Component, pageProps } = props;
  // if (props.Component.isMDXComponent) console.log(props);
  // Ce n'est pas très orthodoxe ainsi, mais cela donne une chance
  // de récupérer des infos.
  const pageComponent = Component(pageProps);
  // if (props.Component.isMDXComponent) console.log(component);
  return (
    <ChakraProvider theme={theme} components={components}>
      <Footer />
      {props.Component.isMDXComponent && (
        <Container sx={{ my: "50pt", variant: "text.heading" }}>
          <h1>{pageComponent.props.meta.title}</h1>
          <h2>{pageComponent.props.meta.subtitle}</h2>
        </Container>
      )}
      <Container>{pageComponent}</Container>
    </ChakraProvider>
  );
}
