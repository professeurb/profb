/** @jsx jsx */
import { jsx } from "theme-ui";

import React from "react";
import Link from "next/link";
import { Link as ThemeLink } from "theme-ui";
export default function aa(props) {
  return (
    <Link {...props} passHref>
      <ThemeLink
        {...props}
        sx={{
          mr: "10pt",
          variant: "links.nav",
        }}
      />
    </Link>
  );
}
