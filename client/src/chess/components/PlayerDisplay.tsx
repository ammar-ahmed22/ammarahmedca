import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_ID, GetUserById } from "../graphql/queries/GetUserById";
import { Pawn, Rook, Knight, Queen, Bishop } from "../game/Pieces";
import Controls from "./Controls";

interface PieceCount {
  count: number;
  points: number;
  icon: IconType;
}

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({
  player,
  color,
  containerProps,
}) => {
  const { squareSize, opponentMetadata, whiteTakes, blackTakes } = useContext(
    GameContext
  ) as IGameContext;
  const { user } = useContext(AuthContext) as AuthContextType;
  const [getOpp] = useLazyQuery<GetUserById.Response, GetUserById.Variables>(
    GET_USER_BY_ID
  );
  const [opponent, setOpponent] = useState<User>();

  // console.log(opponentMetadata);

  useEffect(() => {
    if (player === "opponent" && opponentMetadata.id) {
      getOpp({
        variables: { userId: opponentMetadata.id },
        onCompleted: (data) => setOpponent(data.getUserByID),
      });
    }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log(opponent);
  // }, [opponent])

  // useEffect(() => {
  //   if (player === "opponent") {
  //     if (!loading && data) {
  //       setOpponent(data.getUserById);
  //     }
  //   }
  // }, [ data, loading, error]);

  const pieceColors = {
    w: "gray.500",
    b: "gray.500",
  };

  const takes = {
    w: [new Pawn("b"), new Rook("b"), new Bishop("b"), new Knight("b")],
    b: [new Pawn("b"), new Rook("b"), new Bishop("b"), new Knight("b")],
  };

  const takesColor = color === "w" ? "b" : "w";

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
    <HStack
      w={`calc(8 * ${squareSize})`}
      {...containerProps}
      justify={player === "user" ? "space-between" : "initial"}
    >
      <Box>
        <Text fontSize="lg">
          {player === "user" && `${user.firstName} ${user.lastName}`}
          {player === "opponent" &&
            opponent &&
            `${opponent.firstName} ${opponent.lastName}`}
          {player === "opponent" && !opponent && "Loading..."}
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
      {player === "user" && <Controls />}
    </HStack>
  );
};

export default PlayerDisplay;
