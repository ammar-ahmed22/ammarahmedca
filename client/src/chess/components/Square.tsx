import React, { useContext } from "react";
import { useColorModeValue, Flex, Icon, Text, Box } from "@chakra-ui/react";
import { GameContext } from "../contexts/GameContext";

const Square: React.FC<SquareProps> = ({
  piece,
  size,
  bg,
  id,
  rank,
  file,
  indices,
  isValidMove,
}) => {
  const darkColor = "gray.700";
  const lightColor = useColorModeValue("gray.200", "gray.400");

  const { board, updateValidMoves, validMoves, setMoveTo, setToMove } =
    useContext(GameContext) as IGameContext;

  const [row, col] = indices;

  let renderRank = col === 0;
  let renderFile = row === 7;

  return (
    <Flex
      height={size}
      width={size}
      bg={bg === "dark" ? darkColor : lightColor}
      id={id}
      justify="center"
      align="center"
      position="relative"
      _hover={{
        cursor: "pointer",
      }}
      onClick={() => {
        console.log(validMoves, !validMoves.length);
        if (isValidMove) {
          setMoveTo({ rank, file });
          return;
        }

        if (piece) {
          const moves = piece.allMoves(rank, file, board, { validOnly: true });
          if (board.isInCheck(piece.color)) {
            // if check removers returns empty array (CHECKMATE!)
            updateValidMoves(
              board.onlyCheckRemovers(rank, file, piece.color, moves)
            );
          } else {
            updateValidMoves(moves);
          }

          setToMove({ rank, file });
          return;
        }

        updateValidMoves([]);
      }}
    >
      {piece && (
        <Icon
          as={piece.icon}
          color={piece.color === "w" ? "white" : "black"}
          w={"50%"}
          h={"50%"}
        />
      )}
      {renderRank && (
        <Text position="absolute" left="-2ch" fontWeight="bold" fontSize="lg">
          {rank}
        </Text>
      )}
      {renderFile && (
        <Text position="absolute" bottom="-3ch" fontWeight="bold" fontSize="lg">
          {file.toUpperCase()}
        </Text>
      )}
      {isValidMove && (
        <Box
          position="absolute"
          h={"25%"}
          w={"25%"}
          borderRadius="full"
          bg="yellow.400"
          opacity="0.50"
          borderColor="yellow.600"
          borderStyle="solid"
          borderWidth="2px"
        />
      )}
    </Flex>
  );
};

export default Square;
