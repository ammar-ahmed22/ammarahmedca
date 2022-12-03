import React from "react";
import { Box, useColorModeValue, Text, Flex, Link } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles/Footer.styles";

const Footer: React.FC = () => {
  return (
    <Flex
      {...styles.main}
      borderTopColor={useColorModeValue("gray.300", "gray.700")}
    >
      <Box {...styles.contentBox}>
        <Text {...styles.text}>
          Get in touch with me and follow my journey!
        </Text>
        <Flex justify="center">
          <Link
            {...styles.iconLink}
            href="https://github.com/ammar-ahmed22"
            isExternal
          >
            <FontAwesomeIcon icon={faGithub as IconProp} />
          </Link>
          <Link
            {...styles.iconLink}
            href="https://www.linkedin.com/in/ammarahmed03/"
            isExternal
          >
            <FontAwesomeIcon icon={faLinkedin as IconProp} />
          </Link>
          <Link
            {...styles.iconLink}
            href="mailto:ammar.ahmed1@uwaterloo.ca"
            isExternal
          >
            <FontAwesomeIcon icon={faEnvelope as IconProp} />
          </Link>
        </Flex>
        <Text {...styles.crText} mt="2">
          Built and Designed by Ammar Ahmed
        </Text>
        <Text {...styles.crText}>All Rights Reserved &copy;</Text>
      </Box>
      <Box {...styles.bottomBar} />
    </Flex>
  );
};

export default Footer;
