import { Vec2 } from "@website/games/utils/vec2";
import { Polygon } from "@website/games/utils/polygon";
import { Hankin } from "./Hankin";
import { CanvasRenderer } from "@website/games/utils/canvas";

export class HankinPolygon extends Polygon {
  public hankins: Hankin[][] = []
  constructor(
    vertices?: Vec2[]
  ) {
    super(vertices);

    if (this.hasEdges) {
      for (let i = 0; i < this.edges.length; i++) {
        const edge = this.edges[i];
        const mid = Vec2.Add(edge.a.copy(), edge.b.copy()).mult(0.5);
        const v1 = Vec2.Subtract(mid, edge.a);
        const v2 = Vec2.Subtract(mid, edge.b);
        v1.normalize();
        v2.normalize();
        const h1 = new Hankin(mid, v1);
        const h2 = new Hankin(mid, v2);
        this.hankins.push([h1, h2])
      }
    }
  }

  get hasHankins() {
    return this.hankins.length > 0;
  }

  addDelta = (delta: number) => {
    if (!this.hasEdges || !this.hasHankins || delta <= 0) {
      return;
    }
    for (let i = 0; i < this.edges.length; i++) {
      const edge = this.edges[i];
      const mid = Vec2.Add(edge.a.copy(), edge.b.copy()).mult(0.5);
      const v1 = Vec2.Subtract(mid, edge.a);
      const v2 = Vec2.Subtract(mid, edge.b);
      v1.setMagnitude(delta);
      v2.setMagnitude(delta);
      const offset1 = Vec2.Add(mid, v2);
      const offset2 = Vec2.Add(mid, v1);
      v1.normalize();
      v2.normalize();
      const h1 = new Hankin(offset1, v1);
      const h2 = new Hankin(offset2, v2);
      
      this.hankins[i] = [h1, h2];
    }
  }

  rotateHankins = (angle: number, opts?: { degrees: boolean }) => {
    if (!this.hasHankins) {
      console.log("No hankins!!");
      return;
    }
    for (let i = 0; i < this.hankins.length; i++) {
      const [h1, h2] = this.hankins[i];
      h1.rotate(-angle, opts);
      h2.rotate(angle, opts);
    }
  }

  renderHankins = (renderer: CanvasRenderer, color: string, width: number) => {
    for (let i = 0; i < this.hankins.length; i++) {
      for (let j = 0; j < this.hankins[i].length; j++) {
        this.hankins[i][j].render(renderer, color, width);
      }
    }
  }

  findHankinIntersections = () => {
    if (!this.hasHankins) {
      console.log("no hankins!!");
      return;
    }
    for (let i = 0; i < this.hankins.length; i++) {
      const [h1, h2] = this.hankins[i];
      for (let j = 0; j < this.hankins.length; j++) {
        if (i !== j) {
          const edge = this.hankins[j];
          h1.findIntersection(edge[0]);
          h1.findIntersection(edge[1]);
          h2.findIntersection(edge[0]);
          h2.findIntersection(edge[1]);
        }
      }
    }
  }

  createPolygonFromHankins = () => {
    if (!this.hasHankins) {
      console.log("no hankins!!");
      return;
    }
    const vertices: Vec2[] = [];
    for (let i = 0; i < this.hankins.length; i++) {
      const [h1, h2] = this.hankins[i];
      vertices.push(h1.start.copy());
      if (h2.intersection) {
        vertices.push(h2.intersection.copy());
      }
    }

    return new Polygon(vertices);
  }
 
  static fromPolygon = (poly: Polygon) => {
    return new HankinPolygon(poly.vertices);
  }
}
