import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { GameProvider } from "../contexts/GameContext";
import Board from "../components/Board";
import { useSessionStorage } from "../../hooks/sessionStorage";
import { useNavigate } from "react-router-dom";

const Game: React.FC = () => {
  const removeToken = useSessionStorage("authToken")[2];
  const navigate = useNavigate();
  return (
    <Box>
      {/* <Button
        onClick={() => {
          removeToken()
          navigate("/chess")
        }}
      >Logout</Button> */}
      <GameProvider>
        <Board />
      </GameProvider>
    </Box>
  );
};

export default Game;
