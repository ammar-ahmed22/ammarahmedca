import React, { useContext, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { GameContext } from "../contexts/GameContext";

const Board : React.FC = () => {

  const { board, updateBoard, validMoves, updateValidMoves } = useContext(GameContext) as IGameContext;

  // console.log(board.matrix);

  useEffect(() => {
    
    updateBoard("rnbqkbnr/pppppppp/8/8/3Q4/8/PPPPPPPP/RNB1KBNR w KQkq e3 0 1")
    
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