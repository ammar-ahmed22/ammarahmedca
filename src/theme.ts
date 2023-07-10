import { extendTheme } from "@chakra-ui/react";

const fonts = {
  body: "Manrope, sans-serif",
  heading: "DM Serif Display, sans-serif",
};

const colors = {
  primaryLight: "#A10010",
  primaryDark: "#9c414a",
  brand: {
    blue: {
      100: "#E1E8FD",
      200: "#C3D1FC",
      300: "#A4B7F8",
      400: "#8BA0F2",
      500: "#667EEA",
      600: "#4A5FC9",
      700: "#3344A8",
      800: "#202D87",
      900: "#131D70",
    },
    purple: {
      100: "#F2DFFA",
      200: "#E2C0F5",
      300: "#C599E3",
      400: "#A276C7",
      500: "#764BA2",
      600: "#5C368B",
      700: "#442574",
      800: "#30175D",
      900: "#210E4D",
    },
  },
};

const styles = {
  global: {
    "html, body": {
      cursor: "auto",
      overflowX: "hidden",
    },
  },
};

const config = {
  initialColorMode: "system",
  useSystemColorMode: true,
  cssVarPrefix: "ammar",
};

const shadows = {
  outline: "0 0 0 3px rgba(118, 75, 162, 0.6)",
};

const components = {
  Text: {
    variants: {
      gradient: {
        bgGradient: "linear(to-tr, brand.purple.500, brand.blue.500)",
        bgClip: "text",
      },
    },
  },
  Link: {
    variants: {
      gradient: {
        bgGradient: "linear(to-r, brand.purple.500, brand.blue.500)",
        bgClip: "text",
      },
    },
  },
  Button: {
    variants: {
      gradient: {
        bgGradient: "linear(to-tr, brand.purple.500, brand.blue.500)",
        color: "white",
        _hover: {
          bgGradient: "linear(to-tr, brand.purple.600, brand.blue.600)",
        },
        _loading: {
          bgGradient: "linear(to-tr, brand.purple.500, brand.blue.500)",
          opacity: 0.5,
          color: "white",
          _hover: {
            bgGradient: "linear(to-tr, brand.purple.600, brand.blue.600)",
          },
        },
      },
    },
  },
  Popover: {
    variants: {
      picker: {
        popper: {
          maxWidth: "unset",
          width: "unset"
        }
      }
    }
  }
};

const theme = extendTheme({
  fonts,
  config,
  colors,
  shadows,
  components,
  styles,
});

export default theme;
