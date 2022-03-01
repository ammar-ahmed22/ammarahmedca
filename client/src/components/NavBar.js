import React from "react";
import {
  Flex,
  Icon,
  Spacer,
  Box,
  IconButton,
  useColorMode,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as ReactLink } from "react-router-dom"
import Logo from "./Logo";

const LogoIcon = (props) => {
  return (
    <Icon {...props} viewBox="0 0 602 328">
      <Logo color1={useColorModeValue("#A10010", "#9c414a")} color2="transparent" strokeWidth={8} />
    </Icon>
  );
};

const NavBar = ({ active }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const styleProps = {
    main: {
      p: 4,
      position: "fixed",
      w: "container.md",
      bg: useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(26, 32, 44, 0.8)"),
      top: 0,
      left: "50%",
      transform: "translate(-50%, 0)",
      backdropFilter: "saturate(180%) blur(5px)",
      align: "center",
      justify: "space-between",
      zIndex: 200,
    },
    topBar: {
        position: "fixed",
        w: "100%",
        h: "2vh",
        top: 0,
        zIndex: 500,
        bg: useColorModeValue("primaryLight", "primaryDark")
    },
    navButton: {
      colorScheme: "blackAlpha",
      //variant: "ghost",
      fontWeight: "bold",
      fontFamily: "body",
      fontSize: "md",
      px: 4,
      py: 2,
      borderRadius: "base",
      _hover: {
        bg: useColorModeValue("gray.50", "gray.700"),
      }
    },
    
    iconLink: {
        mr: 2,
        _hover: {
            color: "gray.500"
        }
    },
    colorModeToggle: {
      size: "sm",
      variant: "ghost",
      colorScheme: "blackAlpha",
      color: useColorModeValue("black", "white"),
    },
  };

  const primary = useColorModeValue("primaryLight", "primaryDark");
  const regular = useColorModeValue("black", "white");

  return (
    <>
    <Box {...styleProps.topBar}></Box>
    <Flex as="header" {...styleProps.main}>
      <Box>
        <LogoIcon boxSize={20} />
      </Box>
      <Spacer />
      <Flex align="center">

        <Link {...styleProps.navButton} color={ active === "home" ? primary : regular} as={ReactLink} to="/">Home</Link>
        <Link {...styleProps.navButton} as={ReactLink} color={ active === "about" ? primary : regular} to="/about" >About Me</Link>
        <Link {...styleProps.navButton} as={ReactLink} color={ active === "experience" ? primary : regular} to="/experience" >Experience</Link>
        <Link {...styleProps.navButton} >Resume</Link>

        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          {...styleProps.colorModeToggle}
          onClick={toggleColorMode}
        />

      </Flex>
    </Flex>
    </>
  );
};

export default NavBar;
