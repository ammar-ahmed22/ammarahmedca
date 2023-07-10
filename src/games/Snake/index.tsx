import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  VStack,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button, 
  useDisclosure,
  Kbd
} from "@chakra-ui/react"
import Canvas from "../Canvas";
import { line, clearCanvas, rect } from "../utils/canvas";
import { Vec2 } from "../utils/vec2";
import Game from "./Game";
import type { Reason } from "./Game";

const Snake: React.FC = () => {
  const CELL_SIZE = 20;
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  
  const calcDimensions = (height: number, width: number, cellSize: number) => {
    let rows: number = 0;
    if (height % cellSize === 0) {
      rows = height / cellSize;
    } else {
      rows = (height - (height % cellSize)) / cellSize;
    }
    let cols: number = 0;
    if (width % cellSize === 0) {
      cols = width / cellSize;
    } else {
      cols = (width - (width % cellSize)) / cellSize;
    }

    return {
      rows,
      cols
    }
  }

  const { rows, cols } = calcDimensions(vh * 0.6, vh * 0.6, CELL_SIZE);

  const { isOpen, onClose, onOpen } = useDisclosure()
  const initialRef = useRef(null);

  const [score, setScore] = useState(0);
  const [gameOverMessage, setGameOverMessage] = useState("Game over!");
  const [highscore, setHighscore] = useState(0);
  const [newHS, setNewHS] = useState(false);

  const handleScore = () => {
    setScore(prev => prev + 10);
  } 

  const handleTryAgain = () => {
    onClose();
    setScore(0);
    setNewHS(false);
  }

  const handleGameOver = (reason?: Reason) => {
    onOpen();
    
    if (reason) {
      if (reason === "self") {
        setGameOverMessage("You ran into yourself!")
      } else {
        setGameOverMessage("You went out of bounds!")
      }
    }
  }

  useEffect(() => {
    const local = localStorage.getItem("snake-highscore");
    if (local) {
      setHighscore(parseInt(local));
    } else {
      setHighscore(0);
    }
  }, [])

  useEffect(() => {
    if (score > highscore) {
      setHighscore(score);
      localStorage.setItem("snake-highscore", score.toString());
      setNewHS(true);
    }
  }, [score, highscore])
  
  return (
    <>
      <VStack alignItems="center" mt="3" w="100%" >
        <HStack w={(rows * CELL_SIZE) + "px"} justify="space-between" >
          <Text>Score: {score}</Text>
          <Text>High Score: {highscore}</Text>
        </HStack>
        <Game rows={rows} cols={cols} cellSize={CELL_SIZE} onGameOver={handleGameOver} onScore={handleScore} />
        <VStack alignItems="flex-start" w={(rows * CELL_SIZE) + "px"} >
          <Text variant="gradient" as="h2" fontFamily="heading" fontWeight="bold" fontSize="xl" >Controls</Text>
          <Text>Press <Kbd>space</Kbd> to start</Text>
          <Text>Use <Kbd>arrow keys</Kbd> or <Kbd>WASD</Kbd> to control the snake.</Text>
        </VStack>
        <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} isCentered >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center" >Game Over :{"("}</ModalHeader>
            <ModalBody textAlign="center" >
              <Text>{gameOverMessage}</Text>
              <Text>Score: {score}</Text>
              {newHS && <Text>New high score!</Text>}
            </ModalBody>
            <ModalFooter>
              <Button mr="3" variant="ghost">Back to Arcade</Button>
              <Button colorScheme="brand.purple" ref={initialRef} onClick={handleTryAgain} >Try Again?</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </>
  )
}

export default Snake;