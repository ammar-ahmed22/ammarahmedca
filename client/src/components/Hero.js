import React, { useRef, useEffect, useState } from 'react';
import {  Text, Box, useColorModeValue, Link, Button, Flex, useColorMode } from '@chakra-ui/react';
import { ChevronDownIcon, ArrowDownIcon } from "@chakra-ui/icons"
import Signature from './Signature';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        scrollInd: {
            height: "25px",
            width: "15px",
            bg: "transparent",
            border: "2px solid",
            borderColor: useColorModeValue("primaryLight", "primaryDark"),
            borderRadius: "full",
            position: "relative",
            _hover: {
                cursor: "pointer",
                
            }
            // _after: { 
            //     content: "' '", 
            //     position: "absolute", 
            //     top: "1px", 
            //     left: "50%", 
            //     transform: "translate(-50%, 0)", 
            //     bg: "primaryLight", 
            //     height: "5px", 
            //     width: "5px", 
            //     borderRadius: "full"
            // }
        },
        scrollIndCircle: {
            position: "absolute", 
            top: "1px", 
            left: "50%", 
            transform: "translate(-50%, 0)", 
            bg: useColorModeValue("primaryLight", "primaryDark"), 
            height: "5px", 
            width: "5px", 
            borderRadius: "full"
        }
    }

    

    return (
        <Box minH="90vh" position="relative" >
            <Box marginTop={"10vh"} zIndex={10} >
                <Text {...styleProps.mainText} as="h1">Hello <Text as="span" fontSize={{ base: "5xl", lg: "7xl"}}>👋🏽</Text><br />I'm <Text color={useColorModeValue("primaryLight", "primaryDark")} as="span">Ammar</Text></Text>
                <Text {...styleProps.subText}>Engineering student at the <Link href="https://uwaterloo.ca/" {...styleProps.subTextLink}>University of Waterloo</Link></Text>
                <Text {...styleProps.subText}>QA Engineer at <Link href="https://hire.company" {...styleProps.subTextLink}>HIRE Technologies</Link></Text>
            </Box>
            <Signature color={useColorModeValue("black", "white")} />
            {/* <Flex  align="end"  direction="column" >
                <Button variant="ghost" display="flex" flexDirection="column"  ><Text>My <Text as="span" color="primaryLight">Works</Text></Text> <ChevronDownIcon /></Button>
                <Button variant="ghost" display="flex" flexDirection="column"  ><Text>My <Text as="span" color="primaryLight">Experiences</Text></Text> <ChevronDownIcon /></Button>
            </Flex> */}
            <ScrollIndicator scrollToId="projects"/>
        </Box>
    );
}

export default Hero;
