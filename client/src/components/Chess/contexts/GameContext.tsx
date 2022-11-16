import React,  { createContext, useState } from "react";
import { Board } from "../game/Board";



const starting = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
export const GameContext = createContext<IGameContext | null>(null);

interface GameProviderProps{
  children: React.ReactNode
}
export const GameProvider : React.FC<GameProviderProps> = ({ children }) => {

  const [board, setBoard] = useState<Board>(new Board(starting));
  const [fen, setFEN] = useState<string>(starting);
  const [validMoves, setValidMoves] = useState<string[]>([]);

  const updateBoard = (fen: string) : void => {
    setFEN(fen);
    setBoard(new Board(fen))
  }

  const updateValidMoves = (moves: string[]) => setValidMoves(moves);

  const context : IGameContext = {
    board,
    fen,
    updateBoard,
    validMoves,
    updateValidMoves
  }


  return (
    <GameContext.Provider value={context}>
      {
        children
      }
    </GameContext.Provider>
  )
}