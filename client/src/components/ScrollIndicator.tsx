import React, { useState, useRef, useEffect } from "react";
import { Flex, Box, Text, useColorMode } from "@chakra-ui/react"
import { styles } from "./ScrollIndicator.styles";
import "../assets/css/ScrollIndicator.css"

interface ScrollIndicatorProps{
    scrollToId: string
}

const ScrollIndicator : React.FC<ScrollIndicatorProps> = ({ scrollToId }) => {

    const [scrollPos, setScrollPos] = useState(-1); 
    const main = useRef<HTMLDivElement>(null);
    const ellipse = useRef<HTMLDivElement>(null);
    const circle = useRef<HTMLDivElement>(null);
    const { colorMode } = useColorMode();

    window.addEventListener("scroll", e => {
        setScrollPos(window.scrollY)
    })

    useEffect(() => {
        if (circle.current && main.current){
            if (scrollPos !== -1 && scrollPos > 0){

                main.current.style.animation = "fade-out 2s ease forwards"
                circle.current.style.animation = "scroll-down 2s ease forwards, fade-out 2s ease forwards"
            }else{
                circle.current.style.animation = "scroll-up 2s ease forwards, fade-in 2s ease forwards"
                main.current.style.animation = "fade-in 2s ease forwards"
            }
        }
    }, [main, scrollPos])

    

    const handleScrollIndOver = () => {
        if (ellipse.current && circle.current){

            const bg = {
                light: "white",
                dark: "#171923"
            }

            ellipse.current.style.background = "var(--ammar-colors-brand-purple-500)";
            circle.current.style.background = bg[colorMode];
        }
    }

    const handleScrollIndOut = () => {
        if (ellipse.current && circle.current){
            ellipse.current.style.background = "transparent";
            circle.current.style.background = "var(--ammar-colors-brand-purple-500)";
        }
    }

    const handleClick = () => {
        const elToScrollTo = document.getElementById(scrollToId);
        const header = document.querySelector("header");
        if (elToScrollTo && header){
            const navBarHeight = header.clientHeight;
            const scrollDist = window.scrollY + elToScrollTo.getBoundingClientRect().top - navBarHeight;

            window.scrollTo({
                top: scrollDist,
                behavior: "smooth"
            })
        }
    }


    return (
        <Flex align="center" position="absolute" bottom={{ base: "25vh", md: "20vh"}} width="100%" direction="column" ref={main}>
            <Box {...styles.ellipse} onMouseOver={handleScrollIndOver} onMouseOut={handleScrollIndOut} onClick={handleClick} ref={ellipse}>
                <Box {...styles.circle} ref={circle} ></Box>
            </Box>
            <Text fontSize="xs" color="brand.purple.500">Scroll</Text>
        </Flex>
    );
}

export default ScrollIndicator;

