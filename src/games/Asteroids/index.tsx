import React, { useEffect } from "react";
import Canvas from "../Canvas";
import { CanvasRenderer } from "../utils/canvas";
import { viewport } from "../utils/math";
import { Ship } from "./utils/Ship";
import { Vec2 } from "../utils/vec2";
import { useStateRef } from "../utils/hooks";
import { Asteroid } from "./utils/Asteroid";
import { Bullet } from "./utils/Bullet";
import { randInt } from "../utils/math";

const Asteroids: React.FC = () => {
  const { vh } = viewport();

  const height = vh * 0.8;
  const width = vh * 0.8;
  const ship_size = 20;

  const [ship, setShip] = useStateRef(new Ship(ship_size, ship_size, { startPos: new Vec2(width / 2, height / 2)}));

  const [asteroids, setAsteroids] = useStateRef<Asteroid[]>([])
  const [bullets, setBullets] = useStateRef<Bullet[]>([]);

  for (let i = 0; i < 10; i++) {
    let pos = Vec2.RandomInteger({ min: new Vec2(), max: new Vec2(width, height)});
    const radius = randInt(10, 50);
    let j = 0;
    while (j < i) {
      const dist = Vec2.Distance(asteroids.ref.current[j].pos, pos)
      if (dist < (radius + asteroids.ref.current[j].radius + 10)) {
        pos = Vec2.RandomInteger({ min: new Vec2(), max: new Vec2(width, height)})
        j = 0;
      } else {
        j++
      }
    }
    const ast = new Asteroid({ startPos: pos, radius: radius });
    ast.vel = Vec2.Random();
    ast.vel.setMagnitude(1);
    asteroids.ref.current.push(ast);
  }

  const handleDraw = (ctx: CanvasRenderingContext2D, renderer: CanvasRenderer, frame: number) => {
    renderer.clear();
    renderer.rect(0, 0, ctx.canvas.width, ctx.canvas.height, { fill: "#000000" });
    for (let i = 0; i < asteroids.ref.current.length; i++) {
      asteroids.ref.current[i].edges(width, height);
      asteroids.ref.current[i].update(asteroids.ref.current);
      asteroids.ref.current[i].render(renderer);
    }

    for (let i = 0; i < bullets.ref.current.length; i++) {
      bullets.ref.current[i].update();
      bullets.ref.current[i].render(renderer);

      for (let j = asteroids.ref.current.length - 1; j >= 0; j--) {
        if (bullets.ref.current[i].hit(asteroids.ref.current[j])) {
          const smallAsts = asteroids.ref.current[j].breakup();
          if (smallAsts) {
            asteroids.ref.current.push(...smallAsts);
          }
          asteroids.ref.current.splice(j, 1);
        }
      }
    }

    ship.ref.current.edges(width, height);
    ship.ref.current.update();
    ship.ref.current.render(renderer)
  }

  useEffect(() => {
    const handleKeydown = (ev: KeyboardEvent) => {
      ev.preventDefault();
      const rightCodes = ["ArrowRight", "KeyD"]
      const leftCodes = ["ArrowLeft", "KeyA"]
      const upCodes = ["ArrowUp", "KeyW"]
      const downCodes = ["ArrowDown", "KeyS"];

      if (ev.code === "Space") {
        const s = ship.ref.current;
        const bullet = new Bullet(s.polygon.vertices[2].copy());
        bullet.vel = Vec2.Add(s.vel.copy(), Vec2.FromAngle(ship.ref.current.heading).setMagnitude(2));
        bullets.ref.current.push(bullet)
      }

      if (rightCodes.includes(ev.code)) {
        ship.ref.current.heading += 0.4;
      }

      if (leftCodes.includes(ev.code)) {
        ship.ref.current.heading -= 0.4;
      }

      if (upCodes.includes(ev.code)) {
        ship.ref.current.acc = Vec2.FromAngle(ship.ref.current.heading);
      }

      if (downCodes.includes(ev.code)) {
        ship.ref.current.acc = Vec2.FromAngle(ship.ref.current.heading).mult(-1);
      }
    };
    
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, []) 

  return (
    <>
      <Canvas 
        width={width}
        height={height}
        onDraw={handleDraw}
      />
    </>
  )
}

export default Asteroids;