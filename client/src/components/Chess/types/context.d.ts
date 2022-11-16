interface IGameContext{
  board: Board,
  updateBoard: (fen: string) => void,
  fen: string,
  validMoves: string[],
  updateValidMoves: (moves: string[]) => void
}