import { FaTwitter, FaEnvelope } from "react-icons/fa";
import { Flex, Container, Box } from "@chakra-ui/react";
import HeaderLink from "@components/headerlink";

export default function Header(props) {
  return (
    <Container className="header">
      <Flex sx={{ my: "10pt" }}>
        <HeaderLink mr="10pt" href="/">
          ProfB
        </HeaderLink>
        <HeaderLink mr="10pt" href="/articles/">
          Articles
        </HeaderLink>
        <HeaderLink mr="10pt" href="/cours/option_sup">
          OptionSup
        </HeaderLink>
        <HeaderLink mr="10pt" href="/cours/option_spe">
          OptionSpé
        </HeaderLink>
        <Box mx="auto" />
        <HeaderLink href="mailto:professeurb at free.fr" mr="10pt">
          <FaEnvelope />
        </HeaderLink>
        <HeaderLink href="https://twitter.com/professeur_b/" sx={{ mr: 0 }}>
          <FaTwitter />
        </HeaderLink>
      </Flex>
    </Container>
  );
}
