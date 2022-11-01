import type { TextProps, LinkProps } from "@chakra-ui/react";


const mainText : TextProps = {
  fontSize: { base: "6xl", md: "8xl" },
  fontWeight: "bold",
  textAlign: "right",
  lineHeight: "none",
  fontFamily: "heading",
  position: "relative",
  mb: 1
}

const subText : TextProps = {
  as: "h4",
  fontSize: {base: "xl", lg: '2xl'},
  textAlign: "right",
}

const subTextLink : LinkProps = {
  fontWeight: "bold",
  variant: "gradient",
  isExternal: true,
  _hover: {
      borderColor: "brand.purple.500",
      borderBottomWidth: "1px",
      borderBottomStyle: "solid"
  }
}

export const styles = {
  mainText,
  subText,
  subTextLink
}