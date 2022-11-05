import { TextProps, ImageProps } from "@chakra-ui/react";


const title : TextProps = {
  fontSize: { base: "5xl", lg: "6xl"},
  as: "h3",
  fontFamily: "heading"
}

const body : TextProps = {
  fontSize: { base: "sm", lg: "md"},
  mb: 4
}

const image : ImageProps = {
  borderRadius: "lg",
  boxShadow: "4px 4px 20px rgba(0, 0, 0, .25)",
  mb: 2
}

const imageCaption : TextProps = {
  fontSize: "sm",
  textAlign: "center",
  color: "gray.500",
  mb: 2
}

export const styles = {
  title,
  body,
  image,
  imageCaption
}