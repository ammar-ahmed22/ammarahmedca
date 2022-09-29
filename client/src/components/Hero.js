import React from 'react';
import {  Text, Box, useColorModeValue, Link,} from '@chakra-ui/react';
import Signature from './Signature';
import ScrollIndicator from './ScrollIndicator';
import "../assets/css/ScrollIndicator.css"

const Hero = () => {
    
    const styleProps = {
        mainText: {
            fontSize: {base: "6xl", lg: "8xl"},
            fontWeight: "bold",
            textAlign: "right",
            lineHeight: "none",
            fontFamily: "heading",
        },
        subText: {
            as: "h4",
            fontSize: {base: "xl", lg: '2xl'},
            textAlign: "right",
        },
        subTextLink: {
            fontWeight: "bold",
            isExternal: true,
            color: useColorModeValue("primaryLight", "primaryDark")
        },
    }

    

    return (
        <Box minH="90vh" position="relative" >
            <Box marginTop={"10vh"} zIndex={10} >
                <Text {...styleProps.mainText} as="h1">Hello <Text as="span" fontSize={{ base: "5xl", lg: "7xl"}}>👋🏽</Text><br />I'm <Text color={useColorModeValue("primaryLight", "primaryDark")} as="span">Ammar</Text></Text>
                <Text {...styleProps.subText}>Engineering student <Text as="span" fontWeight="bold">@</Text> <Link href="https://uwaterloo.ca/" {...styleProps.subTextLink}>University of Waterloo</Link></Text>
                <Text {...styleProps.subText}>Frontend Developer <Text as="span" fontWeight="bold">@</Text> <Link href="https://docs.aiarena.io/" {...styleProps.subTextLink}>AI Arena</Link></Text>
            </Box>
            <Signature color={useColorModeValue("black", "white")} />
            
            <ScrollIndicator scrollToId="projects"/>
        </Box>
    );
}

export default Hero;
