import React from "react";
import { Box } from "@chakra-ui/react";
import { GameProvider } from "../contexts/GameContext";
import Board from "../components/Board";
import { useQuery } from "@apollo/client";
import { LAST_MOVE, LastMove } from "../graphql/queries/LastMove";
import Loading from "../components/Loading";
import { Navigate, useParams } from "react-router-dom";

const Game: React.FC = () => {
  const params = useParams();
  const { data, loading, error } = useQuery<
    LastMove.Response,
    LastMove.Variables
  >(LAST_MOVE, {
    variables: {
      gameID: params.gameID as string,
    },
  });

  if (loading) {
    return <Loading />;
  }

  // navigate to error page
  if (error || !data) {
    console.log(error);
    return <Navigate to="/chess/home" />;
  }

  return (
    <Box pos="relative">
      <GameProvider
        lastMove={data.game.lastMove}
        playerIDs={data.game.playerIDs}
        colorToMove={data.game.colorToMove}
      >
        <Board />
      </GameProvider>
    </Box>
  );
};

export default Game;
