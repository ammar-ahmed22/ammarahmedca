import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import Board from '../components/Chess/Board';
import { Text, Box, Flex } from "@chakra-ui/react"

const Chess = () => {

    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

    return (
        <>
            <NavBar active="chess"/>
            <PageContent>
                <Flex justify="center" align="center" mt="10vh">
                    <Board size={400} fen={fen} setFen={setFen}/>
                </Flex>
            </PageContent>
            <Footer />
        </>
    );
}

export default Chess;
