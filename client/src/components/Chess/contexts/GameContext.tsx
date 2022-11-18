import React,  { createContext, useState, useEffect } from "react";
import { Board } from "../game/Board";

const starting = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
export const GameContext = createContext<IGameContext | null>(null);

export const GameProvider : React.FC<GameProviderProps> = ({ children }) => {

  const [boardOpts, setBoardOpts] = useState<BoardOpts>({
    colorToMove: "w",
    castling: "KQkq",
    enPassant: "-",
    halfMove: 0,
    fullMove: 1
  });
  const [board, setBoard] = useState<Board>(new Board(starting, boardOpts));
  const [fen, setFEN] = useState<string>(starting);
  const [move, setMove] = useState<IMove>({
    toMove: null,
    moveTo: null
  })
  
  const [validMoves, setValidMoves] = useState<string[]>([]);

  const updateBoard = (fen: string) : void => {
    setFEN(fen);
  }

  const updateValidMoves = (moves: string[]) => setValidMoves(moves);

  const setColorToMove = (color: "w" | "b") => {
    setBoardOpts(prevOpts => ({...prevOpts, colorToMove: color }));
  }

  useEffect(() => {
    setBoard(new Board(fen, boardOpts))
    setValidMoves([]);
    setMove({ toMove: null, moveTo: null })
  }, [fen, boardOpts])

  useEffect(() => {
    if (move.moveTo && move.toMove){
      // swap and update fen
      console.log(move);
    }
  }, [move])

  const setToMove = (algebraic: IAlgebraic) => {
    setMove(prevMove => ({ ...prevMove, toMove: algebraic }))
  }

  const setMoveTo = (algebraic: IAlgebraic) => {
    setMove(prevMove => ({ ...prevMove, moveTo: algebraic }))
  }

  const context : IGameContext = {
    board,
    fen,
    updateBoard,
    validMoves,
    updateValidMoves,
    setColorToMove,
    move,
    setToMove,
    setMoveTo
  }


  return (
    <GameContext.Provider value={context}>
      {
        children
      }
    </GameContext.Provider>
  )
}