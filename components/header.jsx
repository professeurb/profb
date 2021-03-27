/** @jsx jsx */

import { jsx } from "theme-ui";
import React from "react";
import { FaTwitter, FaEnvelope } from "react-icons/fa";
import { Flex, Container } from "theme-ui";
// import Link from "next/link";
import HeaderLink from "@components/headerlink";

export default function Header(props) {
  return (
    <Container className="header">
      <Flex sx={{ my: "10pt" }}>
        <HeaderLink href="/">ProfB</HeaderLink>
        <HeaderLink href="/articles/">Articles</HeaderLink>
        <HeaderLink href="/cours/option_sup">OptionSup</HeaderLink>
        <HeaderLink href="/cours/option_spe">OptionSpé</HeaderLink>
        <div sx={{ mx: "auto" }} />
        <HeaderLink href="mailto:professeurb at free.fr">
          <FaEnvelope />
        </HeaderLink>
        <HeaderLink href="https://twitter.com/professeur_b/" sx={{ mr: 0 }}>
          <FaTwitter />
        </HeaderLink>
      </Flex>
    </Container>
  );
}
