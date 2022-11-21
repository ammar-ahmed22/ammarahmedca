import type { IconType } from "react-icons";
import { FaChessBishop } from "react-icons/fa"
import { Piece, AllMovesOpts } from "./Piece";


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

  allMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][], opts?: AllMovesOpts): string[] {
    this.validateOpts(opts);
    
    const moves = this.getAllDiagonals(boardMatrix, rank, file);

    if (opts?.validOnly) return this.removeKings(moves, boardMatrix);
    if (opts?.takesOnly) return this.removeNonTakes(moves, boardMatrix);
    return moves
  }

  
}