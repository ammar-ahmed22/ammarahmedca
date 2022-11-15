import type { IconType } from "react-icons";
import { FaChessQueen } from "react-icons/fa";
import { Piece } from "./Piece";


export class Queen extends Piece{
  
  public icon : IconType
  constructor(
    public color : "w" | "b"
  ){
    super()
    this.icon = FaChessQueen
  }

  get name(): string {
    return "queen"
  }

  
}