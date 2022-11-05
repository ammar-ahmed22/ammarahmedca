import React from 'react';
import NavBar from '../../Page/NavBar';
import PageContent from '../../Page/PageContent';
import Footer from '../../Page/Footer';
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
