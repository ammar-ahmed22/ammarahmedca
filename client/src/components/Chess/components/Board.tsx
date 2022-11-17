import React, { useContext, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { GameContext } from "../contexts/GameContext";

const Board : React.FC = () => {

  const { board, updateBoard, validMoves, updateValidMoves } = useContext(GameContext) as IGameContext;

  // console.log(board.matrix);

  useEffect(() => {
    
    updateBoard("rnbqkbnr/pppp1ppp/8/4p3/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq e3 0 1")
    
  }, [])


  return (
    <Flex justify="center" align="center" direction="column" >
      {
       board && validMoves && board.render(validMoves)
      }
    </Flex>
  )

}

export default Board;