import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import Board from '../components/Chess/Board';
import { Text, Box, Flex } from "@chakra-ui/react"

// This will eventually be stored in MongoDB in the game I am playing against the other person.
const movesDb = ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]

const Chess = () => {

    

    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

    useEffect(() => {
        if (movesDb.indexOf(fen) === -1){
            movesDb.push(fen)
        }

        console.table(movesDb)
        
    }, [fen, movesDb])

    return (
        <>
            <NavBar active="chess"/>
            <PageContent>
                <Flex justify="center" align="center" mt="10vh">
                    <Board size={400} fen={fen} setFen={setFen} isFirstMove={movesDb.length === 1}/>
                </Flex>
            </PageContent>
            <Footer />
        </>
    );
}

export default Chess;
