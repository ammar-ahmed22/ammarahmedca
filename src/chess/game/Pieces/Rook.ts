import type { IconType } from "react-icons";
import { FaChessRook } from "react-icons/fa";
import { Board } from "../Board";
import { Piece, AllMovesOpts } from "./Piece";

export class Rook extends Piece {
  public icon: IconType;
  constructor(public color: "w" | "b") {
    super();
    this.icon = FaChessRook;
  }

  get type(): PieceType {
    return "rook";
  }

  get points(): number {
    return 5;
  }

  allMoves(
    rank: number,
    file: string,
    board: Board,
    opts?: AllMovesOpts
  ): string[] {
    this.validateOpts(opts);
    const moves = this.getAllPerpendicular(board, rank, file);

    if (opts?.validOnly) return this.removeKings(moves, board);
    if (opts?.takesOnly) return this.removeNonTakes(moves, board);

    return moves;
  }
}
