import React from 'react';
import NavBar from '../../NavBar';
import PageContent from '../../PageContent';
import Footer from '../../Footer';
import { Box, Text } from "@chakra-ui/react"

const Logout = () => {
    return (
        <>
            <NavBar active="chess" />
            <PageContent>
                <Box mt="10vh">
                    <Text>You've been logged out!</Text>
                </Box>
            </PageContent>
            <Footer />
        </>
    );
}

export default Logout;
