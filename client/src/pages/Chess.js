import React from 'react';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import { Text } from "@chakra-ui/react"

const Chess = () => {
    return (
        <>
            <NavBar active="chess"/>
            <PageContent>
                <Text>Chess game bro</Text>
            </PageContent>
            <Footer />
        </>
    );
}

export default Chess;
