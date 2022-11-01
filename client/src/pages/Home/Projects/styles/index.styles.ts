import { BoxProps, TextProps } from "@chakra-ui/react";

const mainBox : BoxProps = {
  minH: "100vh"
};

const title : TextProps = {
  fontSize: { base: "5xl", lg: "6xl"},
  fontFamily: "heading",
  as: "h3",
};

export const styles = {
  mainBox,
  title
}