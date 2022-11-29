import { TextProps } from "@chakra-ui/react";

const title: TextProps = {
  fontSize: "5xl",
  fontFamily: "heading",
  fontWeight: "bold",
  variant: "gradient",
  as: "h1",
};

const info: TextProps = {
  fontSize: "md",
  as: "span",
  color: "gray.500",
};

export const styles = {
  title,
  info,
};
