import { Piece } from "../game/Pieces/Piece"

declare global {
  interface SquareProps{
    piece?: Piece
    size: string,
    bg: "dark" | "light",
    id?: string
    rank: number,
    file: string,
    indices: [number, number],
    isValidMove: boolean
  }
}