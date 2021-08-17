import { FaTwitter, FaEnvelope } from "react-icons/fa";
import { Menu, Container, Icon } from "semantic-ui-react";
import HeaderLink from "@components/headerlink";

export default function Header(props) {
  return (
    <Menu borderless size="large">
      <Container>
        <Menu.Item as="a" header href="/">
          ProfB
        </Menu.Item>
        <Menu.Item as="a" href="/articles/">
          Articles
        </Menu.Item>
        <Menu.Item as="a" href="/cours/option_sup">
          OptionSup
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item href="mailto:professeurb at free.fr">
            <Icon name="mail" />
          </Menu.Item>
          <Menu.Item href="https://twitter.com/professeur_b/">
            <Icon name="twitter" />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
