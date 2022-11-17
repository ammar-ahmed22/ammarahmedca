import type { IconType } from "react-icons";
import { FaChessBishop } from "react-icons/fa"
import { Piece } from "./Piece";


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

  validMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][]): string[] {
    
    const topRight = this.findDiagonalMoves(boardMatrix, rank, file, {
      incrementRank: true,
      incrementFile: true
    })

    const topLeft = this.findDiagonalMoves(boardMatrix, rank, file, {
      incrementRank: true,
      incrementFile: false
    })

    const bottomRight = this.findDiagonalMoves(boardMatrix, rank, file, {
      incrementRank: false,
      incrementFile: true
    })

    const bottomLeft = this.findDiagonalMoves(boardMatrix, rank, file, {
      incrementRank: false,
      incrementFile: false
    })


    return [
      ...topRight,
      ...topLeft,
      ...bottomRight,
      ...bottomLeft
    ]
  }

  
}