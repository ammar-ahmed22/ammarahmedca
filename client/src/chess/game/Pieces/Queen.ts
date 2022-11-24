import type { IconType } from "react-icons";
import { FaChessQueen } from "react-icons/fa";
import { Board } from "../Board";
import { Piece, AllMovesOpts } from "./Piece";


export class Queen extends Piece{
  
  public icon : IconType
  constructor(
    public color : "w" | "b"
  ){
    super()
    this.icon = FaChessQueen
  }

  get type(): PieceType {
    return "queen"
  }

  get points(): number {
    return 9;
  }

  allMoves(rank: number, file: string, board: Board, opts?: AllMovesOpts): string[] {
    this.validateOpts(opts);
    const moves =  [
      this.getAllDiagonals(board, rank, file),
      this.getAllPerpendicular(board, rank, file)
    ].flatMap( arr => arr);

    if (opts?.validOnly) return this.removeKings(moves, board);
    if (opts?.takesOnly) return this.removeNonTakes(moves, board);

    return moves
  }
  
}