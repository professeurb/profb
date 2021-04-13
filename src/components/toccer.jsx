import React from "react";
// import { Header } from "semantic-ui-react";
import { Link } from "gatsby";

export default function Toccer({ headings }) {
  return (
    <>
      <ul>
        {headings
          .filter((heading) => heading.depth !== 1)
          .map((heading) => (
            <li key={heading.title}>
              <Link to={heading.url}>{heading.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
