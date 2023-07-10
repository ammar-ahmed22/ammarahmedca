import { Vec2 } from "@website/games/utils/vec2";
import { Edge } from "@website/games/utils/edge";
import { CanvasRenderer } from "@website/games/utils/canvas";

export class Hankin {
  public end: Vec2;
  public intersection?: Vec2;
  public prevDist: number = 0;
  constructor(
    public start: Vec2, public v: Vec2) {
      this.end = Vec2.Add(start, v);
  }

  rotate = (angle: number, opts?: { degrees?: boolean }) => {
    this.v.rotate(angle, opts);
    this.end = Vec2.Add(this.start, this.v);
  }

  findIntersection = (other: Hankin) => {
    // Reference: http://paulbourke.net/geometry/pointlineplane/
    // this.start, this.v, this.end = P1, (P2 - P1), P2
    // other.start, other.v, other.end = P3, (P4 - P3), P4

    const deno = (other.v.y * this.v.x) - (other.v.x * this.v.y) 
    const numA = (other.v.x * (this.start.y - other.start.y)) - (other.v.y * (this.start.x - other.start.x));
    const numB = (this.v.x * (this.start.y - other.start.y)) - (this.v.y * (this.start.x - other.start.x));

    const ua = numA / deno;
    const ub = numB / deno;

    const x = this.start.x + (ua * this.v.x);
    const y = this.start.y + (ua * this.v.y);

    

    if (ua > 0 && ub > 0) {
      const candidate = new Vec2(x, y);
      const d1 = Vec2.Distance(candidate, this.start);
      const d2 = Vec2.Distance(candidate, other.start);
      const total = d1 + d2;
      if (!this.intersection) {
        this.intersection = candidate.copy(); 
        this.prevDist = total;
      } else if (total < this.prevDist) {
        this.prevDist = total;
        this.intersection = candidate.copy();
      }
    }
  }

  render = (renderer: CanvasRenderer, color: string, width: number) => {
    // renderer.circle(this.start.x, this.start.y, 2, 0, Math.PI * 2, { stroke: "#ffff00" });
    if (this.intersection) {
      renderer.line({ from: this.start, to: this.intersection, color, width });
    } else {
      renderer.line({ from: this.start, to: this.end, color, width });
    }
    
    // if (this.intersection) {
    //   renderer.circle(this.intersection.x, this.intersection.y, 5, 0, Math.PI * 2, { fill: "#ff0000" });
    // }
  }
}

