import React, { useState, useRef, useEffect } from "react";
import { Flex, Box, Text, useColorModeValue, useColorMode } from "@chakra-ui/react"
import "../assets/css/ScrollIndicator.css"


const ScrollIndicator = ({ scrollToId }) => {

    const styleProps = {
        scrollIndEllipse: {
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

    const [scrollPos, setScrollPos] = useState(-1); 
    const scrollInd = useRef();
    const scrollIndEllipse = useRef();
    const scrollIndCircle = useRef();
    const { colorMode } = useColorMode();

    window.addEventListener("scroll", e => {
        setScrollPos(window.scrollY)
    })

    useEffect(() => {
        if (scrollIndCircle && scrollInd){
            if (scrollPos !== -1 && scrollPos > 0){

                scrollInd.current.style.animation = "fade-out 2s ease forwards"
                scrollIndCircle.current.style.animation = "scroll-down 2s ease forwards, fade-out 2s ease forwards"
            }else{
                scrollIndCircle.current.style.animation = "scroll-up 2s ease forwards, fade-in 2s ease forwards"
                scrollInd.current.style.animation = "fade-in 2s ease forwards"
            }
        }
    }, [scrollInd, scrollPos])

    

    const handleScrollIndOver = e => {
        if (scrollIndEllipse && scrollIndCircle){
            const primary = {
                light: "#A10010",
                dark: "#9c414a"
            }

            const bg = {
                light: "white",
                dark: "#171923"
            }

            console.log(colorMode)
            scrollIndEllipse.current.style.background = primary[colorMode];
            scrollIndCircle.current.style.background = bg[colorMode];
        }
    }

    const handleScrollIndOut = e => {
        if (scrollIndEllipse && scrollIndCircle){
            const primary = {
                light: "#A10010",
                dark: "#9c414a"
            }

            

            console.log(colorMode)
            scrollIndEllipse.current.style.background = "transparent";
            scrollIndCircle.current.style.background = primary[colorMode];
        }
    }

    const handleClick = e => {
        const elToScrollTo = document.getElementById(scrollToId);
        const navBarHeight = document.querySelector("header").clientHeight;
        const scrollDist = window.scrollY + elToScrollTo.getBoundingClientRect().top - navBarHeight;

        window.scrollTo({
            top: scrollDist,
            behavior: "smooth"
        })
    }


    return (
        <Flex align="center" position="absolute" bottom={{ base: "25vh", md: "15vh"}} width="100%" direction="column" ref={scrollInd}>
            <Box {...styleProps.scrollIndEllipse} onMouseOver={handleScrollIndOver} onMouseOut={handleScrollIndOut} onClick={handleClick} ref={scrollIndEllipse}>
                <Box {...styleProps.scrollIndCircle} ref={scrollIndCircle} ></Box>
            </Box>
            <Text fontSize="xs" color={useColorModeValue("primaryLight", "primaryDark")}>Scroll</Text>
        </Flex>
    );
}

export default ScrollIndicator;

