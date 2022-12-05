import React from "react";
import {
  Flex,
  Icon,
  IconProps,
  Spacer,
  Box,
  Text,
  IconButton,
  useColorMode,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link as ReactLink } from "react-router-dom";
import Logo from "../Logo";
import {
  faHome,
  faPen,
  faUser,
  faChessPawn,
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles/NavBar.styles";

type LogoIconProps = Omit<IconProps, "viewBox">;

const LogoIcon: React.FC<LogoIconProps> = (props) => {
  return (
    <Icon {...props} viewBox="0 0 602 328">
      <Logo
        color1="var(--ammar-colors-brand-purple-500)"
        color2="transparent"
        strokeWidth={8}
      />
    </Icon>
  );
};

interface NavBarProps {
  active: string;
}

const NavBar: React.FC<NavBarProps> = ({ active }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const primary = "brand.purple.500";
  const regular = useColorModeValue("black", "white");

  return (
    <>
      <Box {...styles.topBar}></Box>
      <Flex
        as="header"
        {...styles.main}
        bg={useColorModeValue(
          "rgba(255, 255, 255, 0.8)",
          "rgba(26, 32, 44, 0.8)"
        )}
      >
        <Link as={ReactLink} to="/" _focus={{}}>
          <LogoIcon boxSize={20} />
        </Link>
        <Spacer />
        <Flex align="center">
          <Link
            {...styles.navButton}
            _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
            color={active === "home" ? primary : regular}
            as={ReactLink}
            to="/"
          >
            <FontAwesomeIcon icon={faHome as IconProp} />
            <Text>Home</Text>
          </Link>
          <Link
            {...styles.navButton}
            _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
            as={ReactLink}
            color={active === "about" ? primary : regular}
            to="/about"
          >
            <FontAwesomeIcon icon={faUser as IconProp} />
            <Text>About Me</Text>
          </Link>
          <Link
            {...styles.navButton}
            _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
            as={ReactLink}
            color={active === "blog" ? primary : regular}
            to="/blog"
          >
            <FontAwesomeIcon icon={faPen as IconProp} />
            <Text>Blog</Text>
          </Link>

          {/* <Link
            {...styles.navButton}
            _hover={{ bg: useColorModeValue("gray.50", "gray.700") }}
            as={ReactLink}
            color={active === "chess" ? primary : regular}
            to="/chess"
          >
            <FontAwesomeIcon icon={faChessPawn as IconProp} />
            <Text>Chess</Text>
          </Link> */}

          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            {...styles.colorModeToggle}
            color={useColorModeValue("black", "white")}
            onClick={toggleColorMode}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
