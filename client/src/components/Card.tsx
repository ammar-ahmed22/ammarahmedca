import React from 'react';
import { Box, BoxProps, useColorModeValue, Link, LinkProps } from "@chakra-ui/react"
import { Link as ReactLink } from 'react-router-dom'
import { styles } from "./Card.styles";

interface CardProps{
    children: React.ReactNode,
    isLink?: boolean,
    to?: string
}

const Card : React.FC<CardProps> = ({ children, isLink=false, to="" }) => {

    const accentColor = useColorModeValue("gray.800", "white");
    const mainColor = useColorModeValue("white", "gray.800");
    
    if (isLink && to){
        return (
            <Link {...styles.mainBox as LinkProps} bg={mainColor} borderColor={accentColor} as={ReactLink} to={to}>
                {
                    children
                }
            </Link>
        )
    }else{
        return (
            <Box {...styles.mainBox as BoxProps } bg={mainColor} borderColor={accentColor} >
                {
                    children
                }
            </Box>
        );
    }
    
}

export default Card;
