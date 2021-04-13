import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
// import rangeParser from "parse-numeric-range";
import theme from "prism-react-renderer/themes/oceanicNext";
import { Segment, Label } from "semantic-ui-react";
import "typeface-fira-mono";
// import { assertAbstractType } from "graphql";

// const getShouldHighlightLine = (hl) => {
//   if (hl) {
//     const lineNumbers = rangeParser(hl);
//     return (index) => lineNumbers.includes(index + 1);
//   }
//   return () => false;
// };

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
  //   const shouldHighlightLine = getShouldHighlightLine(hl);
  return (
    <>
      <Segment
        style={{
          backgroundColor: myTheme.plain.backgroundColor,
        }}
      >
        {title && (
          <Label attached="top" style={{ marginBottom: "10pt" }}>
            {title}
          </Label>
        )}
        <Highlight
          {...defaultProps}
          {...props}
          code={children.trim()}
          language={language}
          theme={myTheme}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${outerClassName} ${className}`}
              style={{
                ...style,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              {tokens.map((line, index) => (
                <div
                  key={index}
                  {...getLineProps({ line, key: index })}
                  //   style={
                  //     shouldHighlightLine(index)
                  //       ? { backgroundColor: "#eee" }
                  //       : {}
                  //   }
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
    </>
  );
};

export default CodeBlock;
