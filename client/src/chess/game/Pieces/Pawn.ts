import type { IconType } from "react-icons";
import { FaChessPawn } from "react-icons/fa";
import { Piece, AllMovesOpts } from "./Piece";
import { Board } from "../Board";
import { createAlgebraic, fileToNumber, numberToFile } from "../utils";


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

  allMoves(rank: number, file: string, board: Board, opts?: AllMovesOpts): string[] {
    this.validateOpts(opts);
    const res = [];
    const numberFile = fileToNumber(file)
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
      if (!board.isPiece(singleSquareRank, numberFile, this.color)){
        res.push(createAlgebraic(singleSquareRank, file))
      }

      if (!board.isPiece(doubleSquareRank, numberFile, this.color)){
        res.push(createAlgebraic(doubleSquareRank, file))
      }
      
    } else {
      // move 1 space
      // console.log("single move");
      if (!board.isPiece(singleSquareRank, numberFile, this.color)){
        res.push(createAlgebraic(singleSquareRank, file))
      }
    }

    takes.forEach( take => {
      if (board.isPiece(take[0], take[1], this.color, { onlyOpps: true })){
        res.push(createAlgebraic(take[0], numberToFile(take[1])))
      }
    })
  
    if (opts?.validOnly) return this.removeKings(res, board);
    if (opts?.takesOnly) return this.removeNonTakes(res, board);

    return res;
  }

}