import React, { useContext } from "react";
import {
  Box,
  Text,
  HStack,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import type { IconType } from "react-icons";
import { Piece } from "../game/Pieces/Piece";
import { GameContext } from "../contexts/GameContext";

interface PieceCount {
  count: number;
  points: number;
  icon: IconType;
}

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({
  player,
  takes,
  takesColor,
  containerProps,
}) => {
  const { squareSize } = useContext(GameContext) as IGameContext;

  const pieceColors = {
    w: "gray.500",
    b: "gray.500",
  };

  const countPieces = (takes: Piece[]) => {
    const hashMap: Record<string, PieceCount> = {};
    takes.forEach((piece) => {
      if (piece.type in hashMap) {
        hashMap[piece.type].count += 1;
        hashMap[piece.type].points += piece.points;
      } else {
        hashMap[piece.type] = {
          icon: piece.icon,
          count: 1,
          points: piece.points,
        };
      }
    });

    return Object.keys(hashMap).map((key) => {
      return {
        type: key,
        ...hashMap[key],
      };
    });
  };

  const totalPoints = (takes: Piece[]) => {
    let sum = 0;
    takes.forEach((piece) => {
      sum += piece.points;
    });

    return sum;
  };

  const renderStatHelpText = (
    takes: { w: Piece[]; b: Piece[] },
    takesColor: "w" | "b"
  ) => {
    const oppTakesColor = takesColor === "w" ? "b" : "w";
    const diff =
      totalPoints(takes[takesColor]) - totalPoints(takes[oppTakesColor]);

    if (diff !== 0) {
      return (
        <>
          <StatArrow type={diff > 0 ? "increase" : "decrease"} />
          {diff}
        </>
      );
    }
  };

  return (
    <HStack w={`calc(8 * ${squareSize})`} {...containerProps}>
      <Box>
        <Text fontSize="lg">
          {player.firstName} {player.lastName}
        </Text>
        <Stat>
          <HStack>
            <StatLabel>Points</StatLabel>
            <StatNumber fontSize="sm">
              {totalPoints(takes[takesColor])}
            </StatNumber>
            <StatHelpText>{renderStatHelpText(takes, takesColor)}</StatHelpText>
          </HStack>
        </Stat>
      </Box>
      <HStack spacing={2}>
        {countPieces(takes[takesColor]).map((item, idx) => {
          const key = `piece-${takesColor}-${idx}`;
          return (
            <HStack pos="relative" spacing={1} key={key}>
              <Icon
                as={item.icon}
                h="1.25rem"
                w="1.25rem"
                color={pieceColors[takesColor]}
                zIndex={item.count}
              />
              {item.count > 1 && <Text fontSize="sm">x {item.count}</Text>}
            </HStack>
          );
        })}
      </HStack>
    </HStack>
  );
};

export default PlayerDisplay;
