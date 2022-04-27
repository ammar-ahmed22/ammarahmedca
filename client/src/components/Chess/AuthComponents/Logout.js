import React from 'react';
import NavBar from '../../NavBar';
import PageContent from '../../PageContent';
import Footer from '../../Footer';
import { Box, Text, Link } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom"

const Logout = () => {
    return (
        <>
            <NavBar active="chess" />
            <PageContent>
                <Box mt="10vh">
                    <Text>You've been logged out!</Text>
                    <Link color="primaryLight" as={ReactLink} to="/chess/login">Log back in?</Link>
                </Box>
            </PageContent>
            <Footer />
        </>
    );
}

export default Logout;
