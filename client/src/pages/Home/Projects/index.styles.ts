import { BoxProps, TextProps } from "@chakra-ui/react";
import { chakraStyle } from "../../../utils/style";

const mainBox = chakraStyle<BoxProps>({
  minH: "100vh"
});

const title = chakraStyle<TextProps>({
  fontSize: { base: "5xl", lg: "6xl"},
  fontFamily: "heading",
  as: "h3",
})

export const styles = {
  mainBox,
  title
}