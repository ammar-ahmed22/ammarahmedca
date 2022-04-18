import React from 'react';
import {  Text, Box, useColorModeValue, Link, Button, Flex, useMediaQuery } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons"
import Signature from './Signature';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        }
    }

    return (
        <Box minH="100vh" position="relative" >
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
            <Flex justify="center" position="absolute" bottom={{ base: "30vh", lg: "25vh"}} width="100%">
                <Button variant="ghost" display="flex" flexDirection="column" color="primaryLight" colorScheme="red" ><Text>Scroll</Text> <ChevronDownIcon /></Button>
            </Flex>
        </Box>
    );
}

export default Hero;
