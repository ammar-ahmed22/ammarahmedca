import { BoxProps, TextProps } from "@chakra-ui/react";

const mainBox: BoxProps = {
  minH: "100vh",
  mt: "10vh",
};

const title: TextProps = {
  as: "h3",
  fontSize: { base: "5xl", lg: "6xl" },
  fontFamily: "heading",
};

const company: TextProps = {
  fontSize: { base: "2xl", lg: "3xl" },
  fontWeight: "bold",
  fontFamily: "heading",
};

const role: TextProps = {
  fontSize: { base: "lg", lg: "xl" },
  fontWeight: "bold",
  variant: "gradient",
};

const timeframe: TextProps = {
  color: "gray.500",
  fontSize: { base: "sm", lg: "md" },
};

const description: TextProps = {
  fontSize: { base: "sm", lg: "md" },
};

export const styles = {
  mainBox,
  title,
  company,
  role,
  timeframe,
  description,
};
