import React, { useContext, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { GameContext } from "../contexts/GameContext";
import PlayerDisplay from "./PlayerDisplay";

const Board: React.FC = () => {
  const {
    board,
    updateBoard,
    validMoves,
    updateValidMoves,
    setColorToMove,
    whiteTakes,
    blackTakes,
    colorToMove,
  } = useContext(GameContext) as IGameContext;

  // console.log(board.matrix);

  useEffect(() => {
    // updateBoard("rnbqkbnr/pppppppp/3N4/8/8/8/PPPPPPPP/R1BQKBNR")
    // setTimeout(() => {
    //   setColorToMove("b");
    //   // alert("color updated!")
    // }, 3000)
  }, []);

  return (
    <Flex justify="center" align="center" direction="column">
      <PlayerDisplay
        player={{ firstName: "Saniya", lastName: "Ahmed" }}
        takes={{ w: whiteTakes, b: blackTakes }}
        takesColor="w"
        containerProps={{ mb: "1ch" }}
      />
      <Flex justify="center" align="center" direction="column">
        {board && validMoves && board.render(validMoves)}
      </Flex>
      <PlayerDisplay
        player={{ firstName: "Ammar", lastName: "Ahmed" }}
        takes={{ w: whiteTakes, b: blackTakes }}
        takesColor="b"
        containerProps={{ mt: "4ch" }}
      />
    </Flex>
  );
};

export default Board;
