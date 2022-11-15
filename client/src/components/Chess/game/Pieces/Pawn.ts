import type { IconType } from "react-icons";
import { FaChessPawn } from "react-icons/fa";
import { Piece } from "./Piece";


export class Pawn extends Piece{
  
  public icon : IconType
  constructor(
    public color : "w" | "b"
  ){
    super()
    this.icon = FaChessPawn
  }

  get name(): string {
    return "pawn"
  }


}