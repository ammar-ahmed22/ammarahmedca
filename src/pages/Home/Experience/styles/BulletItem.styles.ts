import { TextProps, BoxProps } from "@chakra-ui/react";

const line: BoxProps = {
  position: "absolute",
  w: 1,
  h: "100%",
  // bg: useColorModeValue("gray.800", "white"),
  top: "1rem",
  left: 3,
  zIndex: -1,
  transform: "translate(-6px, 0)",
};

const bullet: TextProps = {
  color: "brand.purple.500",
};

export const styles = {
  line,
  bullet,
};
