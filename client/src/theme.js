import { extendTheme } from "@chakra-ui/react";

const fonts = {
    body: "Manrope, sans-serif",
    heading: "DM Serif Display, sans-serif",
  }
  
const colors = {
primaryLight: "#A10010",
primaryDark: "#9c414a"
}
  
const config = {
initialColorMode: "system",
useSystemColorMode: true
}
  
const shadows = {
outline: "0 0 0 3px rgba(161, 0, 16, 0.6)",
}
  
const theme = extendTheme({ fonts, config, colors, shadows })


export default theme