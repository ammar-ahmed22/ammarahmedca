import React from "react";
import Snake from "./Snake";


export type Games = "snake";
export type GameMetadata = {
  component: React.ElementType,
  title: string
  description: string,
}

export const games: Record<Games, GameMetadata> = {
  snake: {
    component: Snake,
    title: "Snake",
    description: "The infamous Snake game made popular on Nokia phones in the 2000s."
  }
}