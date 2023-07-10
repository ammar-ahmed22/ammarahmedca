import { CanvasRenderer } from "@website/games/utils/canvas";
import { Vec2 } from "@website/games/utils/vec2";
import { DNA } from "./DNA";
import { Polygon } from "@website/games/utils/polygon";
import { Explosion } from "./Explosion";

export class Missile {
  public pos: Vec2 = new Vec2();
  public vel: Vec2 = new Vec2();
  public acc: Vec2 = new Vec2();
  public sprite: number = 0;
  public dna: DNA;
  public fitness: number = 0;
  // public bounds: { min: Vec2, max: Vec2 }
  public obstacles: Polygon[] = []
  public dead: boolean = false;
  public completed: boolean = false;
  public exploded: boolean = false;
  public explosion: Explosion = new Explosion(50, 50);
  public polygon: Polygon;

  constructor(
    public width: number,
    public height: number,
    dna: number | DNA,
    public bounds: {
      max: Vec2,
      min: Vec2
    },
    public target: Vec2,
    initialPos?: Vec2,
    obstacles?: {pos: Vec2, size: Vec2}[],
    public targetSize?: number
  ) {
    if (initialPos) this.pos = initialPos.copy();
    this.dna = new DNA(dna);
    // this.bounds = bounds;
    if (obstacles) {
      this.obstacles = obstacles.map(obs => {
        const { pos, size } = obs;
        return Polygon.fromRectangle(pos.x, pos.y, size.x, size.y)
      })
      // for (let i = 0; i < obstacles.length; i++) {
      //   const { pos, size } = obstacles[i];
      //   this.obstacles.push(Polygon.fromRectangle(pos.x, pos.y, size.x, size.y));
      // }
    }
    this.polygon = Polygon.fromRectangle(this.pos.x, this.pos.y, width, height);
  }

  public calcFitness = (target: Vec2) => {
    const d = Vec2.Distance(this.pos, target);
    if (d === 0) {
      this.fitness = 1 / 0.0001;
    } else {
      this.fitness = 1 / d;
    }
    
  }

  public checkBounds = () => {
    for (let i = 0; i < this.polygon.vertices.length; i++) {
      const { x, y } = this.polygon.vertices[i];
      if (x < this.bounds.min.x || x > this.bounds.max.x || y < this.bounds.min.y || y > this.bounds.max.y) {
        this.dead = true;
      }
    }
  }

  public checkCollision = () => {
    for (let i = 0; i < this.obstacles.length; i++) {
      const obs = this.obstacles[i];
      if (Polygon.doIntersect(this.polygon, obs)) {
        this.dead = true;
      }
    } 
  }

  public checkComplete = () => {
    const point = new Vec2(this.pos.x + (this.width / 2), this.pos.y);
    const d = Vec2.Distance(point, this.target);
    if (d <= (this.targetSize ?? 25) + 10) {
      this.completed = true;
      this.explosion.setPos(point.copy());
      this.explosion.start();
      this.pos = this.target.copy();
    }
  }
  

  public applyForce = (force: Vec2) => {
    this.acc.mult(0);
    this.acc.add(force);
  }

  public update = (geneCount: number) => {
    this.checkBounds();
    this.checkCollision();
    this.checkComplete();
    if (this.dead || this.completed) return;
    const force = this.dna.genes[geneCount];
    force.setMagnitude(0.1)
    this.applyForce(force);

    this.pos.add(this.vel);
    this.vel.add(this.acc);

    this.polygon = Polygon.fromRectangle(this.pos.x, this.pos.y, this.width, this.height);
    this.polygon.rotate(this.vel.heading() + (Math.PI / 2));
  }
  

  public render = (renderer: CanvasRenderer, sprite: HTMLImageElement, deadSprite?: HTMLImageElement) => {
    if (this.completed) return;
    const { ctx } = renderer;

    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.vel.heading() + (Math.PI / 2));
    
    if (this.dead) {
      if (deadSprite) {
        renderer.image(deadSprite, 0, 0, { width: this.width, height: this.height });
      } else {
        renderer.rect(0, 0, this.width, this.height, { fill: "#0000ff" });
      }
    } else {
      renderer.image(sprite, 0, 0, { width: this.width, height: this.height });
    }
     ctx.restore();
  }
}