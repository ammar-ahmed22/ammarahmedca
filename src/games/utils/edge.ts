import { Vec2 } from "./vec2";
import { CanvasRenderer } from "./canvas";

export class Edge{
  constructor(
    public a: Vec2,
    public b: Vec2
  ) {}

  get midpoint() {
    return Vec2.Add(this.a, this.b).mult(0.5)
  }

  render = (renderer: CanvasRenderer, color?: string, width?: number) => {
    renderer.line({ from: this.a, to: this.b, color, width });
  }
}