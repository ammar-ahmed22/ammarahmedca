import type { IconType } from "react-icons";

interface IsPieceOpts{
  onlyOpps?: boolean,
  noKing?: boolean
}

interface FindDiagonalOpts{
  incrementRank: boolean,
  incrementFile: boolean
}

export abstract class Piece {

  abstract color : "w" | "b"
  abstract icon : IconType

  abstract get type() : PieceType
  
  abstract validMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][]) : string[]

  protected fileToNumber = (file: string) : number => file.charCodeAt(0) - 96 ;
  protected numberToFile = (numberFile: number) : string => String.fromCharCode(numberFile + 96) 
  protected createAlgebraic = (rank: number, file: string | number) : string => {
    if (typeof file === "string"){
      return `${file}${rank}`
    } else{
      return `${this.numberToFile(file)}${rank}`
    }
  } 

  private getPiece = (boardMatrix: BoardMatrixType[][], rank: number, numberFile: number) : BoardMatrixType => {
    const row = 8 - rank;
    const col = numberFile - 1;

    return boardMatrix[row][col];
  }

  protected isPiece = (boardMatrix: BoardMatrixType[][], rank: number, numberFile: number, opts?: IsPieceOpts) : boolean => {
    const piece = this.getPiece(boardMatrix, rank, numberFile)

    if (!piece) return false;

    if (opts?.onlyOpps && piece.color === this.color) return false;

    if (opts?.noKing && piece.type === "king") return false;

    return true;
    
  }

  protected findDiagonalMoves = (boardMatrix: BoardMatrixType[][], startRank: number, startFile: string, { incrementFile, incrementRank } : FindDiagonalOpts) => {
    const res : string[] = []
    const rankDir = incrementRank ? 1 : -1;
    const fileDir = incrementFile ? 1 : -1;
    
    const startFileNum = this.fileToNumber(startFile);

    let pFile = startFileNum + fileDir;
    for (let pRank = startRank + rankDir; incrementRank ? pRank <= 8 : pRank >= 1; pRank += rankDir){
      const isEmpty = !this.isPiece(boardMatrix, pRank, pFile)
      const isOpponent = this.isPiece(boardMatrix, pRank, pFile, { onlyOpps: true, noKing: true });

      // empty, move to next
      if (isEmpty) {
        res.push(this.createAlgebraic(pRank, pFile));
        pFile += fileDir;
        continue;
      }

      // opponent, add and stop
      if (isOpponent) {
        res.push(this.createAlgebraic(pRank, pFile));
        break;
      }

      // teammate, stop
      if (!isEmpty && !isOpponent){
        break;
      }
    }

    return res;
  }


}

