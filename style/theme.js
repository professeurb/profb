import {
  funk,
  swiss,
  roboto,
  tosh,
  dark,
  deep,
  system,
} from "@theme-ui/presets";
// import vsdark from "@theme-ui/prism/presets/vs-dark.json";
import night_owl from "@theme-ui/prism/presets/night-owl.json";
import night_owl_light from "@theme-ui/prism/presets/night-owl-light.json";
// import prism from "@theme-ui/prism/presets/prism.json";

const basicStyle = system;

export default {
  ...basicStyle,
  colors: {
    ...basicStyle.colors,
    text: "#000",
    background: "#fff",
    primary: "#07c",
    secondary: "#05a",
    accent: "#609",
    muted: "#fff",
  },

  // Les inlinecode ont une couleur secondary sur fond muted

  // colors: {
  //   // infinite
  //   text: "#24292e",
  //   background: "#fff",
  //   primary: "#000",
  //   secondary: "#2f363d",
  //   accent: "#0366d6",
  //   muted: "#d1d5da",
  //   paper: "#fffbdd",
  //   tertiary: "#91a3ac",
  //   highlight: "#c8e1ff",
  // },
  fonts: {
    ...basicStyle.fonts,
    //     body:
    //       'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    //     heading: '"Avenir Next", sans-serif',
    monospace: "Fira Code, Menlo, monospace",
  },
  styles: {
    ...basicStyle.styles,
    code: { ...night_owl_light },
    CodeBlock: {
      ...night_owl_light,
      overflow: `auto`,
      pre: {
        backgroundColor: `transparent`,
        float: `left`,
        minWidth: `100%`,
      },
      highlightLine: {
        backgroundColor: `#f0f0f0`,
        borderLeftColor: `#49d0c5`,
        borderLeftStyle: `solid`,
        borderLeftWidth: `0.25em`,
        display: `block`,
        marginRight: `-1em`,
        marginLeft: `-1em`,
        paddingRight: `1em`,
        paddingLeft: `0.75em`,
      },
      title: {
        fontFamily: `monospace`,
        // backgroundColor: night_owl_light.backgroundColor,
        borderBottomWidth: `2px`,
        borderBottomStyle: `solid`,
        borderBottomColor: `#f0f0f0`,
        // color: night_owl_light.color,
      },
    },
    pre: {
      ...basicStyle.styles.pre,
      padding: 16,
      margin: [16, 0],
      border: 2,
      borderRadius: 5,
    },
    h1: {
      fontSize: 32,
      fontFamily: "heading",
      fontWeight: "heading",
      color: "primary",
      mt: 4,
      mb: 2,
    },
  },
  links: {
    bold: {
      fontWeight: "bold",
    },
    nav: {
      fontWeight: "bold",
      color: "inherit",
      textDecoration: "none",
    },
  },
  buttons: {
    primary: {
      // border: 1,
      // borderColor: "highlight",
      // borderStyle: "solid",
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "secondary",
        // color: "highlight",
      },
      "&:disabled": {
        opacity: 0.33,
      },
      "&:disabled&:hover": { bg: "primary" },
    },
  },
  sizes: {
    ...basicStyle.sizes,
    container: 768,
  },
  text: {
    heading: {
      h1: {
        fontWeight: 800,
        fontSize: 64,
        lineHeight: 1.0,
      },
    },
  },
};
