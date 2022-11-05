import { FlexProps, BoxProps, LinkProps, IconButtonProps } from "@chakra-ui/react";


const main : FlexProps = {
  p: 4,
  position: "fixed",
  w: { base: "100%", md: "container.sm", lg: "container.md" },
  top: 0,
  left: "50%",
  transform: "translate(-50%, 0)",
  backdropFilter: "saturate(180%) blur(5px)",
  align: "center",
  justify: "space-between",
  zIndex: 200,
}

const topBar : BoxProps = {
  position: "fixed",
  w: "100%",
  h: "2vh",
  top: 0,
  zIndex: 500,
  bgGradient: "linear(to-r, brand.purple.500, brand.blue.500)"
}

const navButton : LinkProps = {
  colorScheme: "blackAlpha",
  fontWeight: "bold",
  fontFamily: "body",
  fontSize: { base: "sm", lg: 'md'},
  px: 4,
  py: 2,
  borderRadius: "base",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const colorModeToggle : IconButtonProps = {
  size: "sm",
  variant: "ghost",
  colorScheme: "blackAlpha",
  "aria-label": "Color mode toggle"
}

export const styles = {
  main,
  navButton,
  topBar,
  colorModeToggle
}


