import React, { useContext, useEffect } from 'react';
import NavBar from '../../NavBar';
import PageContent from '../../PageContent';
import Footer from '../../Footer';
import { Box, Text, Button } from "@chakra-ui/react"
import { useLocation } from "react-router-dom"
import SecureContext from '../Context/SecureContext';

const Play = ({ history }) => {

    // const { state } = useLocation();
    const { token, tokenAddedAt, setProperty } = useContext(SecureContext);

    useEffect(() => {
        if (token){
            console.log({ token, tokenAddedAt })
        }else{

        }
    }, [token])

    const handleLogout = e => {
        setProperty("token", null);
        setProperty("tokenAddedAt", null);
        history.push("/chess/logout");
    }
    
    return (
        <>
            <NavBar active="chess"/>
            <PageContent>
                <Box mt="10vh">
                    <Text>LOGGED IN PAGE</Text>
                    <Button onClick={handleLogout}>Logout</Button>
                </Box>
            </PageContent>
            <Footer />
        </>
    );
}

export default Play;
