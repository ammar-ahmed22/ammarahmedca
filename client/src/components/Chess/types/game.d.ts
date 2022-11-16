interface IParsedFEN{
  boardString: string[][],
  colorToMove: string,
  castling: string,
  enPassant: string,
  halfMove: number,
  fullMove: number
}

type BoardMatrixType = Piece | undefined

type PieceType = "pawn" | "bishop" | "rook" | "knight" | "king" | "queen"