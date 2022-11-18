import React, { useContext, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { GameContext } from "../contexts/GameContext";

const Board : React.FC = () => {

  const { board, updateBoard, validMoves, updateValidMoves, setColorToMove } = useContext(GameContext) as IGameContext;

  // console.log(board.matrix);

  useEffect(() => {
    
    // updateBoard("rnbqkbnr/pppppppp/3N4/8/8/8/PPPPPPPP/R1BQKBNR")
    // setTimeout(() => {
    //   setColorToMove("b");
    //   // alert("color updated!")
    // }, 3000)
    
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