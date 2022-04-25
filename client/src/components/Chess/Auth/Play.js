import React, { useContext, useEffect } from 'react';
import NavBar from '../../NavBar';
import PageContent from '../../PageContent';
import Footer from '../../Footer';
import { Box, Text } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import SecureContext from '../Context/SecureContext';

const Play = () => {

    // const { state } = useLocation();
    // const { token, tokenAddedAt, setProperty } = useContext(SecureContext);

    // useEffect(() => {
    //     if (state && state.token && !token){
    //         setProperty("token", state.token)
    //         setProperty("tokenAddedAt", new Date().now())
    //     }
    // }, [state])
    
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
