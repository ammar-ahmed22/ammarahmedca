import { Vec2 } from "@website/games/utils/vec2";

export class Circle{
  public stopGrowing: boolean = false;
  constructor(
    public position: Vec2,
    public size: number = 1,
    public color: string = "#ff0000"
  ){}
  
  public isInside = (pos: Vec2, radius: number = 0) => {
    const dist = Vec2.Distance(pos, this.position);
    return dist <= (this.size + radius);
  }
}