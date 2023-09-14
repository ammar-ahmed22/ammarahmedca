import { Vec2 } from "@website/games/utils/vec2";
import { CanvasRenderer } from "@website/games/utils/canvas";

export class Explosion {
  public frame: number = 0;
  public totalFrames: number = 10;
  public started: boolean = false;
  public complete: boolean = false;
  public pos?: Vec2;
  constructor(
    public width: number,
    public height: number,
  ) {

  }

  public setPos = (v: Vec2) => {
    this.pos = new Vec2(v.x - (this.width / 2), v.y - (this.height / 2));
  }

  public start = () => {
    this.started = true;
  }

  public update = () => {
    if (this.started && this.frame < this.totalFrames) {
      this.frame++;
    }

    if (this.frame === this.totalFrames - 1) {
      this.complete = true;
    }
  }

  public render = (renderer: CanvasRenderer, sprites: HTMLImageElement[]) => {
    if (this.started && this.pos && !this.complete) {
      renderer.image(sprites[this.frame], this.pos.x, this.pos.y, { width: this.width, height: this.height });
    }
  }
}