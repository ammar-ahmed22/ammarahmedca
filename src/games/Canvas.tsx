import React, { useRef, useEffect } from "react";
import { CanvasRenderer } from "./utils/canvas";

type CanvasProps = {
  onDraw?: (ctx: CanvasRenderingContext2D, renderer: CanvasRenderer, frame: number) => void,
  height?: number,
  width?: number,
  fps?: number
}

const Canvas: React.FC<CanvasProps> = ({
  onDraw = (ctx, frame) => {},
  height = 100,
  width = 100,
  fps = 30
}) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const renderer = new CanvasRenderer(context);

    let frame = 0
    let animID: number;
    let fpsInterval = 1000 / fps;
    let then = window.performance.now();
    let startTime = then;
    let now, elapsed;

    const render = (dt: number = 0) => {

      frame++
      onDraw(context, renderer, frame);
      animID = window.requestAnimationFrame(render);
      // animID = window.requestAnimationFrame(render);
      // now = dt;
      // elapsed = now - then;
      // if (elapsed > fpsInterval) {
      //   then = now - (elapsed % fpsInterval)
      //   frame++
      //   onDraw(context, frame);
      // }
      // if (fps) {
      //   setTimeout(() => {
      //     animID = window.requestAnimationFrame(render);
      //   }, 1000 / fps)
      // } else {
      //   animID = window.requestAnimationFrame(render);
      // }
      
    }

    render()

    return () => {
      window.cancelAnimationFrame(animID)
    }
  }, [onDraw, width, height])

  return (
    <canvas ref={canvasRef} height={height} width={width} />
  )
}

export default Canvas;