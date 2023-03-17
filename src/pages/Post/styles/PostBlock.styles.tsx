import {
  TextProps,
  ImageProps,
  ListProps,
  BoxProps,
  FlexProps,
  Spinner,
  useColorModeValue
} from "@chakra-ui/react";
import {
  atelierCaveDark,
  atelierCaveLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

type PostBlockHook = {
  heading_1: TextProps,
  heading_2: TextProps,
  heading_3: TextProps,
  paragraph: TextProps,
  list: ListProps,
  numbered_list: ListProps,
  bulleted_list: ListProps,
  image: ImageProps,
  imageBox: FlexProps,
  imageCaption: TextProps,
  quote: TextProps,
  equation: {},
  code: {
    box: BoxProps,
    highlighter: any
  },
}

export const usePostBlockStyles = () : [PostBlockHook] => {
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
  
  const paragraph: TextProps = {
    fontSize: { base: "md", md: "lg" },
    mb: 2,
    as: "p",
  };
  
  const list: ListProps = {
    fontSize: { base: "md", md: "lg" },
    mb: 4,
    pl: 4,
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
    bg: useColorModeValue("gray.200", "gray.900"),
    p: 1,
    mb: 2,
    borderRadius: "md",
  };
  
  const quote: TextProps = {
    as: "blockquote",
    display: "block",
    pos: "relative",
    width: "90%",
    my: 4,
    mx: "auto",
    px: 14,
    py: 3,
    fontSize: "xl",
    background: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
    boxShadow: useColorModeValue("lg", "dark-lg"),
    borderColor: "gray.600",
    borderWidth: "thin",
    borderStyle: "solid",
    _before: {
      content: '"\u201c"',
      position: "absolute",
      top: "calc(-2rem + 4px)",
      left: "4px",
      fontSize: "8xl",
      fontFamily: "heading",
    },
  }


  const styles = {
    heading_1,
    heading_2,
    heading_3,
    paragraph,
    list,
    numbered_list: list,
    bulleted_list: list,
    image,
    imageBox,
    imageCaption,
    quote,
    equation: {},
    code: {
      box: codeBlock,
      highlighter: {
        showLineNumbers: true,
        style: useColorModeValue(atelierCaveLight, atelierCaveDark),
        customStyle: { background: "transparent" }
      }
    }
  };

  return [styles];

}




