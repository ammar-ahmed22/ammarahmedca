import React, { useContext, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { GameContext } from "../contexts/GameContext";
import PlayerDisplay from "./PlayerDisplay";
// import { useQuery } from "@apollo/client";

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
    opponentMetadata,
    move,
    // colorToMove,
  } = useContext(GameContext) as IGameContext;

  // console.log(board.matrix);

  useEffect(() => {
    // updateBoard("rnbqkbnr/pppppppp/3N4/8/8/8/PPPPPPPP/R1BQKBNR")
    // setTimeout(() => {
    //   setColorToMove("b");
    //   // alert("color updated!")
    // }, 3000)
    console.log(board);
  }, [board]);

  return (
    <Flex justify="center" align="center" direction="column">
      <PlayerDisplay
        player="opponent"
        color={opponentMetadata.color}
        containerProps={{ mb: "1ch" }}
      />
      <Flex justify="center" align="center" direction="column">
        {board && validMoves && board.render(validMoves, move)}
      </Flex>
      <PlayerDisplay
        player="user"
        color={opponentMetadata.color === "w" ? "b" : "w"}
        containerProps={{ mt: "4ch" }}
      />
    </Flex>
  );
};

export default Board;
