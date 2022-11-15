import { Board, FENHelper } from "./Board";

const starting = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";



test("Testing FEN parser", () => {

  const parsed = FENHelper.parseFEN(starting)

  console.log(parsed.boardString);
  
})

test("Testing Board clas", () => {
  const board = new Board(starting);

  console.log(board.matrix);
})