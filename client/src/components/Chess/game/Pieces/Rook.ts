import type { IconType } from "react-icons";
import { FaChessRook } from "react-icons/fa";
import { Piece } from "./Piece";


export class Rook extends Piece{
  
  public icon : IconType
  constructor(
    public color : "w" | "b"
  ){
    super()
    this.icon = FaChessRook
  }

  get name(): string {
    return "rook"
  }

  
}