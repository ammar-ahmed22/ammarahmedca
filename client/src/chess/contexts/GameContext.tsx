import React, { createContext, useState, useEffect } from "react";
import { FENHelper } from "../game/FENHelper";
import { Board } from "../game/Board";
import { Piece } from "../game/Pieces/Piece";

// const starting = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
export const GameContext = createContext<IGameContext | null>(null);

export const GameProvider: React.FC<GameProviderProps> = ({
  children,
  game,
}) => {
  useEffect(() => {
    console.log(game);
  }, [game]);
  const latestMove = game.moves[game.moves.length - 1];
  const [boardOpts, setBoardOpts] = useState<BoardOpts>({
    colorToMove: latestMove.colorToMove,
    castling: "KQkq",
    enPassant: "-",
    halfMove: 0,
    fullMove: 1,
    squareSize: "7vh",
  });
  const [board, setBoard] = useState<Board>(
    new Board(latestMove.fen, boardOpts)
  );
  const [fen, setFEN] = useState<string>(latestMove.fen);
  const [move, setMove] = useState<IMove>({
    toMove: null,
    moveTo: null,
  });

  const [whiteTakes, setWhiteTakes] = useState<Piece[]>([]);
  const [blackTakes, setBlackTakes] = useState<Piece[]>([]);

  const [validMoves, setValidMoves] = useState<string[]>([]);

  const updateBoard = (fen: string): void => {
    setFEN(fen);
  };

  const updateValidMoves = (moves: string[]) => setValidMoves(moves);

  const setColorToMove = (color: "w" | "b") => {
    setBoardOpts((prevOpts) => ({ ...prevOpts, colorToMove: color }));
  };

  useEffect(() => {
    setBoard(new Board(fen, boardOpts));
    setValidMoves([]);
    setMove({ toMove: null, moveTo: null });
  }, [fen, boardOpts]);

  useEffect(() => {
    // console.log({ whiteTakes, blackTakes });
  }, [whiteTakes, blackTakes]);

  useEffect(() => {
    console.log(move);
    if (move.moveTo && move.toMove) {
      // swap and update fen
      const response = FENHelper.executeMove(fen, move.toMove, move.moveTo);
      console.log(response.fen);
      setFEN(response.fen);
      if (response.take) {
        if (response.take.color === "w")
          setWhiteTakes((prev) => [...prev, response.take as Piece]);
        if (response.take.color === "b")
          setBlackTakes((prev) => [...prev, response.take as Piece]);
      }
    }
    // eslint-disable-next-line
  }, [move]);

  const setToMove = (algebraic: IAlgebraic) => {
    setMove((prevMove) => ({ ...prevMove, toMove: algebraic }));
  };

  const setMoveTo = (algebraic: IAlgebraic) => {
    setMove((prevMove) => ({ ...prevMove, moveTo: algebraic }));
  };

  const setSquareSize = (val: string) => {
    setBoardOpts((prevOpts) => ({ ...prevOpts, squareSize: val }));
  };

  const context: IGameContext = {
    board,
    fen,
    updateBoard,
    validMoves,
    updateValidMoves,
    colorToMove: boardOpts.colorToMove ?? "w",
    setColorToMove,
    move,
    setToMove,
    setMoveTo,
    whiteTakes,
    blackTakes,
    squareSize: boardOpts.squareSize ?? "8vh",
    setSquareSize,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};
