import type { IconType } from "react-icons";

interface IsPieceOpts{
  onlyOpps?: boolean,
  noKing?: boolean
}

export abstract class Piece{

  abstract color : "w" | "b"
  abstract icon : IconType

  abstract get type() : PieceType
  
  abstract validMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][]) : string[]

  protected fileToNumber = (file: string) : number => file.charCodeAt(0) - 96;
  protected numberToFile = (numberFile: number) : string => String.fromCharCode(numberFile + 96)
  protected createAlgebraic = (rank: number, file: string) : string => `${file}${rank}`

  private getPiece = (boardMatrix: BoardMatrixType[][], rank: number, numberFile: number) => {
    const row = 8 - rank;
    const col = numberFile - 1;

    return boardMatrix[row][col];
  }

  protected isPiece = (boardMatrix: BoardMatrixType[][], rank: number, numberFile: number, opts?: IsPieceOpts) => {
    const piece = this.getPiece(boardMatrix, rank, numberFile)

    if (!piece) return false;

    if (opts?.onlyOpps && piece.color === this.color) return false;

    if (opts?.noKing && piece.type === "king") return false;

    return true;
    
  }

  

}

