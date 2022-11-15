import type { IconType } from "react-icons";
import { FaChessKing } from "react-icons/fa";
import { Piece } from "./Piece";


export class King extends Piece{
  
  public icon : IconType
  constructor(
    public color : "w" | "b"
  ){
    super()
    this.icon =  FaChessKing
  }

  get name(): string {
    return "king"
  }

  
}