import { Vec2 } from "./vec2";
import { Edge } from "./edge";
import { CanvasRenderer, FillStrokeOpts } from "./canvas";

type RenderOpts = {
  renderEdges?: boolean,
  edgeColor?: string,
  edgeWidth?: number
}

export class Polygon {
  public vertices: Vec2[];
  public edges: Edge[] = [];
  // public hasEdges: boolean = false;

  get hasEdges() {
    return this.edges.length > 0
  }

  constructor(
    vertices: Vec2[] = []
  ) {
    this.vertices = vertices;
    this.createEdges();
  }

  public createEdges = () => {
    if (this.vertices.length < 2) {
      this.edges = []
      return;
    }

    this.edges = []
    for (let i = 0; i < this.vertices.length; i++) {
      const a = this.vertices[i].copy();
      const b = ((i + 1 < this.vertices.length) ? this.vertices[i + 1] : this.vertices[0]).copy();
      this.edges.push(new Edge(a, b))
    }
  }

  public render = (renderer: CanvasRenderer, fillStrokeOpts: FillStrokeOpts, opts?: RenderOpts) => {
    if (opts?.renderEdges && this.hasEdges) {
      for (let i = 0; i < this.edges.length; i++) {
        this.edges[i].render(renderer, opts.edgeColor, opts.edgeWidth)
      }
    } else {
      renderer.polygon(this, fillStrokeOpts)
    }
  }

  public rotate = (angle: number) => {
    const rPt = this.vertices[0];
    for (let i = 0; i < this.vertices.length; i++) {
      this.vertices[i] = Vec2.RotateAbout(rPt, this.vertices[i], angle);
    }
  }

  static doIntersect = (a: Polygon, b: Polygon) => {
    const polygons = [a, b];
    let minA, maxA, projected, minB, maxB;
    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i];
      for (let i1 = 0; i1 < polygon.vertices.length; i1++) {
        const i2 = (i1 + 1) % polygon.vertices.length;
        const p1 = polygon.vertices[i1];
        const p2 = polygon.vertices[i2];

        const normal = new Vec2(p2.y - p1.y, p1.x - p2.x);
        minA = maxA = undefined;
        for (let j = 0; j < a.vertices.length; j++) {
          projected = normal.x * a.vertices[j].x + normal.y * a.vertices[j].y;
          if (minA === undefined || projected < minA) {
            minA = projected;
          }

          if (maxA === undefined || projected > maxA) {
            maxA = projected;
          }
        }

        minB = maxB = undefined;
        for (let j = 0; j < b.vertices.length; j++) {
          projected = normal.x * b.vertices[j].x + normal.y * b.vertices[j].y;
          if (minB === undefined || projected < minB) {
            minB = projected;
          }

          if (maxB === undefined || projected > maxB) {
            maxB = projected;
          }
        }

        if (maxA && maxB && minB && minA && (maxA < minB || maxB < minA)) {
          return false;
        }
      }
    }

    return true;
  }

  



  static fromRectangle = (x: number, y: number, width: number, height: number) => {
    const poly = new Polygon();
    // top-left
    poly.vertices.push(new Vec2(x, y))
    // top-right
    poly.vertices.push(new Vec2(x + width, y));
    // bottom-right
    poly.vertices.push(new Vec2(x + width, y + height));
    // bottom-left
    poly.vertices.push(new Vec2(x, y + height));

    poly.createEdges();
    return poly;
  }

  static isPointInside = (point: Vec2, poly: Polygon) => {
    let inside = false;
    for (let i = 0, j = poly.vertices.length - 1; i < poly.vertices.length; j = i++) {
      const pti = poly.vertices[i];
      const ptj = poly.vertices[j];
      const intersect = ((pti.y > point.y) !== (ptj.y > point.y)) && (point.x < (ptj.x - pti.x) * (point.x - pti.y) / (ptj.y - pti.y) + pti.x);
      if (intersect) inside = !inside;
    }

    return inside;
  }

  static checkIntersection = (a: Polygon, b: Polygon) => {
    for (let i = 0; i < a.vertices.length; i++) {
      if (Polygon.isPointInside(a.vertices[i], b)) return true;
    }

    return false;
  }

  static fromNSided = (sides: number, x: number, y: number, r: number, opts?: { invert: boolean }) => {
    const vertices: Vec2[] = [];
    const center = new Vec2(x, y);
    const angle = 360 / sides;
    const invert = opts?.invert
    for (let i = 0; i < sides; i++) {
      const newPoint = Vec2.RotateAbout(center, new Vec2(x, y + (invert ? -r : r)), angle - (angle * i), { degrees: true }).sub(new Vec2(0, invert ? -r : r));
      vertices.push(newPoint);
    }

    return new Polygon(vertices);
  }

  static fromHexagon = (x: number, y: number, r: number) => {
    const vertices: Vec2[] = []
    const center = new Vec2(x, y);
    for (let i = 0; i < 6; i++) {
      const newPoint = Vec2.RotateAbout(center, new Vec2(x, y + r), 30 - (60 * i), { degrees: true }).sub(new Vec2(0, r));
      vertices.push(newPoint);
    }
    return new Polygon(vertices);
  }

  static fromTriangle = (x: number, y: number, r: number, opts?: { invert: boolean }) => {
    const vertices: Vec2[] = [];
    const center = new Vec2(x, y);
    let invert = opts?.invert
    for (let i = 0; i < 3; i++) {
      const newPoint = Vec2.RotateAbout(center, new Vec2(x, y + (invert ? -r : r)), 120 - (120 * i), { degrees: true }).sub(new Vec2(0, invert ? -r : r));
      vertices.push(newPoint);
    }
    return new Polygon(vertices);
  }

}