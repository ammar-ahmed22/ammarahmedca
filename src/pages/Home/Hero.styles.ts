import type { TextProps, LinkProps } from "@chakra-ui/react";

const mainText: TextProps = {
  fontSize: { base: "5xl", md: "7xl" },
  fontWeight: "bold",
  textAlign: "right",
  lineHeight: "none",
  fontFamily: "heading",
  position: "relative",
  mb: 1,
};

const mainCaptionText: TextProps = {
  fontSize: { base: "4xl", md: "6xl" },
  fontWeight: "bold",
  fontFamily: "heading",
  lineHeight: "none",
  textAlign: "right",
}

const subText: TextProps = {
  as: "h4",
  fontSize: { base: "xl", lg: "2xl" },
  textAlign: "right",
};

const subTextLink: LinkProps = {
  fontWeight: "bold",
  variant: "gradient",
  isExternal: true,
  _hover: {
    borderColor: "brand.purple.500",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
  },
};

export const styles = {
  mainText,
  subText,
  subTextLink,
  mainCaptionText
};
