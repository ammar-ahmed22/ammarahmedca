import React from 'react';
import { Box, useColorModeValue, Text, Flex, Link } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => {

    const styleProps = {
        main: {
            borderBottom: "solid 2vh",
            borderBottomColor: useColorModeValue("primaryLight", "primaryDark"),
            borderTop: "solid 1px",
            borderTopColor: useColorModeValue("gray.300", "gray.700"),
            w: "100%",
            mt: 5,
            justify: "center"
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
            fontSize: "xl",
            _hover: {
                color: "gray.500"
            }
        },
        text: {
            align: "center",
            fontWeight: "bold"
        }
    }

    return (
        <Flex {...styleProps.main}>
            <Box {...styleProps.contentBox}>
                <Text {...styleProps.text} >Get in touch with me and follow my journey!</Text>
                <Flex justify="center">
                    <Link {...styleProps.iconLink} href="https://github.com/ammar-ahmed22" isExternal>
                        <FontAwesomeIcon icon={["fab", "github"]}/>
                    </Link>
                    <Link {...styleProps.iconLink} href="https://www.linkedin.com/in/ammarahmed03/" isExternal>
                        <FontAwesomeIcon icon={["fab", "linkedin"]}/>
                    </Link>
                    <Link {...styleProps.iconLink} href="mailto:ammar.ahmed1@uwaterloo.ca" isExternal>
                        <FontAwesomeIcon icon={"envelope"}/>
                    </Link>
                </Flex>
                <Text {...styleProps.crText} mt="2" >Built and Designed by Ammar Ahmed</Text>
                <Text {...styleProps.crText} >All Rights Reserved &copy;</Text>
            </Box>
        </Flex>
    );
}

export default Footer;
