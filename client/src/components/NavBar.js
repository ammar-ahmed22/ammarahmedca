import React from "react";
import {
  Flex,
  Icon,
  Spacer,
  Box,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Link
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Logo from "./Logo";
import Resume from "../assets/documents/Ammar_Resume_Sep_2021.pdf"

const LogoIcon = (props) => {
  return (
    <Icon {...props} viewBox="0 0 50 50">
      <Logo
        bg={useColorModeValue("black", "white")}
        stroke={useColorModeValue("white", "black")}
        strokeWidth="0.5"
      />
    </Icon>
  );
};

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const styleProps = {
    main: {
      p: 4,
      borderRadius: "0 0 1rem 1rem",
      position: "fixed",
      w: "100%",
      bg: useColorModeValue("white", "gray.900"),
      top: 0,
      boxShadow: useColorModeValue(
        "4px 4px 30px rgba(0, 0, 0, 0.25)",
        "4px 4px 30px rgba(0, 0, 0, 0.25)"
      ),
      align: "center",
      justify: "space-between",
      zIndex: 200,
    },
    navButton: {
      colorScheme: "blackAlpha",
      color: useColorModeValue("black", "white"),
      variant: "ghost",
      fontWeight: "light",
      fontFamily: "heading",
      fontSize: "xl",
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

  return (
    <Flex as="header" {...styleProps.main}>
      <Box>
        <LogoIcon boxSize={10} />
      </Box>
      <Spacer />
      <Flex align="center">
        <Button {...styleProps.navButton}>About</Button>
        <Button {...styleProps.navButton}>Projects</Button>
        <Button {...styleProps.navButton}>Experience</Button>
      </Flex>
      <Spacer />
      <Flex align="center">
        <Link href="https://github.com/ammar-ahmed22" isExternal {...styleProps.iconLink}>
            <FontAwesomeIcon icon={['fab', "github"]}/>
        </Link>
        <Link href="https://www.linkedin.com/in/ammarahmed03/" isExternal {...styleProps.iconLink}>
            <FontAwesomeIcon icon={['fab', "linkedin"]}/>
        </Link>
        <Link href={Resume} {...styleProps.iconLink} isExternal >
            <FontAwesomeIcon icon="file-download"/>
        </Link>
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          {...styleProps.colorModeToggle}
          onClick={toggleColorMode}
        />
      </Flex>
    </Flex>
  );
};

export default NavBar;
