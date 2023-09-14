import { Vec2 } from "@website/games/utils/vec2";
import { Polygon } from "@website/games/utils/polygon";
import { CanvasRenderer } from "@website/games/utils/canvas";
import { mapNumbers, randInt } from "@website/games/utils/math";


type AsteroidParams = {
  startPos?: Vec2,
  radius?: number,
  minOffset?: number,
  maxOffset?: number
}

export class Asteroid {
  public pos: Vec2 = new Vec2();
  public vel: Vec2 = new Vec2();
  public polygon: Polygon;
  public points: number = randInt(5, 15);
  public radius: number = randInt(10, 50);
  public pointOffset: number[];

  constructor(
    opts?: AsteroidParams
  ) {
    if (opts?.startPos) {
      this.pos = opts.startPos.copy();
    }

    if (opts?.radius) {
      this.radius = opts.radius;
    }

    
    this.pointOffset = [];
    for (let i = 0; i < this.points; i++) {
      this.pointOffset.push(randInt(opts?.minOffset ?? -10, opts?.maxOffset ?? 10))
    }

    this.polygon = new Polygon(this.createVertices());
  } 

  private createVertices = () => {
    const vertices: Vec2[] = [];
    for (let i = 0; i < this.points; i++) {
      const angle = mapNumbers(i, 0, this.points, 0, Math.PI * 2);
      const x = this.pos.x + ((this.radius + this.pointOffset[i]) * Math.cos(angle))
      const y = this.pos.y + ((this.radius + this.pointOffset[i]) * Math.sin(angle));
      vertices.push(new Vec2(x, y));
    }
    return vertices;
  }

  collision = (asteroids: Asteroid[]) => {
    for (let i = 0; i < asteroids.length; i++) {
      if (Polygon.doIntersect(this.polygon, asteroids[i].polygon) && asteroids[i] !== this) {
        // Elastic collision with m2 = x * m1
        let x = asteroids[i].radius / this.radius
        const v1 = this.vel.copy();
        const v2 = asteroids[i].vel.copy();
        const v1Prime = v1.copy().mult((1 - x)).add(v2.copy().mult(2 * x)).mult(1 / (x + 1));
        const v2Prime = v1.copy().mult(2).add(v2.copy().mult(x - 1)).mult(1 / (x + 1));

        this.vel = v1Prime.copy();
        asteroids[i].vel = v2Prime.copy();
      }
    }
  }

  edges = (width: number, height: number) => {
    if (this.pos.x > width + this.radius) {
      this.pos.x = this.radius;
    } else if (this.pos.x < -this.radius) {
      this.pos.x = width + this.radius;
    }

    if (this.pos.y > height + this.radius) {
      this.pos.y = this.radius;
    } else if (this.pos.y < -this.radius) {
      this.pos.y = height + this.radius;
    }
  }

  render = (renderer: CanvasRenderer) => {
    renderer.polygon(this.polygon, { stroke: "#ffffff" });
  }

  update = (asteroids: Asteroid[]) => {
    // this.collision(asteroids)
    this.pos.add(this.vel);
    this.polygon = new Polygon(this.createVertices())
  }

  breakup = () => {
    if (this.radius / 2 < 10) {
      return;
    }
    const newRad = Math.floor(this.radius / 2);
    const one = new Asteroid({ startPos: this.pos.copy(), radius: newRad, minOffset: -newRad, maxOffset: newRad });
    const two = new Asteroid({ startPos: this.pos.copy(), radius: newRad, minOffset: -newRad, maxOffset: newRad });
    one.vel = new Vec2(this.vel.y, -this.vel.x);
    two.vel = new Vec2(-this.vel.y, this.vel.x);
    return [one, two];
  }
}