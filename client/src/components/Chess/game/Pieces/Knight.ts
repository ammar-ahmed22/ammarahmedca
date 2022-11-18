import type { IconType } from "react-icons";
import { FaChessKnight } from "react-icons/fa";
import { Piece } from "./Piece";


export class Knight extends Piece{
  
  public icon : IconType
  constructor(
    public color : "w" | "b"
  ){
    super()
    this.icon = FaChessKnight
  }

  get type(): PieceType {
    return "knight"
  }

  validMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][]): string[] {
    const numberFile = this.fileToNumber(file);
    const potentialMoves = [
      {
        rank: rank + 2,
        file: numberFile + 1
      },
      {
        rank: rank + 1,
        file: numberFile + 2
      },
      {
        rank: rank - 1,
        file: numberFile + 2,
      },
      {
        rank: rank - 2,
        file: numberFile + 1
      },
      {
        rank: rank - 1,
        file: numberFile - 2,
      },
      {
        rank: rank - 2,
        file: numberFile - 1
      },
      {
        rank: rank + 1,
        file: numberFile - 2 
      },
      {
        rank: rank + 2,
        file: numberFile - 1
      }
    ]

    const onlyInBounds = potentialMoves.filter( move => {
      if (move.rank < 1 || move.rank > 8 || move.file < 1 || move.file > 8){
        return false;
      }

      return true;
    })

    const onlyEmptyOrOpp = onlyInBounds.filter( move => {
      if (!this.isPiece(boardMatrix, move.rank, move.file)){
        return true;
      }

      if (this.isPiece(boardMatrix, move.rank, move.file, { onlyOpps: true, noKing: true })){
        return true;
      }

      return false
    })


    return onlyEmptyOrOpp.map(move => this.createAlgebraic(move.rank, move.file))
  }
  
}