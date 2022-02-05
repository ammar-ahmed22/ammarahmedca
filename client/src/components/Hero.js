import React from 'react';
import {  Text, Box, useColorModeValue } from '@chakra-ui/react';
import Signature from './Signature';

const Hero = () => {

    const mainTextStyles = {
        fontSize: "9xl",
        fontWeight: "bold",
        textAlign: "right",
        lineHeight: "none",
        fontFamily: "heading"
    }
    
    return (
        <Box minH="100vh" position="relative">
            <Box marginTop="10vh" zIndex={10} >
                <Text {...mainTextStyles} as="h1">Hello <Text as="span" fontSize="7xl">👋🏽</Text><br />I'm Ammar</Text>
                <Text as="h4" fontSize="2xl" textAlign="right">Engineering student at the University of Waterloo</Text>
            </Box>
            <Signature color={useColorModeValue("black", "white")}/>
        </Box>
    );
}

export default Hero;
