import type { IconType } from "react-icons";

export abstract class Piece{

  abstract color : "w" | "b"
  abstract icon : IconType

  abstract get name() : string
  

}

