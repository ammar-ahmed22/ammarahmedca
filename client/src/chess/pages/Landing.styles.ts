import { TextProps } from "@chakra-ui/react";

const title: TextProps = {
  fontSize: { base: "5xl", lg: "6xl" },
  as: "h1",
  fontFamily: "heading",
};

const subtitle: TextProps = {
  fontSize: { base: "3xl", lg: "4xl" },
  as: "h2",
  fontFamily: "heading",
};

const body: TextProps = {
  fontSize: { base: "sm", lg: "md" },
  mb: 4,
};

export const styles = {
  title,
  subtitle,
  body,
};
