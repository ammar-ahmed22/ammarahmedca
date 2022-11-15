import React from "react";
import { useColorModeValue, Flex, Icon } from "@chakra-ui/react";
import { Piece } from "../game/Pieces/Piece";

interface SquareProps{
  piece?: Piece
  size: string,
  bg: "dark" | "light",
  id?: string
  rank: number,
  file: string
}
const Square : React.FC<SquareProps> = ({ piece, size, bg, id, rank, file }) => {

  const darkColor = "gray.700"
  const lightColor = useColorModeValue("gray.200", "gray.400")

  if (file === "a" || file === "h"){

  }

  return (
    <Flex 
      height={size} 
      width={size} 
      bg={bg === "dark" ? darkColor : lightColor} 
      id={id}
      justify="center"
      align="center"
    >
      {
        piece && <Icon as={piece.icon} color={piece.color === "w" ? "white" : "black"} w={"50%"} h={"50%"} />
      }
    </Flex>
  )

}

export default Square
