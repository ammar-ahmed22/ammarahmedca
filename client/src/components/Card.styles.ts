import { BoxProps, LinkProps } from "@chakra-ui/react";

const mainBox: BoxProps | LinkProps = {
  borderWidth: "1px",
  // flex: 1,
  position: "relative",
  display: "block",
  transition: "transform .25s ease-out",
  boxShadow: `.35rem .35rem 0 0 var(--ammar-colors-brand-purple-500)`,
  p: 4,
  my: 4,
};

const isLink: LinkProps = {
  _hover: {
    textDecoration: "none",
    transform: "scale(1.05, 1.05)",
    boxShadow: "none",
  },
};

export const styles = {
  mainBox,
  isLink,
};
