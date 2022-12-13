import {
  TextProps,
  ImageProps,
  ListProps,
  BoxProps,
  FlexProps,
  Spinner,
} from "@chakra-ui/react";

const heading_1: TextProps = {
  fontSize: "4xl",
  fontFamily: "heading",
  fontWeight: "bold",
  as: "h2",
  mb: 2,
};

const heading_2: TextProps = {
  fontSize: "3xl",
  fontFamily: "heading",
  fontWeight: "bold",
  as: "h3",
  mb: 2,
};

const heading_3: TextProps = {
  fontSize: "2xl",
  fontFamily: "heading",
  fontWeight: "bold",
  as: "h4",
  mb: 2,
};

const p: TextProps = {
  fontSize: { base: "md", md: "lg" },
  mb: 4,
  as: "p",
};

const list: ListProps = {
  fontSize: { base: "md", md: "lg" },
  mb: 4,
  pl: 2,
};

const imageBox: FlexProps = {
  align: "center",
  justify: "center",
  direction: "column",
  my: 5,
};

const image: ImageProps = {
  objectFit: "cover",
  borderRadius: "md",
  boxShadow: "lg",
  mb: 2,
  _hover: {
    cursor: "pointer",
  },
  fallback: (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="brand.purple.500"
      size="xl"
    />
  ),
};

const imageCaption: TextProps = {
  fontSize: "sm",
  color: "gray.500",
  textAlign: "center",
};

const codeBlock: BoxProps = {
  // bg: useColorModeValue("gray.200", "gray.900"),
  p: 1,
  mb: 2,
  borderRadius: "md",
};

export const styles = {
  heading_1,
  heading_2,
  heading_3,
  p,
  list,
  image,
  imageBox,
  imageCaption,
  codeBlock,
};
