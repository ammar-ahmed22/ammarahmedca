import type { IconType } from "react-icons";
import { FaChessPawn } from "react-icons/fa";
import { Piece } from "./Piece";


export class Pawn extends Piece{
  
  public icon : IconType
  constructor(
    public color : "w" | "b"
  ){
    super()
    this.icon = FaChessPawn
  }

  get type(): PieceType {
    return "pawn"
  }

  validMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][]): string[] {
    const res = [];
    const numberFile = this.fileToNumber(file)
    const doubleMoveRank = this.color === "w" ? 2 : 7
    const rankDir = this.color === "w" ? 1 : -1;

    const singleSquareRank =  rank + rankDir
    const doubleSquareRank = rank + (2 * rankDir);

    const takes : [number, number][] = [
      [rank + rankDir, numberFile + 1],
      [rank + rankDir, numberFile - 1]
    ];
    
    
    if (rank === doubleMoveRank){
      // move 2 spaces
      console.log("double move");
      if (!this.isPiece(boardMatrix, singleSquareRank, numberFile)){
        res.push(this.createAlgebraic(singleSquareRank, file))
      }

      if (!this.isPiece(boardMatrix, doubleSquareRank, numberFile)){
        res.push(this.createAlgebraic(doubleSquareRank, file))
      }
      
    } else {
      // move 1 space
      console.log("single move");
      if (!this.isPiece(boardMatrix, singleSquareRank, numberFile)){
        res.push(this.createAlgebraic(singleSquareRank, file))
      }
    }

    takes.forEach( take => {
      if (this.isPiece(boardMatrix, take[0], take[1], { onlyOpps: true, noKing: true })){
        res.push(this.createAlgebraic(take[0], this.numberToFile(take[1])))
      }
    })
  

    return res;
  }

}