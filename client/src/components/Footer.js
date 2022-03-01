import React from 'react';
import { Box, useColorModeValue } from "@chakra-ui/react"

const Footer = () => {

    const styleProps = {
        bottomBar: {
            position: "fixed",
            w: "100%",
            h: "2vh",
            bottom: 0,
            zIndex: 500,
            bg: useColorModeValue("primaryLight", "primaryDark")
        }
    }

    return (
        <>
            <Box></Box>
        </>
    );
}

export default Footer;
