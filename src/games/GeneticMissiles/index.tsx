import React, { useRef, useState } from "react";
import Canvas from "../Canvas";
import { useStateRef, useImage } from "../utils/hooks";
import { Text, HStack, Box, VStack, TextProps } from "@chakra-ui/react";
import { Population } from "./utils/Population";
import { CanvasRenderer } from "../utils/canvas";
import { viewport } from "../utils/math";
import { Vec2 } from "../utils/vec2";
import { Polygon } from "../utils/polygon";
import missile from "./assets/missile-sprite.png";
import missileDead from "./assets/missile-dead.png";
import { explosion_sources } from "./assets/explosion";
import targetImage from "./assets/target.png";
import sky from "./assets/sky.jpeg";
import skyscr1 from "./assets/skyscrapers/skyscrapers1.png";
import skyscr2 from "./assets/skyscrapers/skyscrapers2.png";

const SmartFish: React.FC = () => {
  const { vh } = viewport();
  const width = 640 - 32;

  const ASPECT_RATIO = 625 / 291;
  const SKYSCR_AR = 123 / 62;
  const missileSize = new Vec2(20, 20 * ASPECT_RATIO);
  const height = vh * 0.6;
  const targetSize = 40;
  const sprite = useImage(missile);
  const dead = useImage(missileDead);
  const explosions = useImage(explosion_sources);
  const startPos = useRef(new Vec2(missileSize.y + 25, height / 2))
  const target = new Vec2(width - (targetSize * 2) - 10, height / 2);
  const targetImg = useImage(targetImage);
  const skyImg = useImage(sky);
  const skyScrapers = useImage([skyscr1, skyscr2]);
  const lifespan = 500;
  const [geneCount, setGeneCount] = useStateRef(0);

  const bounds = {
    min: new Vec2(),
    max: new Vec2(width, height)
  }
  

  const obstacles: { pos: Vec2, size: Vec2}[] = [
    {
      pos: new Vec2(width / 4, height - 200),
      size: new Vec2(200 / SKYSCR_AR, 200)
    },
    {
      pos: new Vec2((width / 4) + (200 / SKYSCR_AR) + 20, height - 300),
      size: new Vec2(200 / SKYSCR_AR, 300)
    },
  ]

  const [pop, setPop] = useStateRef(new Population(25, [missileSize.x, missileSize.y, lifespan, bounds, target, startPos.current, obstacles, targetSize]))
  const [successful, setSuccessful] = useState(0);
  const [generation, setGeneration] = useState(0);

  const textStyles: Record<string, TextProps> = {
    bold: {
      as: "span",
      fontWeight: "bold"
    }
  }

  const handleDraw = (ctx: CanvasRenderingContext2D, renderer: CanvasRenderer, frame: number) => {
    renderer.clear();
    if (skyImg.current) {
      renderer.image(skyImg.current, 0, 0, { width: ctx.canvas.width, height: ctx.canvas.height })
    } else {
      renderer.rect(0, 0, ctx.canvas.width, ctx.canvas.height, { fill: "#000000" });
    }
    if (targetImg.current) {
      renderer.image(targetImg.current, target.x - (targetSize), target.y - (targetSize), { width: targetSize * 2, height: targetSize * 2 });
    } else {
      renderer.circle(target.x, target.y, 40, 0, 2 * Math.PI, { fill: "#00ff00" });
    }
    

    for (let i = 0; i < obstacles.length; i++) {
      const { pos, size } = obstacles[i]
      if (!!skyScrapers.current.length) {
        renderer.image(skyScrapers.current[i], pos.x, pos.y, { width: size.x, height: size.y });
      } else {
        renderer.polygon(Polygon.fromRectangle(pos.x, pos.y, size.x, size.y), { fill: "#ff0000" });
      }
    }

    if (!!sprite.current) {
      pop.ref.current.run(renderer, sprite.current, geneCount.ref.current, dead.current, explosions.current);
      setGeneCount(prev => prev + 1);
      if (geneCount.ref.current === lifespan || pop.ref.current.allDead()) {
        const success = pop.ref.current.evaluate(target);
        pop.ref.current.selection();
        setSuccessful(success);
        setGeneCount(0);
        setGeneration(prev => prev + 1);
      }
    }
  }


  return (
    <>
      <Box height={5} />
      <HStack justifyContent="space-between" w={width + "px"} pos="absolute" p="2" fontWeight="bold" >
        <Text ><Text as="span" variant="gradient">On Target in Last Generation:</Text> {successful}</Text>
        <Text><Text as="span" variant="gradient">Generation Count:</Text> {generation}</Text>
        <Text><Text as="span" variant="gradient">Population Size:</Text> {25}</Text>
      </HStack>
      <Canvas 
        width={width}
        height={height}
        onDraw={handleDraw}
      />
      <Box w={width + "px"} h="3vh" pos="relative">
        <Box 
          w={`${(geneCount.state / lifespan) * 100}%`}
          h="100%"
          pos="absolute"
          top="50%"
          transform="translate(0, -50%)"
          bg="brand.purple.500"
        />
      </Box>
      <VStack alignItems="flex-start">
        <Text
          fontFamily="heading"
          fontSize="3xl"
          variant="gradient"
        >What is this?</Text>
        <Text>
          In short, this is an "evolution" simulator. In computer science terms, this would be classified as a meta-heuristics algorithm simulation or, in other words, a genetic algorithm simulation.
        </Text>
        <Text>
          To put it simply, this algorithm simulation displays "survival of the fittest" in a simplified manner.
        </Text>
        <Text
          fontFamily="heading"
          fontSize="3xl"
          variant="gradient"
        >How does it work?</Text>
        <Text>
          We have a population of <Text {...textStyles.bold}>Missiles</Text> which have some randomly generated <Text {...textStyles.bold} >DNA</Text>. This <Text {...textStyles.bold}>DNA</Text> contains a randomly generated list of <Text {...textStyles.bold}>Vectors</Text> representing the thrust force's that will be applied to that <Text {...textStyles.bold}>Missile</Text>.
        </Text>
        <Text>
          On each run of a population (generation), the missiles have their DNA thrust forces applied to them and at the end of their journey, the distance to the target is calculated. From this, a fitness value is calulated (higher if it is closer to the target, lower if further away). Once the entire population has completed, a new generation is created by choosing 2 parents and crossing over their DNA (with some probability of mutation) to create a child which is added to the new population. Missiles with higher fitness values have a higher chance of being selected as parents multiple times.  
        </Text>
        <Text>
          From this, over many generations, the missiles get more accurate. 
        </Text>
      </VStack>
    </>
  )
};

export default SmartFish;