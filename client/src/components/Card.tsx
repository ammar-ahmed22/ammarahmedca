import React from 'react';
import { Box, BoxProps, useColorModeValue, Link, LinkProps, LayoutProps } from "@chakra-ui/react"
import { Link as ReactLink } from 'react-router-dom'
import { styles } from "./Card.styles";

interface CardProps{
    children: React.ReactNode,
    h?: LayoutProps["h"],
    w?: LayoutProps["w"],
    isLink?: boolean,
    to?: string
}

const Card : React.FC<CardProps> = ({ children, isLink=false, to="", w="100%", h="100%" }) => {

    const accentColor = useColorModeValue("gray.800", "white");
    const mainColor = useColorModeValue("white", "gray.800");
    
    if (isLink && to){
        return (
            <Link {...styles.mainBox as LinkProps} {...styles.isLink} bg={mainColor} borderColor={accentColor} w={w} h={h} as={ReactLink} to={to}>
                {
                    children
                }
            </Link>
        )
    }else{
        return (
            <Box {...styles.mainBox as BoxProps } bg={mainColor} borderColor={accentColor} w={w} h={h} >
                {
                    children
                }
            </Box>
        );
    }
    
}

export default Card;
