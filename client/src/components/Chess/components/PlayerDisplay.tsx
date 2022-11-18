import React from "react";
import { Box, Flex, Text, HStack, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { Piece } from "../game/Pieces/Piece";

interface PieceCount{
  count: number,
  points: number,
  icon: IconType
}

const PlayerDisplay : React.FC<PlayerDisplayProps> = ({ player, takes, takesColor }) => {

  const pieceColors = {
    w: "white",
    b: "black"
  }

  const countPieces = (takes: Piece[]) => {
    const hashMap : Record<string, PieceCount> = {};
    takes.forEach( piece => {

      if (piece.type in hashMap){
        hashMap[piece.type].count += 1;
        hashMap[piece.type].points += piece.points;
      } else {
        hashMap[piece.type] = {
          icon: piece.icon,
          count: 1,
          points: piece.points
        }
      }

    })

    return Object.keys(hashMap).map( key => {
      return {
        type: key,
        ...hashMap[key]
      }
    });
  }

  return (
    <HStack w="calc(8 * 8vh)" >
      <Text fontSize="xl">{player.firstName} {player.lastName}:</Text>
      <HStack spacing={1} >
        {
          countPieces(takes).map( item => {
            return (
              <>
                <Icon as={item.icon} h="1.25rem" w="1.25rem" color={pieceColors[takesColor]} />
                {
                  item.count > 1 && <Text  color="white" fontSize="xs" >x {item.count}</Text>
                }
              </>
            )
          })
        }
      </HStack>
    </HStack>
  )
}


export default PlayerDisplay;