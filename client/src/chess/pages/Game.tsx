import React from "react";
import { Box } from "@chakra-ui/react";
import { GameProvider } from "../contexts/GameContext";
import Board from "../components/Board";
import { useQuery } from "@apollo/client";
import { GAME_QUERY, GameQuery } from "../graphql/queries/Game";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";

const Game: React.FC = () => {
  const { data, loading, error } = useQuery<GameQuery.Response>(GAME_QUERY);

  if (loading) {
    return <Loading />;
  }

  // navigate to error page
  if (error || !data) {
    return <Navigate to="/chess/home" />;
  }

  return (
    <Box pos="relative">
      <GameProvider game={data.game}>
        <Board />
      </GameProvider>
    </Box>
  );
};

export default Game;
