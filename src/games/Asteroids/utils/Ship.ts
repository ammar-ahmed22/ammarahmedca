import { Vec2 } from "@website/games/utils/vec2";
import { Polygon } from "@website/games/utils/polygon";
import { CanvasRenderer } from "@website/games/utils/canvas";

type ShipParams = {
  startPos?: Vec2
}

export class Ship {
  public pos: Vec2 = new Vec2();
  public vel: Vec2 = new Vec2();
  public acc: Vec2 = new Vec2();
  public heading: number = 0;
  public polygon: Polygon;

  constructor(
    public width: number,
    public height: number,
    opts?: ShipParams
  ) {
    if (opts?.startPos) {
      this.pos = opts.startPos.copy()
    }
    this.polygon = new Polygon(this.createVertices())
  }

  private createVertices = () => {
    return [
      this.pos.copy(),
      new Vec2(this.pos.x + (this.width / 2), this.pos.y + (this.height / 3)),
      new Vec2(this.pos.x, this.pos.y - ((2 * this.height) / 3)),
      new Vec2(this.pos.x - (this.width / 2), this.pos.y + (this.height / 3))
    ]
  }

  edges = (width: number, height: number) => {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }

    if (this.pos.y > height) { 
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  render = (renderer: CanvasRenderer) => {
    this.polygon.rotate(this.heading + (Math.PI / 2));
    renderer.polygon(this.polygon, { stroke: "#ffffff" })
  }

  update = () => {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.mult(0.99);
    this.acc.mult(0);

    this.polygon = new Polygon(this.createVertices());
  }
}