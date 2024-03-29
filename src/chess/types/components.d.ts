import { StackProps } from "@chakra-ui/react";
import { Piece } from "../game/Pieces/Piece";

declare global {
  interface SquareProps {
    piece?: Piece;
    size: string;
    bg: "dark" | "light";
    id?: string;
    rank: number;
    file: string;
    indices: [number, number];
    isValidMove: boolean;
    isDisplayOnly?: boolean;
  }

  interface TakesDisplayProps {
    takes: Piece[];
    color: "w" | "b";
    size: string;
    position: "left" | "right";
    containerProps?: StackProps;
  }

  interface FakePlayer {
    firstName: string;
    lastName: string;
  }

  interface PlayerDisplayProps {
    player: "user" | "opponent";
    color: "w" | "b";
    containerProps?: StackProps;
  }
}
