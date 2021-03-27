/** @jsx jsx */
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import rangeParser from "parse-numeric-range";
import { jsx, Styled } from "theme-ui";

const getShouldHighlightLine = (hl) => {
  if (hl) {
    const lineNumbers = rangeParser(hl);
    return (index) => lineNumbers.includes(index + 1);
  }
  return () => false;
};

const CodeBlock = ({
  children,
  className: outerClassName,
  title,
  hl,
  ...props
}) => {
  // MDX will pass the language as className
  // className also includes className(s) theme-ui injected
  const [language] = outerClassName.replace(/language-/, ``).split(` `);
  if (typeof children !== `string`) {
    // MDX will pass in the code string as children
    return null;
  }
  const shouldHighlightLine = getShouldHighlightLine(hl);
  return (
    <>
      {title && <div sx={{ variant: `styles.CodeBlock.title` }}>{title}</div>}
      <div sx={{ variant: `styles.CodeBlock` }}>
        <Highlight
          {...defaultProps}
          {...props}
          code={children.trim()}
          language={language}
          theme={undefined}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Styled.pre
              className={`${outerClassName} ${className}`}
              style={style}
            >
              {tokens.map((line, index) => (
                <div
                  key={index}
                  {...getLineProps({ line, key: index })}
                  sx={
                    shouldHighlightLine(index)
                      ? { variant: `styles.CodeBlock.highlightLine` }
                      : undefined
                  }
                >
                  {line.map((token, key) => (
                    <span
                      key={key}
                      {...getTokenProps({ token, key })}
                      // https://github.com/system-ui/theme-ui/pull/721
                      sx={token.empty ? { display: `inline-block` } : undefined}
                    />
                  ))}
                </div>
              ))}
            </Styled.pre>
          )}
        </Highlight>
      </div>
    </>
  );
};

export default CodeBlock;
