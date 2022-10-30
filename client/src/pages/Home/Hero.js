import React, { useState, useEffect } from 'react';
import {  Text, Box, useColorModeValue, Link, keyframes } from '@chakra-ui/react';
import Signature from '../../components/Signature';
import ScrollIndicator from '../../components/ScrollIndicator';


const Hero = () => {
       
    

    const styleProps = {
        mainText: {
            fontSize: {base: "6xl", lg: "8xl"},
            fontWeight: "bold",
            textAlign: "right",
            lineHeight: "none",
            fontFamily: "heading",
            position: "relative",
            mb: 1,
        },
        subText: {
            as: "h4",
            fontSize: {base: "xl", lg: '2xl'},
            textAlign: "right",
        },
        subTextLink: {
            fontWeight: "bold",
            isExternal: true,
            variant: "gradient",
            isExternal: true,
            _hover: {
                borderColor: "brand.purple.500",
                borderBottomWidth: "1px",
                borderBottomStyle: "solid"
            }
        },
        typeText: {
            variant: "gradient",
            as: "span",
        },
    }

    

    return (
        <Box minH="90vh" position="relative" >
            <Box marginTop={"10vh"} zIndex={10} >
                <Text sx={styleProps.mainText} as="h1">Hello <Text as="span" fontSize={{ base: "5xl", lg: "7xl"}}>👋🏽</Text><br />I'm <Text {...styleProps.typeText}>Ammar</Text></Text>
                <Text sx={styleProps.subText} >Engineering student <Text as="span" fontWeight="bold">@</Text> <Link href="https://uwaterloo.ca/" {...styleProps.subTextLink}>University of Waterloo</Link></Text>
                <Text sx={styleProps.subText} >Frontend Developer <Text as="span" fontWeight="bold">@</Text> <Link href="https://docs.aiarena.io/" {...styleProps.subTextLink}>AI Arena</Link></Text>
            </Box>
            <Signature color={useColorModeValue("black", "white")} />
            
            <ScrollIndicator scrollToId="projects"/>
        </Box>
    );
}

export default Hero;
