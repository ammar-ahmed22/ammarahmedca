import { Board } from "../game/Board";
import { Piece } from "../game/Pieces/Piece";

declare global {
  interface IGameContext {
    board: Board;
    updateBoard: (fen: string) => void;
    fen: string;
    validMoves: string[];
    updateValidMoves: (moves: string[]) => void;
    colorToMove: "w" | "b";
    setColorToMove: (color: "w" | "b") => void;
    move: IMove;
    setToMove: (algebraic: IAlgebraic) => void;
    setMoveTo: (algebraic: IAlgebraic) => void;
    whiteTakes: Piece[];
    blackTakes: Piece[];
    squareSize: string;
    setSquareSize: (val: string) => void;
  }

  interface IAlgebraic {
    rank: number;
    file: string;
  }

  interface IMove {
    toMove: IAlgebraic | null;
    moveTo: IAlgebraic | null;
  }

  interface GameProviderProps {
    children: React.ReactNode;
    game: Game;
  }
}
