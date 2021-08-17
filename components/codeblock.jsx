import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import rangeParser from "parse-numeric-range";
import theme from "prism-react-renderer/themes/vsDark";
import { Segment, Header } from "semantic-ui-react";
import "typeface-fira-mono";

const getShouldHighlightLine = (hl) => {
  if (hl) {
    const lineNumbers = rangeParser(hl);
    return (index) => lineNumbers.includes(index + 1);
  }
  return () => false;
};

const myTheme = {
  ...theme,
  plain: { ...theme.plain, fontFamily: "Fira Mono" },
};

const CodeBlock = ({
  children,
  className: outerClassName,
  title,
  hl,
  ...props
}) => {
  // MDX will pass the language as className
  outerClassName = (outerClassName && outerClassName) || "";
  const [language] = outerClassName.replace(/language-/, ``).split(` `);
  if (typeof children !== `string`) {
    // MDX will pass in the code string as children
    return null;
  }
  const shouldHighlightLine = getShouldHighlightLine(hl);
  return (
    // <Segment.Group
    //   style={{
    //     backgroundColor: myTheme.plain.backgroundColor,
    //   }}
    // >
    //   {title && (
    //     <>
    //       <Segment
    //         style={
    //           {
    //             // padding: "0 0",
    //             // backgroundColor: myTheme.plain.backgroundColor,
    //           }
    //         }
    //       >
    //         {title}
    //       </Segment>
    //     </>
    //   )}
    <Segment
      style={{
        padding: "0 0",
        backgroundColor: myTheme.plain.backgroundColor,
      }}
    >
      <Highlight
        {...defaultProps}
        {...props}
        code={children.trim()}
        language={language}
        theme={myTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre // Styled.pre
            className={`${outerClassName} ${className}`}
            style={{
              ...style,
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            {tokens.map((line, index) => (
              <div
                key={index}
                {...getLineProps({ line, key: index })}
                style={
                  shouldHighlightLine(index)
                    ? { variant: `styles.CodeBlock.highlightLine` }
                    : undefined
                }
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Segment>
    // </Segment.Group>
  );
};

export default CodeBlock;
