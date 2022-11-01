import { BoxProps, LinkProps } from "@chakra-ui/react";

const mainBox : BoxProps | LinkProps = {
  border: "1px solid",
  // borderColor: accentColor,
  position: "relative",
  display: "block",
  h: "100%",
  w: "100%",
  transition: "transform .25s ease-out",
  boxShadow: `.35rem .35rem 0 0 var(--ammar-colors-brand-purple-500)`,
  _hover: {
      textDecoration: "none",
      transform: "scale(1.05, 1.05)",
      boxShadow: "none"
  },
  p: 4,
  my: 4,
  // bg: mainColor,
}

export const styles = {
  mainBox
}