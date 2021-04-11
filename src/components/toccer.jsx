import React from "react";
import { Header, Link } from "semantic-ui-react";

export default function Toccer({ headings }) {
  console.log(headings);
  return (
    <>
      <Header>Blabla</Header>
      <ul>
        {headings
          .filter((heading) => heading.depth !== 1)
          .map((heading) => (
            <li key={heading.title}>
              {heading.title}
              {/* <Link to={heading.url}>{heading.title}</Link> */}
            </li>
          ))}
      </ul>
    </>
  );
}
