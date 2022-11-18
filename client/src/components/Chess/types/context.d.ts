import { Board } from "../game/Board";

declare global {
  interface IGameContext{
    board: Board,
    updateBoard: (fen: string) => void,
    fen: string,
    validMoves: string[],
    updateValidMoves: (moves: string[]) => void
    setColorToMove: (color: "w" | "b") => void,
    move: IMove,
    setToMove: (algebraic: IAlgebraic) => void,
    setMoveTo: (algebraic: IAlgebraic) => void,
  }

  interface IAlgebraic{
    rank: number
    file: string
  }

  interface IMove{
    toMove: IAlgebraic | null,
    moveTo: IAlgebraic | null
  }

  interface GameProviderProps{
    children: React.ReactNode
  }
}