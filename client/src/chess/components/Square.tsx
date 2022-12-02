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

  const {
    board,
    updateValidMoves,
    validMoves,
    setMoveTo,
    setToMove,
    colorToMove,
    moveMade,
    move,
  } = useContext(GameContext) as IGameContext;

  const [row, col] = indices;

  let renderRank = col === 0;
  let renderFile = row === 7;

  const handleClick = () => {
    console.log(validMoves, !validMoves.length);
    // move piece
    if (isValidMove) {
      setMoveTo({ rank, file });
      return;
    }

    if (piece) {
      // opp color or move already made
      if (piece.color !== colorToMove || moveMade) return;
      const moves = piece.allMoves(rank, file, board, { validOnly: true }); // all valid moves
      if (board.isInCheck(piece.color)) {
        // if check removers returns empty array (CHECKMATE!)
        updateValidMoves(
          board.onlyCheckRemovers(rank, file, piece.color, moves) // filter to only moves that remove check
        );
      } else {
        updateValidMoves(moves);
      }

      setToMove({ rank, file });
      return;
    }

    updateValidMoves([]);
  };

  const renderIndicateMove = () => {
    const Display = ({ color }: { color: string }) => {
      return (
        <Box
          pos="absolute"
          h="100%"
          w="100%"
          bg={color}
          // opacity="0.75"
          zIndex={2}
          // borderColor="green.600"
          // borderStyle="solid"
          // borderWidth="2px"
        />
      );
    };
    if (move.toMove) {
      if (move.toMove.file === file && move.toMove.rank === rank)
        return <Display color="green.500" />;
    }

    if (move.moveTo) {
      if (move.moveTo.file === file && move.moveTo.rank === rank)
        return <Display color="green.300" />;
    }
  };

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
      onClick={handleClick}
      zIndex={1}
    >
      {piece && (
        <Icon
          as={piece.icon}
          color={piece.color === "w" ? "white" : "black"}
          w={"50%"}
          h={"50%"}
          zIndex={3}
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
      {renderIndicateMove()}
    </Flex>
  );
};

export default Square;
