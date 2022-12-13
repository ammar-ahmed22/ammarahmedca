import React, { createContext, useState, useEffect, useContext } from "react";
import { FENHelper } from "../game/FENHelper";
import { Board } from "../game/Board";
import { Piece } from "../game/Pieces/Piece";
import { AuthContext, AuthContextType } from "./AuthContext";
import { Pawn, Bishop, Rook, Knight, Queen, King } from "../game/Pieces";
import { userColor } from "@chess/game/utils";

// const starting = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
export const GameContext = createContext<IGameContext | null>(null);

const generatePieceArray = (pieceNames: PieceType[], color: "w" | "b") => {
  const pieces = {
    pawn: new Pawn(color),
    bishop: new Bishop(color),
    rook: new Rook(color),
    knight: new Knight(color),
    queen: new Queen(color),
    king: new King(color),
  };

  return pieceNames.map((val) => pieces[val]);
};

const starting: Omit<Move, "executedMove"> = {
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  takes: {
    white: [],
    black: [],
  },
};

export const GameProvider: React.FC<GameProviderProps> = ({
  children,
  game,
  lastMove,
  playerIDs,
  colorToMove,
}) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  // Latest move from database
  // const latestMove = game.moves[game.moves.length - 1];
  const latestMove = lastMove ? lastMove : starting;

  const opponentMetadata: OpponentMetadata = {
    id: "",
    color: "w",
  };
  Object.keys(playerIDs).forEach((color) => {
    let c = color as "white" | "black";
    if (playerIDs[c] === user._id) return;
    opponentMetadata.id = playerIDs[c];
    opponentMetadata.color = c === "white" ? "w" : "b";
  });

  const uc = userColor(user._id, playerIDs);

  // Board metadata
  const [boardOpts, setBoardOpts] = useState<BoardOpts>({
    colorToMove: colorToMove,
    userColor: uc,
    castling: "KQkq",
    enPassant: "-",
    halfMove: 0,
    fullMove: 1,
    squareSize: "7vh",
  });
  // Board helper class
  const [board, setBoard] = useState<Board>(
    new Board(latestMove.fen, boardOpts)
  );
  // Current FEN
  const [fen, setFEN] = useState<string>(latestMove.fen);
  // Move object
  const [move, setMove] = useState<IMove>({
    toMove: null,
    moveTo: null,
  });

  const [moveMade, setMoveMade] = useState(false);

  const [takenPiece, setTakenPiece] = useState<Piece | null>(null);

  // White and black taken pieces
  const [whiteTakes, setWhiteTakes] = useState<Piece[]>(
    generatePieceArray(latestMove.takes.white as PieceType[], "w")
  );
  const [blackTakes, setBlackTakes] = useState<Piece[]>(
    generatePieceArray(latestMove.takes.black as PieceType[], "b")
  );

  const reset = () => {
    setFEN(latestMove.fen);
    setWhiteTakes(
      generatePieceArray(latestMove.takes.white as PieceType[], "w")
    );
    setBlackTakes(
      generatePieceArray(latestMove.takes.black as PieceType[], "b")
    );
    setMoveMade(false);
    setMove({ moveTo: null, toMove: null });
    setTakenPiece(null);
  };

  // Array of valid moves (algebraic notation: e6, a1, etc.)
  const [validMoves, setValidMoves] = useState<string[]>([]);

  /**
   * Updates board with FEN
   *
   * @param {string} fen - FEN string
   */
  const updateBoard = (fen: string): void => {
    setFEN(fen);
  };

  /**
   * Updates valid moves
   *
   * @param {string[]} moves - Array of moves in algebraic notation
   * @example
   * ```
   * updateValidMoves(["e5", "e6"]);
   * ```
   */
  const updateValidMoves = (moves: string[]) => setValidMoves(moves);

  /**
   * Sets color to move
   *
   * @param {("w" | "b")} color - New color to move
   */
  const setColorToMove = (color: "w" | "b") => {
    setBoardOpts((prevOpts) => ({ ...prevOpts, colorToMove: color }));
  };

  useEffect(() => {
    setBoard(new Board(fen, boardOpts));
    setValidMoves([]);
    // setMove({ toMove: null, moveTo: null });
  }, [fen, boardOpts]);

  useEffect(() => {
    if (move.moveTo && move.toMove) {
      // swap and update fen
      const response = FENHelper.executeMove(fen, move.toMove, move.moveTo);
      // console.log(response.fen);
      setFEN(response.fen);
      if (response.take) {
        setTakenPiece(response.take as Piece);
        if (response.take.color === "w")
          setWhiteTakes((prev) => [...prev, response.take as Piece]);
        if (response.take.color === "b")
          setBlackTakes((prev) => [...prev, response.take as Piece]);
      }
      setMoveMade(true);
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
    // game,
    lastMove,
    latestMove,
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
    moveMade,
    setMoveMade: (val: boolean) => setMoveMade(val),
    opponentMetadata,
    reset,
    userColor: uc,
    takenPiece,
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
};
