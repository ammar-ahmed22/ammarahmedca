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
    
    return []
  }
  
}