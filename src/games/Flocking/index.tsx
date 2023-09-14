import React from "react";
import Canvas from "../Canvas";
import { CanvasRenderer } from "../utils/canvas";
import { viewport } from "../utils/math";
import { Boid } from "./utils/Boid";
import { Vec2 } from "../utils/vec2";

const Flocking: React.FC = () => {
  const { vh } = viewport();
  const height = vh * 0.8;
  const width = vh * 0.8;

  const flock: Boid[] = [];
  for (let i = 0; i < 500; i++) {
    const pos = Vec2.RandomInteger({ max: new Vec2(width, height)});
    const boid = new Boid(20, 20, { startPos: pos, perceptionRadius: 50, maxForce: 1, sepMult: 1.1, });
    boid.vel = Vec2.Random();
    boid.vel.randScale(1, 4);
    flock.push(boid);
  }

  const handleDraw = (ctx: CanvasRenderingContext2D, renderer: CanvasRenderer, frame: number) => {
    renderer.clear();
    renderer.rect(0, 0, ctx.canvas.width, ctx.canvas.height, { fill: "#000000" })
    for (let i = 0; i < flock.length; i++) {
      flock[i].flocking(flock);
      flock[i].edges(width, height);
      flock[i].update();
      flock[i].show(renderer);
    }
  }

  return (
    <>
      <Canvas 
        height={height}
        width={width}
        onDraw={handleDraw}
      />
    </>
  )
}

export default Flocking;