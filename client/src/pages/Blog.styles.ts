import { TextProps } from "@chakra-ui/react";

const title  : TextProps = {
    fontSize: "6xl",
    fontFamily: "heading",
    as: "h1"
}
const titleSpan : TextProps = {
    as: "span",
    variant: "gradient"
}

const category : TextProps = {
    as: "h3",
    fontSize: "3xl",
    fontFamily: "heading",
}

const info : TextProps = {
    fontSize: "lg"
}

const postTitle : TextProps = {
    fontSize: "2xl",
    fontFamily: "heading",
    fontWeight: "semibold"
}

const postDescription : TextProps = {
    my: 0,
    fontSize: "sm"
}

const postInfo : TextProps = {
    fontSize: "sm",
    fontWeight: "light",
    color: "gray.500"
}

export const styles = {
  title,
  titleSpan,
  category,
  info,
  postTitle,
  postDescription,
  postInfo
}
