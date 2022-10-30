import React from 'react';
import {  Text, Box, useColorModeValue, Link } from '@chakra-ui/react';
import Signature from '../../components/Signature';
import ScrollIndicator from '../../components/ScrollIndicator';
import { styles } from './Hero.styles';


const Hero : React.FC = () => {
       
    return (
        <Box minH="90vh" position="relative" >
            <Box marginTop={"10vh"} zIndex={10} >
                <Text sx={styles.mainText} as="h1">Hello <Text as="span" fontSize={{ base: "5xl", lg: "7xl"}}>👋🏽</Text><br />I'm <Text variant="gradient" as="span" >Ammar</Text></Text>
                <Text sx={styles.subText} >Engineering student <Text as="span" fontWeight="bold">@</Text> <Link href="https://uwaterloo.ca/" {...styles.subTextLink}>University of Waterloo</Link></Text>
                <Text sx={styles.subText} >Frontend Developer <Text as="span" fontWeight="bold">@</Text> <Link href="https://docs.aiarena.io/" {...styles.subTextLink}>AI Arena</Link></Text>
            </Box>
            <Signature color={useColorModeValue("black", "white")} />
            
            <ScrollIndicator scrollToId="projects"/>
        </Box>
    );
}

export default Hero;
