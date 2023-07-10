import { CanvasRenderer } from "@website/games/utils/canvas";
import { Vec2 } from "@website/games/utils/vec2";
import { Asteroid } from "./Asteroid";


export class Bullet {
  public vel: Vec2 = new Vec2();
  constructor(
    public pos: Vec2
  ) {}

  render = (renderer: CanvasRenderer) => {
    renderer.circle(this.pos.x, this.pos.y, 1, 0, Math.PI * 2, { fill: "#ffffff" });
  }  

  update = () => {
    this.pos.add(this.vel);
  }

  hit = (asteroid: Asteroid) => {
    const dist = Vec2.Distance(this.pos, asteroid.pos);
    return dist < asteroid.radius;
  }
}