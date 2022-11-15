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

  get name(): string {
    return "bishop"
  }

  
}