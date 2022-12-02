import React, { useContext, useState, useRef } from "react";
import {
  Button,
  HStack,
  IconButton,
  Tooltip,
  TooltipProps,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FaRedoAlt, FaPaperPlane } from "react-icons/fa";
import { GameContext } from "../contexts/GameContext";
import { Board } from "../game/Board";
import { Piece } from "../game/Pieces/Piece";
import { fileToNumber, algebraic } from "../game/utils";

const Controls: React.FC = () => {
  const { moveMade, reset, game, move } = useContext(
    GameContext
  ) as IGameContext;
  const [pieceMoved, setPieceMoved] = useState<Piece>();
  const resetRef = useRef(null);

  const tooltipProps: Omit<TooltipProps, "children" | "label" | "isDisabled"> =
    {
      hasArrow: true,
      placement: "bottom",
      bg: useColorModeValue("gray.700", "gray.200"),
      color: useColorModeValue("gray.100", "gray.800"),
      p: 3,
      borderRadius: "md",
      gutter: 15,
      fontWeight: "bold",
      fontSize: "sm",
    };

  const confirmModal = useDisclosure();

  const latestMove = game.moves[game.moves.length - 1];

  const getMovedPiece = (): Piece => {
    if (!move.toMove || !move.moveTo)
      throw new Error("Move must be made prior to getting move data.");
    const helperBoard = new Board(latestMove.fen);
    const piece = helperBoard.getPiece(
      move.toMove.rank,
      fileToNumber(move.toMove.file)
    );

    if (!piece) throw new Error("Something is really wrong cronem.");

    return piece;
  };

  return (
    <HStack>
      <Tooltip {...tooltipProps} label="Reset Move" isDisabled={!moveMade}>
        <IconButton
          aria-label="re-do"
          icon={<FaRedoAlt />}
          variant="ghost"
          isDisabled={!moveMade}
          onClick={reset}
          size="sm"
          ref={resetRef}
        />
      </Tooltip>
      <Tooltip {...tooltipProps} label="Send Move" isDisabled={!moveMade}>
        <IconButton
          aria-label="send"
          icon={<FaPaperPlane />}
          variant="ghost"
          isDisabled={!moveMade}
          size="sm"
          onClick={() => {
            setPieceMoved(getMovedPiece());
            confirmModal.onOpen();
          }}
        />
      </Tooltip>
      <Modal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.onClose}
        finalFocusRef={resetRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Confirm your move.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {pieceMoved && move.moveTo && move.toMove && (
              <Text align="center" fontSize="xl" mb="3">
                <Icon
                  as={pieceMoved.icon}
                  color="gray.500"
                  verticalAlign="top"
                  boxSize="1.25em"
                />{" "}
                {algebraic(move.toMove)} {"->"} {algebraic(move.moveTo)}
              </Text>
            )}
            <Text align="center">Are you sure you want to send this move?</Text>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button onClick={confirmModal.onClose} mr={3}>
              Cancel
            </Button>
            <Button variant="gradient">Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default Controls;
