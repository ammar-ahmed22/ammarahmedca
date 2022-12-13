import { FlexProps, BoxProps, TextProps, LinkProps } from "@chakra-ui/react";

const main: FlexProps = {
  borderTop: "solid 1px",
  w: "100%",
  mt: 5,
  align: "center",
  direction: "column",
};

const bottomBar: BoxProps = {
  w: "100%",
  h: "2vh",
  bgGradient: "linear(to-r, brand.purple.500, brand.blue.500)",
};

const contentBox: BoxProps = {
  w: "container.md",
  p: 4,
};

const crText: TextProps = {
  fontSize: "sm",
  align: "center",
  fontWeight: "thin",
};

const iconLink: LinkProps = {
  p: 2,
  borderRadius: "md",
  fontSize: { base: "lg", lg: "xl" },
  _hover: {
    color: "gray.500",
  },
};

const text: TextProps = {
  align: "center",
  fontWeight: "bold",
  fontSize: { base: "sm", lg: "md" },
};

export const styles = {
  main,
  bottomBar,
  contentBox,
  crText,
  iconLink,
  text,
};
