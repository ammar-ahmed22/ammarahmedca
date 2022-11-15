import React, { useContext, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { GameContext, IGameContext } from "../contexts/GameContext";

const Board : React.FC = () => {

  const { board, updateBoard } = useContext(GameContext) as IGameContext;

  console.log(board.matrix);

  // useEffect(() => {
  //   setTimeout(() => {
  //     updateBoard("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1")
  //   }, 2000)
  // }, [])

  return (
    <Flex justify="center" align="center" direction="column" >
      {
        board.render()
      }
    </Flex>
  )

}

export default Board;