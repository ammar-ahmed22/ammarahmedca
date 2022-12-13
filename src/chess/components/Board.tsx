import React, { useContext } from "react";
import { Flex } from "@chakra-ui/react";
import { GameContext } from "../contexts/GameContext";
import PlayerDisplay from "./PlayerDisplay";

const Board: React.FC = () => {
  const {
    board,
    // updateBoard,
    validMoves,
    // updateValidMoves,
    // setColorToMove,
    // whiteTakes,
    // blackTakes,
    // game,
    userColor,
    move,
    // colorToMove,
  } = useContext(GameContext) as IGameContext;

  return (
    <Flex justify="center" align="center" direction="column">
      <PlayerDisplay
        player="opponent"
        color={userColor === "w" ? "b" : "w"}
        containerProps={{ mb: "1ch" }}
      />
      <Flex justify="center" align="center" direction="column">
        {board && validMoves && board.render(validMoves, move)}
      </Flex>
      <PlayerDisplay
        player="user"
        color={userColor}
        containerProps={{ mt: "4ch" }}
      />
    </Flex>
  );
};

export default Board;
