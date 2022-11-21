import type { IconType } from "react-icons";
import { FaChessPawn } from "react-icons/fa";
import { Piece, AllMovesOpts } from "./Piece";


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

  get points(): number {
    return 1  
  }

  allMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][], opts?: AllMovesOpts): string[] {
    this.validateOpts(opts);
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
      // console.log("double move", rank, file);
      if (!this.isPiece(boardMatrix, singleSquareRank, numberFile)){
        res.push(this.createAlgebraic(singleSquareRank, file))
      }

      if (!this.isPiece(boardMatrix, doubleSquareRank, numberFile)){
        res.push(this.createAlgebraic(doubleSquareRank, file))
      }
      
    } else {
      // move 1 space
      // console.log("single move");
      if (!this.isPiece(boardMatrix, singleSquareRank, numberFile)){
        res.push(this.createAlgebraic(singleSquareRank, file))
      }
    }

    takes.forEach( take => {
      if (this.isPiece(boardMatrix, take[0], take[1], { onlyOpps: true })){
        res.push(this.createAlgebraic(take[0], this.numberToFile(take[1])))
      }
    })
  
    if (opts?.validOnly) return this.removeKings(res, boardMatrix);
    if (opts?.takesOnly) return this.removeNonTakes(res, boardMatrix);

    return res;
  }

  // validMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][]): string[] {
  //   const all = this.allMoves(rank, file, boardMatrix);

  //   return all.filter( move => {
  //     const [file, rank] = move.split("");
  //     const piece = this.getPiece(boardMatrix, parseInt(rank), this.fileToNumber(file));

  //     if (!piece) return false;
  //     if (piece.type === "king") return false;

  //     return true;
  //   })
  // }

}