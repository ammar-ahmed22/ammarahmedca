import { BoxProps, TagProps } from "@chakra-ui/react";

const mainBox: BoxProps = {
  border: "1px solid",
  // borderColor: useColorModeValue("gray.800", "white"),
  position: "relative",
  h: "100%",
  // bg: useColorModeValue("white", 'gray.800'),
  p: 4,
  _after: {
    position: "absolute",
    h: "100%",
    w: "100%",
    left: ".5rem",
    top: ".5rem",
    zIndex: -10,
    bgGradient: "linear(to-tr, brand.blue.500, brand.purple.500)",
    content: "' '",
    opacity: 1,
  },
};

const tag: TagProps = {
  size: "sm",
  textTransform: "uppercase",
  mr: 1,
  mb: 1,
  fontWeight: "bold",
};

export const styles = {
  mainBox,
  tag,
};
