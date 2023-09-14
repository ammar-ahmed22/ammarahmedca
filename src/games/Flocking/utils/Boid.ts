import { CanvasRenderer } from "@website/games/utils/canvas";
import { Polygon } from "@website/games/utils/polygon";
import { Vec2 } from "@website/games/utils/vec2";

type BoidOpts = {
  startPos?: Vec2
  maxSeeAhead?: number,
  maxForce?: number,
  maxSpeed?: number,
  perceptionRadius?: number,
  sepMult?: number,
  alignMult?: number,
  cohMult?: number
}

export class Boid {
  public pos: Vec2 = new Vec2();
  public vel: Vec2 = new Vec2();
  public acc: Vec2 = new Vec2(); 
  public ahead: Vec2 = new Vec2();
  public polygon: Polygon;

  public maxSeeAhead = .5;
  public maxForce = 2;
  public maxSpeed = 4;
  public perceptionRadius = 50;
  public separationMultiplier = 1;
  public alignmentMultiplier = 1;
  public cohesionMultiplier = 1;
  constructor(public height: number, public width: number, opts?: BoidOpts) {
    if (opts?.startPos) {
      this.pos = opts.startPos.copy();
    }

    if (opts?.maxSeeAhead) {
      this.maxSeeAhead = opts.maxSeeAhead;
    }

    if (opts?.maxForce) {
      this.maxForce = opts.maxForce
    }

    if (opts?.maxSpeed) {
      this.maxSpeed = opts.maxSpeed;
    }

    if (opts?.perceptionRadius) {
      this.perceptionRadius = opts.perceptionRadius;
    }

    if (opts?.sepMult) {
      this.separationMultiplier = opts.sepMult;
    }

    if (opts?.cohMult) {
      this.cohesionMultiplier = opts.cohMult;
    }

    if (opts?.alignMult) {
      this.alignmentMultiplier = opts.alignMult;
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

  private align = (boids: Boid[]): Vec2 => {
    let total = 0;
    let steering = new Vec2();

    for (let i = 0; i < boids.length; i++) {
      const distance = Vec2.Distance(this.pos, boids[i].pos);
      if (boids[i] !== this && distance < this.perceptionRadius) {
        steering.add(boids[i].vel);
        total++
      }
    }

    if (total > 0) {
      steering.mult(1/total);
      steering.setMagnitude(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  private cohesion = (boids: Boid[]): Vec2 => {
    let total = 0;
    let steering = new Vec2();

    for (let i = 0; i < boids.length; i++) {
      const distance = Vec2.Distance(this.pos, boids[i].pos);
      if (boids[i] !== this && distance < this.perceptionRadius) {
        steering.add(boids[i].pos);
        total++
      }
    }

    if (total > 0) {
      steering.mult(1 / total);
      steering.sub(this.pos);
      steering.setMagnitude(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  private separation = (boids: Boid[]): Vec2 => {
    let total = 0;
    let steering = new Vec2();

    for (let i = 0; i < boids.length; i++) {
      const distance = Vec2.Distance(this.pos, boids[i].pos);
      if (boids[i] !== this && distance < this.perceptionRadius) {
        const diff = Vec2.Subtract(boids[i].pos, this.pos);
        diff.mult(1/(distance * distance));
        steering.add(diff);
        total++
      }
    }

    if (total > 0) {
      steering.mult(1 / total);
      steering.setMagnitude(this.maxSpeed);
      steering.sub(this.vel);
      steering.limit(this.maxForce);
    }

    return steering;
  }

  public intersection = (boids: Boid[]) => { 
    for (let i = 0; i < boids.length; i++) {
      if (boids[i] !== this) {
        if (Polygon.doIntersect(this.polygon, boids[i].polygon)) {
          this.acc.mult(-1).limit(this.maxForce)
          boids[i].acc.mult(-1).limit(this.maxForce);           
        }
      }
    }
  }

  public flocking = (boids: Boid[]) => {
    this.acc.mult(0);
    const ali = this.align(boids);
    const coh = this.cohesion(boids);
    const sep = this.separation(boids);

    ali.mult(this.alignmentMultiplier);
    coh.mult(this.cohesionMultiplier);
    sep.mult(this.separationMultiplier);

    this.acc.add(ali);
    this.acc.add(coh);
    this.acc.add(sep);
    // this.intersection(boids);
  }

  public edges = (width: number, height: number) => {
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

  public show = (renderer: CanvasRenderer) => {
    renderer.polygon(this.polygon, { fill: "#ffffff" });
  }


  public update = () => {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.polygon = new Polygon(this.createVertices())
    this.polygon.rotate(this.vel.heading() + (Math.PI / 2));

    this.ahead = Vec2.Add(this.pos, this.vel);
    this.ahead.mult(this.maxSeeAhead);
  }
}