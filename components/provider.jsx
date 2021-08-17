import "katex/dist/katex.min.css";
import "semantic-ui-css/semantic.min.css";

import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "@components/codeblock";
import { Header } from "semantic-ui-react";

const components = {
  h1: (props) => <Header as="h1" {...props} />,
  h2: (props) => <Header as="h2" {...props} />,
  h3: (props) => <Header as="h3" {...props} />,
  pre: ({ children }) => {
    return <CodeBlock {...children.props} />;
  },
};

export default function Provider(props) {
  return <MDXProvider components={components} {...props} />;
}
