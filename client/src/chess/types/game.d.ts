import { Piece } from "../game/Pieces/Piece";

declare global {
  interface IParsedFEN {
    boardString: string[][];
    colorToMove: string;
    castling: string;
    enPassant: string;
    halfMove: number;
    fullMove: number;
  }

  type BoardMatrixType = Piece | undefined;

  type PieceType = "pawn" | "bishop" | "rook" | "knight" | "king" | "queen";

  interface IsPieceOpts {
    onlyOpps?: boolean;
    noKing?: boolean;
  }

  interface BoardOpts {
    colorToMove?: "w" | "b";
    castling?: string;
    enPassant?: string;
    halfMove?: number;
    fullMove?: number;
    squareSize?: string;
  }
}
