import React from 'react';
import { Box, useColorModeValue, Text, Flex, Link } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {

    const styleProps = {
        main: {
            borderTop: "solid 1px",
            borderTopColor: useColorModeValue("gray.300", "gray.700"),
            w: "100%",
            mt: 5,
            align: "center",
            direction: "column"
        },
        bottomBar: {
            w: "100%",
            h: "2vh",
            bgGradient: "linear(to-r, brand.purple.500, brand.blue.500)"
        },
        contentBox: {
            w: "container.md",
            p: 4
        },
        crText: {
            fontSize: "sm",
            align: "center",
            fontWeight: "thin"
        },
        iconLink: {
            p: 2,
            borderRadius: "md",
            fontSize: { base: "lg", lg: 'xl'},
            _hover: {
                color: "gray.500"
            }
        },
        text: {
            align: "center",
            fontWeight: "bold",
            fontSize: { base: "sm", lg: "md"}
        }
    }

    return (
        <Flex {...styleProps.main}>
            <Box {...styleProps.contentBox}>
                <Text {...styleProps.text} >Get in touch with me and follow my journey!</Text>
                <Flex justify="center">
                    <Link {...styleProps.iconLink} href="https://github.com/ammar-ahmed22" isExternal>
                        <FontAwesomeIcon icon={faGithub}/>
                    </Link>
                    <Link {...styleProps.iconLink} href="https://www.linkedin.com/in/ammarahmed03/" isExternal>
                        <FontAwesomeIcon icon={faLinkedin}/>
                    </Link>
                    <Link {...styleProps.iconLink} href="mailto:ammar.ahmed1@uwaterloo.ca" isExternal>
                        <FontAwesomeIcon icon={faEnvelope}/>
                    </Link>
                </Flex>
                <Text {...styleProps.crText} mt="2" >Built and Designed by Ammar Ahmed</Text>
                <Text {...styleProps.crText} >All Rights Reserved &copy;</Text>
            </Box>
            <Box {...styleProps.bottomBar} />
        </Flex>
    );
}

export default Footer;
