import { Vec2 } from "./vec2";
import { Polygon } from "./polygon";

export type FillStrokeOpts = {
  fill?: string,
  stroke?: string
}

export type LineOpts = {
  from: Vec2,
  to: Vec2,
  color?: string,
  width?: number
}

export type ImageOpts = {
  maintainAspect?: boolean,
  scalingFactor?: number,
  scaleX?: number,
  scaleY?: number,
  width?: number,
  height?: number,
  rotation?: number
}

export class CanvasRenderer{
  constructor(
    public ctx: CanvasRenderingContext2D
  ){}

  public clear = () => {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  public rect = (
    x: number,
    y: number,
    width: number,
    height: number,
    { fill, stroke } : FillStrokeOpts  
  ) => {
    if (fill) this.ctx.fillStyle = fill;
    if (stroke) this.ctx.strokeStyle = stroke;
    if (fill && stroke) {
      this.ctx.fillRect(x, y, width, height);
      this.ctx.strokeRect(x, y, width, height);
    } else if (fill) {
      this.ctx.fillRect(x, y, width, height);
    } else if (stroke) {
      this.ctx.strokeRect(x, y, width, height);
    } else {
      this.ctx.fillStyle = "#000000";
      this.ctx.fillRect(x, y, width, height);
    }
  }

  public line = ({ from, to, color = "#000000", width=1}: LineOpts) => {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(to.x, to.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  public circle = (
    x: number,
    y: number,
    radius: number,
    startAngle: number = 0,
    endAngle: number = 2 * Math.PI,
    { fill, stroke }: FillStrokeOpts
  ) => {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, startAngle, endAngle);
    if (fill) {
      this.ctx.fillStyle = fill
      this.ctx.fill()
    }

    if (stroke) {
      this.ctx.strokeStyle = stroke
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }

  public image = (
    image: CanvasImageSource,
    x: number,
    y: number,
    opts?: ImageOpts
  ) => {
    const { height, width } = image;
    if (opts?.maintainAspect && opts?.scalingFactor) {
      this.ctx.drawImage(image, x, y, (width as number) * opts.scalingFactor, (height as number) * opts.scalingFactor);
      return;
    }
    let scaledX = width as number;
    let scaledY = height as number;
    if (opts?.scaleX) {
      scaledX *= opts.scaleX
    }

    if (opts?.scaleY) {
      scaledY *= opts.scaleY;
    }

    if (opts?.width && !opts.height && opts.maintainAspect) {
      scaledX = opts.width;
      scaledY = (opts.width / (width as number)) * (height as number)
    }

    if (opts?.height && !opts.width && opts.maintainAspect) {
      scaledY = opts.height;
      scaledX = (opts.height / (height as number)) * (width as number);
    }

    if (opts?.height && opts?.width) {
      scaledX = opts.width;
      scaledY = opts.height;
    }

    if (opts?.rotation) {
      this.ctx.setTransform(1, 0, 0, 1, x, y);
      this.ctx.rotate(opts.rotation);
      const cx = x + (scaledX / 2);
      const cy = y + (scaledY / 2);
      this.ctx.drawImage(image, -scaledX / 2, -scaledY / 2, scaledX, scaledY);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      return;
    }

    this.ctx.drawImage(image, x, y, scaledX, scaledY);
  }

  public polygon = (poly: Polygon, opts: FillStrokeOpts) => {
    
    this.ctx.beginPath();
    this.ctx.moveTo(poly.vertices[0].x, poly.vertices[0].y);
    for (let i = 1; i < poly.vertices.length; i++) {
      const pt = poly.vertices[i];
      this.ctx.lineTo(pt.x, pt.y);
    }
    this.ctx.closePath();
    if (opts.fill) {
      this.ctx.fillStyle = opts.fill;
      this.ctx.fill();
    }
    if (opts.stroke) {
      this.ctx.strokeStyle = opts.stroke;
      this.ctx.stroke();
    }

  }

  public polygonPoints = (poly: Polygon, opts: FillStrokeOpts) => {
    for (let i = 0; i < poly.vertices.length; i++) {
      const pt = poly.vertices[i];
      this.circle(pt.x, pt.y, 1, 0, Math.PI * 2, opts);
    }
  }

  
}



export const clearCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export const rect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, { fill, stroke }: FillStrokeOpts ) => {
  if (fill) ctx.fillStyle = fill;
  if (stroke) ctx.strokeStyle = stroke;
  if (fill && stroke) {
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
  } else if (fill) {
    ctx.fillRect(x, y, width, height);
  } else if (stroke) {
    ctx.strokeRect(x, y, width, height);
  } else {
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, width, height);
  }
}

export const line = (ctx: CanvasRenderingContext2D, { from, to, color = "#000000", width=1}: LineOpts) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}