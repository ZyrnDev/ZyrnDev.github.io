/* eslint-disable max-lines-per-function */
import { extendTheme } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools';
import components from "./components";
import palette from "./palette";
import defaultCSS from "@styles/theme/default";

const colors = {
  light: palette.light,
  dark: palette.dark,
  custom: palette.custom,
};

const styles = {
  //This is mean to change the core colours of the theme (but the default theme is already good!?!?!)
  global: (props: any) => ({
    "body": {
      backgroundColor: mode("gray.50", "gray.900")(props),
    },
    "article #blog-article": {
      "a": {
        color: mode(palette.light.cyan, palette.dark.cyan)(props),
        textDecoration: "underline",
      },
      ...defaultCSS
    },
  }),
};

const fonts = {
  heading: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  body: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
  cssVarPrefix: "theme",
};

const theme = extendTheme({ config, colors, components, fonts, styles });

export default theme;