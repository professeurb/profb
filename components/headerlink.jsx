// import { jsx } from "theme-ui";

import Link from "next/link";
import { Link as ThemeLink } from "@chakra-ui/react";
export default function aa(props) {
  return (
    <Link {...props} passHref>
      <ThemeLink
        {...props}
        // sx={{
        //   mr: "10pt",
        //   variant: "links.nav",
        // }}
      />
    </Link>
  );
}
