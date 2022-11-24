import type { IconType } from "react-icons";
import { FaChessBishop } from "react-icons/fa"
import { Piece, AllMovesOpts } from "./Piece";
import { Board } from "../Board";


export class Bishop extends Piece{
  
  public icon : IconType;
  constructor(
    public color : "w" | "b"
  ){
    super()
    this.icon = FaChessBishop
  }

  get type(): PieceType {
    return "bishop"
  }

  get points(): number {
    return 3;
  }

  allMoves(rank: number, file: string, board: Board, opts?: AllMovesOpts): string[] {
    this.validateOpts(opts);
    
    const moves = this.getAllDiagonals(board, rank, file);

    if (opts?.validOnly) return this.removeKings(moves, board);
    if (opts?.takesOnly) return this.removeNonTakes(moves, board);
    return moves
  }

  
}