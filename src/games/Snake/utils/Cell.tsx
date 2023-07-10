import { Vec2 } from "@website/games/utils/vec2";

export class Cell {
  constructor(
    public position: Vec2,
    public type: "snake" | "empty" | "food",
    public cellSize: number
  ){}
}