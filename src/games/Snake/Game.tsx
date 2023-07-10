import React, { useState, useEffect } from "react";
import { VStack, Box, HStack, Text } from "@chakra-ui/react";
import { Cell } from "./utils/Cell";
import { Vec2 } from "../utils/vec2";
import GridCell from "./GridCell";

export type Reason = "self" | "bounds" | undefined;
type GameProps = {
  rows: number,
  cols: number,
  cellSize: number,
  onGameOver?: (reason?: Reason) => void,
  onScore?: () => void
}


const Game: React.FC<GameProps> = ({ rows, cols, cellSize, onGameOver = () => {}, onScore = () => {} }) => {
  
  const [grid, setGrid] = useState<Cell[][]>([]);

  const createKey = (prefix: string, id: string | number) => {
    return prefix + id;
  }

  // Creates an empty grid
  const initGrid = (row: number, cols: number, cellSize: number): Cell[][] => {
    const result: Cell[][] = []
    for (let i = 0; i < row; i++){
      let temp: Cell[] = []
      for (let j = 0; j < cols; j++){
        temp.push(
          new Cell(
            new Vec2(j, i),
            "empty",
            cellSize
          )
        )
      }
      result.push(temp); 
    }

    return result;
  }

  useEffect(() => {
    // Empty grid for initial render
    setGrid(initGrid(rows, cols, cellSize));

    // Variables
    let snake: Vec2[] = [];
    const snakeLen = 5;
    let dir: "r" | "l" | "u" | "d" = "r"
    let gameStarted = false;
    let gameOver = false;
    let callCount = 0;
    const bounds = {
      min: new Vec2(),
      max: new Vec2(cols, rows)
    }
    let food: Vec2;
    let deathReason: Reason;

    // Keypress handling
    window.addEventListener("keydown", e => {
      if (["Space", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "KeyW", "KeyA", "KeyD", "KeyS"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === "Space") {
        gameStarted = true;
        gameOver = false;
      }

      if ((e.code === "ArrowRight" || e.code === "KeyD") && dir !== "l") {
        dir = "r";
      }

      if ((e.code === "ArrowLeft" || e.code === "KeyA") && dir !== "r") {
        dir = "l";
      }

      if ((e.code === "ArrowUp" || e.code === "KeyW") && dir !== "d") {
        dir = "u"
      }

      if ((e.code === "ArrowDown" || e.code === "KeyS") && dir !== "u") {
        dir = "d"
      }

    })

    // Initializes the snake and renders itself and food
    const initSnake = () => {
      snake = [];
      for (let i = snakeLen; i > 0; i--){
        const v = new Vec2((Math.floor(cols / 2) + i) - Math.round(snakeLen / 2), Math.floor(rows / 2))
        snake.push(v);
      }
      setGrid(prev => {
        const grid = initGrid(rows, cols, cellSize);
        grid[food.y][food.x].type = "food";
        
        snake.forEach(s => {
          grid[s.y][s.x].type = "snake";
        })
        return grid;
      })
    }

    // Handles snakes movement and rendering
    const moveSnake = () => {
      
      // Tail initial position
      let x = snake[0].x;
      let y = snake[0].y;

      // Updates position based on direction of travel
      if (dir === "r") {
        x += 1;
      }

      if (dir === "l") {
        x -= 1;
      }

      if (dir === "u") {
        y -= 1;
      }

      if (dir === "d") {
        y += 1;
      }

      // Remove the tail
      let tail = snake.pop() ?? new Vec2();
      // Update snake tail position
      snake.unshift(new Vec2(x, y));

      // Rendering
      setGrid(prev => {
        const copy = [...prev];

        // Change old tail position back to empty
        if (tail.isInbounds(bounds, { maxInclusive: true })){
          copy[tail.y][tail.x].type = "empty";
        }
        
        // Render tail
        snake.forEach(s => {
          if (s.isInbounds(bounds, { maxInclusive: true })) {
            copy[s.y][s.x].type = "snake";
          }
        })

        return copy;
      })
    }

    // 
    const createFood = () => {
      food = Vec2.RandomInteger(bounds);
      // console.log("new food");
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].equals(food)) {
          createFood()
          return;
        }
      }

      // console.log({ fx: food.x, fy: food.y });
      setGrid(prev => {
        const copy = [...prev];
        for (let i = 0; i < prev.length; i++) {
          for (let j = 0; j < prev[i].length; j++) {
            if (prev[i][j].type === "food") copy[i][j].type = "empty";
          }
        }
        copy[food.y][food.x].type = "food";
        
        return copy;
      })
    }

    const handleReset = (reason?: Reason) => {
      gameOver = true;
      gameStarted = false;
      dir = "r";
      callCount = 0;
      deathReason = reason;
    }

    createFood();
    const IID = setInterval(() => {
      if (!gameStarted) {
        initSnake();
      }
      
      if (!gameOver && gameStarted) {
        moveSnake();
      }

      const head = snake[0];
      for (let i = 1; i < snake.length; i++){
        const s = snake[i];
        if (s.equals(head)){
          gameOver = true;
          handleReset("self");
        }
      }

      if (!head.isInbounds(bounds, { maxInclusive: true })) {
        gameOver = true;
        handleReset("bounds");
      }

      if (food.equals(head)) {
        snake.push(head.copy());
        createFood();
        onScore();
      }

    
      if (gameOver && callCount < 1) {
        onGameOver(deathReason)
        callCount++
      }

    }, 100)

    return () => {
      clearInterval(IID);
    }
  }, [rows, cols, cellSize])
  
  if (grid.length > 0) {
    return (
      <VStack spacing={0}>
        {
          grid.map( (row, rIdx) => {

            return (
              <HStack key={createKey("row", rIdx)} spacing={0} >
                {
                  row.map( (cell, cIdx) => {
                    return (
                      <GridCell key={createKey("cell", cIdx)} cell={cell} />
                    )
                  })
                }
              </HStack>
            )
          })
        }
      </VStack>
    )
  } else {
    return (
      <VStack>
        <Text>Loading...</Text>
      </VStack>
    )
  }
  
}

export default Game;