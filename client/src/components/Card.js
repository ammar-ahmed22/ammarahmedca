import React from 'react';
import { Box, useColorModeValue, Link } from "@chakra-ui/react"
import { Link as ReactLink } from 'react-router-dom'

const Card = ({ children, isLink=false, to=undefined }) => {

    const accentColor = useColorModeValue("gray.800", "white");
    const mainColor = useColorModeValue("white", "gray.800");
    const primary = useColorModeValue("primaryLight", "primaryDark");

    const styleProps = {
        mainBox: {
            border: "1px solid",
            borderColor: accentColor,
            position: "relative",
            display: "block",
            h: "100%",
            w: "100%",
            _hover: {
                textDecoration: "none",
                _after: {
                    bg: primary
                },
                bg: accentColor,
                color: mainColor
            },
            p: 4,
            my: 4,
            bg: mainColor,
            _after: {
                position: "absolute",
                top: ".35rem",
                left: ".35rem",
                h: "100%",
                w: "100%",
                bg: accentColor,
                content: "' '",
                display: "block",
                zIndex: -1
            }
        }
    }
    
    if (isLink && to){
        return (
            <Link {...styleProps.mainBox} as={ReactLink} to={to}>
                {
                    children
                }
            </Link>
        )
    }else{
        return (
            <Box {...styleProps.mainBox}>
                {
                    children
                }
            </Box>
        );
    }
    
}

export default Card;
