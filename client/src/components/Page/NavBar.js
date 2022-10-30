import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Icon,
  Spacer,
  Box,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link as ReactLink } from "react-router-dom"
import Logo from "../Logo";
import { faHome, faPen, faUser } from "@fortawesome/free-solid-svg-icons";


const LogoIcon = (props) => {
  return (
    <Icon {...props} viewBox="0 0 602 328">
      <Logo color1="var(--ammar-colors-brand-purple-500)" color2="transparent" strokeWidth={8} />
    </Icon>
  );
};

const NavBar = ({ active }) => {
  const { colorMode, toggleColorMode } = useColorMode();


  const styleProps = {
    main: {
      p: 4,
      position: "fixed",
      w: { base: "100%", md: "container.sm", lg: "container.md" },
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
      // bg: useColorModeValue("primaryLight", "primaryDark"),
      bgGradient: "linear(to-r, brand.purple.500, brand.blue.500)"
    },
    navButton: {
      colorScheme: "blackAlpha",
      //variant: "ghost",
      fontWeight: "bold",
      fontFamily: "body",
      fontSize: { base: "sm", lg: 'md'},
      px: 4,
      py: 2,
      borderRadius: "base",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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

  

  const primary = "brand.purple.500";
  const regular = useColorModeValue("black", "white");

  return (
    <>
    <Box {...styleProps.topBar}></Box>
    <Flex as="header" {...styleProps.main}  >
      <Link as={ReactLink} to="/" _focus={{}}>
        <LogoIcon boxSize={20} />
      </Link>
      <Spacer />
      <Flex align="center">

        <Link {...styleProps.navButton} color={ active === "home" ? primary : regular} as={ReactLink} to="/"><FontAwesomeIcon icon={faHome}/><Text>Home</Text></Link>
        <Link {...styleProps.navButton} as={ReactLink} color={ active === "about" ? primary : regular} to="/about" ><FontAwesomeIcon icon={faUser}/><Text>About Me</Text></Link>
        <Link {...styleProps.navButton} as={ReactLink} color={ active === "blog" ? primary : regular} to="/blog" ><FontAwesomeIcon icon={faPen}/><Text>Blog</Text></Link>

        {/* <Link {...styleProps.navButton} as={ReactLink} color={ active === "chess" ? primary : regular} to="/chess" ><FontAwesomeIcon icon="chess-pawn"/><Text>Chess</Text></Link>  */}

        
        {/* <Link {...styleProps.navButton} ><FontAwesomeIcon icon="file-alt"/><Text>Resume</Text></Link> */}

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
