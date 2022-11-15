import React from "react"
import { Box, Text } from "@chakra-ui/react";
import { GameProvider } from "../contexts/GameContext";
import Board from "../components/Board"

const Game : React.FC = () => {

  return (
    <Box>
      <Text>Chess Game</Text>
      <GameProvider>
        <Board />
      </GameProvider>
    </Box>
  )
}

export default Game;