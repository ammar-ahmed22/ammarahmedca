import { CanvasRenderer } from "@website/games/utils/canvas";
import { DNA } from "./DNA";
import { Missile } from "./Missile";
import { Vec2 } from "@website/games/utils/vec2";
import { randomArray } from "@website/games/utils/math";

export class Population {
  public missiles: Missile[] = [];
  public matingPool: DNA[] = [];
  constructor(
    public size: number,
    public missileParams: ConstructorParameters<typeof Missile>
  ) {
    for (let i = 0; i < this.size; i++) {
      this.missiles.push(new Missile(...missileParams));
    }
  }

  public evaluate = (target: Vec2) => {
    this.matingPool = [];
    let maxFit = 0;
    for (let i = 0; i < this.missiles.length; i++) {
      this.missiles[i].calcFitness(target);
      maxFit = Math.max(this.missiles[i].fitness, maxFit);
    }

    // Normalization
    for (let i = 0; i < this.missiles.length; i++) {
      this.missiles[i].fitness /= maxFit;
    }

    for (let i = 0; i < this.missiles.length; i++) {
      const n = this.missiles[i].fitness * 10;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.missiles[i].dna.copy())
      }
    }
    let successful = 0;
    for (let i = 0; i < this.missiles.length; i++) {
      if (this.missiles[i].completed) {
        successful++;
      }
    }
    return successful;
  }

  public selection = () => {
    this.missiles = [];
    for (let i = 0; i < this.size; i++) {
      const parentA = randomArray(this.matingPool);
      const parentB = randomArray(this.matingPool);
      if (!parentA || !parentB) {
        console.log("UNDEFINED PARENTS", { parentA, parentB });
      }
      const child = parentA.crossover(parentB);
      child.mutation();
      const newMissile = new Missile(this.missileParams[0], this.missileParams[1], child, this.missileParams[3], this.missileParams[4], this.missileParams[5], this.missileParams[6], this.missileParams[7]);
      this.missiles.push(newMissile);
    }

  }

  public run = (renderer: CanvasRenderer, sprite: HTMLImageElement, geneCount: number, deadSprite?: HTMLImageElement, explosionSprites?: HTMLImageElement[]) => {
    for (let i = 0; i < this.missiles.length; i++) {
      const missile = this.missiles[i];
      missile.update(geneCount);
      missile.render(renderer, sprite, deadSprite);
      missile.explosion.update();
      missile.explosion.render(renderer, explosionSprites as HTMLImageElement[]);
    }
  }

  public allDead = () => {
    for (let i = 0; i < this.missiles.length; i++) {
      if (this.missiles[i].completed) continue;
      if (!this.missiles[i].dead) return false;
    }
    return true;
  }
}