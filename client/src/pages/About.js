import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PageContent from '../components/PageContent';
import { Text, Box, Image, useColorModeValue, Flex } from "@chakra-ui/react";
import Wedding from "../assets/images/Wedding.jpg";

const About = () => {

    const styleProps = {
        title: {
            fontSize: { base: "5xl", lg: "6xl"},
            as: "h3",
            fontFamily: "heading"
        },
        body: {
            fontSize: { base: "sm", lg: "md"},
            mb: 4
        },
        image: {
            borderRadius: "lg",
            boxShadow: "4px 4px 20px rgba(0, 0, 0, .25)",
            mb: 2
        },
        imageCaption: {
            fontSize: "sm",
            textAlign: "center",
            color: "gray.600",
            mb: 2
        }
    }

    return (
        <>
            <NavBar active="about" />
            <PageContent>
                <Box marginTop="10vh">
                    <Text {...styleProps.title} ><Text as="span" color={useColorModeValue("primaryLight", "primaryDark")}>Who</Text> Am I?</Text>
                    <Text {...styleProps.body}>I'm a second year student at the University of Waterloo studying Nanotechnology Engineering. 
                        As most others who hear about this field of engineering, you're probably very confused. Nanotechnology engineering is engineering from the bottom-up rather than the traditional top-down approach. 
                        We engineer devices and systems at the nano-scale such as computer processors, medical robotics, drug delivery systems etc.  
                        
                    </Text>
                    <Text {...styleProps.body}>
                        However, since my admission into the University of Waterloo, I have found an 
                        immense interest in software engineering/development. I have found a very particular interest in full-stack web and app development, due to which, my current and previous co-op terms 
                        have been in the web development field. 
                    </Text>

                    <Text {...styleProps.body}>
                        Previously, I worked in a solely front-end role, whereas, in my current co-op placement, I am working in a full-stack role. I've also started working 
                        part-time as a Data Analyst for an online Fragrance company which has really sparked my interest in the field of data science and analysis. I aspire to work in a field where 
                        software and nanotechnology intersect. 
                    </Text>

                    <Text {...styleProps.title}>How Do I <Text as="span" color={useColorModeValue("primaryLight", "primaryDark")}>Spend My Time</Text>?</Text>
                    <Text {...styleProps.body}>
                        While it may sound extremely nerdy, what I love to do most in my free-time is code. As I've never been very talented in traditional forms of art, coding is my way of expressing myself. Whether 
                        that be through creating websites to help me with productivity or creating algorithm simulations, code helps me express my creativity of creating things with logic and mathematics. 
                    </Text>
                    <Text {...styleProps.body}>
                        When I'm not coding you can find me watching Netflix. I tend to enjoy shows that have a good, thrilling storyline such as Breaking Bad, The Ozarks and Narcos. 
                        I also enjoy reality-style comedy shows like The Office, Parks and Recreation and Brooklyn Nine Nine. Aside from movies and TV shows, the rest of my time goes to 
                        spending time with my lovely wife, whom I married at the young age of 20 years old. We like to explore new halal restaurants around the GTA or watch movies together. 
                    </Text>
                    <Flex align="center" direction="column" >
                        <Box  maxW="container.sm">
                            <Image src={Wedding} {...styleProps.image}/>
                        </Box>
                        <Text {...styleProps.imageCaption}>My wife and I on our wedding day</Text>
                        
                    </Flex>
                    
                </Box>
            </PageContent>
            <Footer />
        </>
    );
}

export default About;
