import React from 'react';
import NavBar from '../../NavBar';
import PageContent from '../../PageContent';
import Footer from '../../Footer';
import { Box, Text } from "@chakra-ui/react"

const Play = () => {
    return (
        <>
            <NavBar active="chess"/>
            <PageContent>
                <Box mt="10vh">
                    <Text>LOGGED IN PAGE</Text>
                </Box>
            </PageContent>
            <Footer />
        </>
    );
}

export default Play;
