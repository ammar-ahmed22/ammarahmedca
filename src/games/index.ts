import React from "react";
import Snake from "./Snake";
import CirclePacking from "./CirclePacking";
import GeneticMissiles from "./GeneticMissiles";
import Flocking from "./Flocking";
import Asteroids from "./Asteroids";
import IslamicStarPattern from "./IslamicStarPatterns";

export type Games = "snake" | "circle-packing" | "genetic-missiles" | "flocking" | "asteroids" | "islamic-star-pattern";
export type GameMetadata = {
  component: React.ElementType,
  title: string
  description: string,
  tags?: string[]
}

export const games: Record<Games, GameMetadata> = {
  snake: {
    component: Snake,
    title: "Snake",
    description: "The infamous Snake game made popular on Nokia phones in the 2000s.",
    tags: ["Game", "Retro"]
  },
  "circle-packing": {
    component: CirclePacking,
    title: "Circle Packing",
    description: "Packs randomly placed and sized circles to generate a provided image",
    tags: ["Simulation", "Art"]
  },
  "genetic-missiles": {
    component: GeneticMissiles,
    title: "Genetic Missiles",
    description: "Genetic algorithm simulation (meta-heuristics). Survival of the fittest in action.",
    tags: ["Simulation"]
  },
  "flocking": {
    component: Flocking,
    title: "Flocking",
    description: "Simulation of flocking behavior found in schools of fish.",
    tags: ["Simulation"]
  },
  "asteroids": {
    component: Asteroids,
    title: "Asteroids",
    description: "Retro asteroids game. Evade asteroids and shoot them to break them up.",
    tags: ["Game", "Retro"]
  },
  "islamic-star-pattern": {
    component: IslamicStarPattern,
    title: "Islamic Star Pattern",
    description: "Algorithmically generating polygon tiling patterns made popular by Islamic algebraic art.",
    tags: ["Simulation", "Art"]
  }
}

export const allTags = Object.values(games).flatMap( game => {
  return game.tags;
}).filter( s => s) as string[]