import type { IconType } from "react-icons";
import { FaChessRook } from "react-icons/fa";
import { Piece, AllMovesOpts } from "./Piece";


export class Rook extends Piece{
  
  public icon : IconType
  constructor(
    public color : "w" | "b"
  ){
    super()
    this.icon = FaChessRook
  }

  get type(): PieceType {
    return "rook"
  }

  get points(): number {
    return 5;
  }

  allMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][], opts?: AllMovesOpts): string[] {
    this.validateOpts(opts);
    const moves = this.getAllPerpendicular(boardMatrix, rank, file);

    if (opts?.validOnly) return this.removeKings(moves, boardMatrix);
    if (opts?.takesOnly) return this.removeNonTakes(moves, boardMatrix);

    return moves;
  }

  
}