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
            transition: "transform .25s ease-out",
            boxShadow: `.35rem .35rem 0 0 var(--ammar-colors-brand-purple-500)`,
            _hover: {
                textDecoration: "none",
                transform: "scale(1.05, 1.05)",
                boxShadow: "none"
            },
            p: 4,
            my: 4,
            bg: mainColor,
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
