import { Flex } from "@chakra-ui/react";
import Square from "../components/Square";
import { FENHelper } from "./FENHelper";
import { fileToNumber, indexToAlgebraic, createAlgebraic } from "./utils";

interface IsPieceOpts {
  onlyOpps?: boolean;
  noKing?: boolean;
}

export class Board {
  public fen: string;
  public matrix: BoardMatrixType[][] = [];
  public colorToMove: string;
  public userColor: string;
  public castling: string;
  public enPassant: string;
  public halfMove: number;
  public fullMove: number;
  public squareSize: string;

  constructor(fen: string, opts?: BoardOpts) {
    this.colorToMove = opts?.colorToMove ?? "w";
    this.castling = opts?.castling ?? "KQkq";
    this.enPassant = opts?.enPassant ?? "-";
    this.halfMove = opts?.halfMove ?? 0;
    this.fullMove = opts?.fullMove ?? 1;
    this.matrix = FENHelper.parseFEN(fen);
    this.fen = fen;
    this.squareSize = opts?.squareSize ?? "8vw";
    this.userColor = opts?.userColor ?? "w";
  }

  get boardOpts(): BoardOpts {
    return {
      colorToMove: this.colorToMove as "w" | "b",
      castling: this.castling,
      enPassant: this.enPassant,
      userColor: this.userColor as "w" | "b",
      halfMove: this.halfMove,
      fullMove: this.fullMove,
      squareSize: this.squareSize
    }
  }

  public canCastle = (color: "w" | "b", queenSide: boolean) => {
    const whiteKing = this.castling[0];
    const whiteQueen = this.castling[1];
    const blackKing = this.castling[2];
    const blackQueen = this.castling[3];

    if (color === "w" && queenSide && whiteQueen === "Q") {
      return true;
    }

    if (color === "w" && !queenSide && whiteKing === "K") {
      return true;
    }

    if (color === "b" && queenSide && blackQueen === "q") {
      return true;
    }

    if (color === "b" && !queenSide && blackKing === "k") {
      return true;
    }

    return false;
  }

  public getPiece = (rank: number, file: number | string): BoardMatrixType => {
    let numberFile;
    if (typeof file === "string" ) {
      numberFile = fileToNumber(file);
    } else {
      numberFile = file;
    }
    const row = 8 - rank;
    const col = numberFile - 1;

    return this.matrix[row][col];
  };

  public isPiece = (
    rank: number,
    numberFile: number,
    color: "w" | "b",
    opts?: IsPieceOpts
  ): boolean => {
    const piece = this.getPiece(rank, numberFile);

    if (!piece) return false;

    if (opts?.onlyOpps && piece.color === color) return false;

    if (opts?.noKing && piece.type === "king") return false;

    return true;
  };

  public removeKings = (moves: string[], board: Board): string[] => {
    return moves.filter((move) => {
      const [file, rank] = move.split("");
      const piece = board.getPiece(parseInt(rank), fileToNumber(file));

      if (piece?.type === "king") return false;

      return true;
    });
  };

  public removeNonTakes = (moves: string[], board: Board): string[] => {
    return moves.filter((move) => {
      const [file, rank] = move.split("");
      const piece = board.getPiece(parseInt(rank), fileToNumber(file));

      if (!piece) return false;
      return true;
    });
  };

  public findPiecePosition = (type: PieceType, color: "w" | "b") => {
    const { matrix } = this;

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const piece = matrix[i][j];
        if (piece && piece.type === type && piece.color === color) {
          return indexToAlgebraic(i, j);
        }
      }
    }
  };

  public isInCheck = (color: "w" | "b") => {
    const { matrix } = this;

    const kingPosition = this.findPiecePosition("king", color);

    if (!kingPosition) throw new Error("No king. Invalid FEN.");

    const kingAlgebraic = createAlgebraic(kingPosition.rank, kingPosition.file);

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        const piece = matrix[i][j];
        if (!piece || piece.color === color || piece.type === "king") continue;

        const pos = indexToAlgebraic(i, j);
        const takeMoves = piece.allMoves(pos.rank, pos.file, this, {
          takesOnly: true,
        });
        if (takeMoves.includes(kingAlgebraic)) return true;
      }
    }

    return false;
  };

  public onlyCheckRemovers = (
    rank: number,
    file: string,
    color: "w" | "b",
    moves: string[],
    board: Board
  ): string[] => {
    return moves.filter((move) => {
      const [moveFile, moveRank] = move.split("");
      const simulated = FENHelper.executeMove(
        this.fen,
        { rank, file },
        { rank: parseInt(moveRank), file: moveFile },
        board.boardOpts
      );
      const simulatedBoard = new Board(simulated.fen);
      return !simulatedBoard.isInCheck(color);
    });
  };

  private flipMatrix = (matrix: BoardMatrixType[][]): BoardMatrixType[][] => {
    const res: BoardMatrixType[][] = [];

    for (let i = matrix.length - 1; i >= 0; i--) {
      const tempRow: BoardMatrixType[] = [];
      for (let j = matrix[i].length - 1; j >= 0; j--) {
        tempRow.push(matrix[i][j]);
      }
      res.push(tempRow);
    }

    return res;
  };

  // Render a display version of the board
  renderDisplay = (squareSize: string) => {
    return this.matrix.map((row, rIdx) => {
      const rowId = `row-${rIdx + 1}`;
      const rank = this.colorToMove === "w" ? 8 - rIdx : rIdx + 1;
      const rowIsEven = rIdx % 2 === 0;

      return (
        <Flex key={rowId}>
          {row.map((piece, pIdx) => {
            const pieceId = `${rowId}-col-${pIdx + 1}`;

            const file =
              this.colorToMove === "w"
                ? String.fromCharCode(97 + pIdx)
                : String.fromCharCode(104 - pIdx);
            const colIsEven = pIdx % 2 === 0;
            let isLight = false;

            if (rowIsEven) {
              if (colIsEven) {
                isLight = true;
              }
            } else {
              if (!colIsEven) {
                isLight = true;
              }
            }

            return (
              <Square
                key={pieceId}
                id={pieceId}
                piece={piece}
                bg={isLight ? "light" : "dark"}
                size={squareSize}
                rank={rank}
                file={file}
                indices={[rIdx, pIdx]}
                isValidMove={false}
                isDisplayOnly
              />
            );
          })}
        </Flex>
      );
    });
  };

  render = (validMoves: string[], move: IMove): JSX.Element[] => {
    const toRender =
      this.userColor === "w" ? this.matrix : this.flipMatrix(this.matrix);

    return toRender.map((row, rIdx) => {
      const rowId = `row-${rIdx + 1}`;

      const rank = this.userColor === "w" ? 8 - rIdx : rIdx + 1;
      const rowIsEven = rIdx % 2 === 0;
      return (
        <Flex key={rowId} id={rowId}>
          {row.map((piece, pIdx) => {
            const pieceId = `${rowId}-col-${pIdx + 1}`;

            const file =
              this.userColor === "w"
                ? String.fromCharCode(97 + pIdx)
                : String.fromCharCode(104 - pIdx);
            const colIsEven = pIdx % 2 === 0;
            let isLight = false;

            if (rowIsEven) {
              if (colIsEven) {
                isLight = true;
              }
            } else {
              if (!colIsEven) {
                isLight = true;
              }
            }

            let isValidMove = false;
            validMoves.forEach((move) => {
              const [moveFile, moveRank] = move.split("");

              if (moveFile === file && parseInt(moveRank) === rank) {
                isValidMove = true;
              }
            });

            return (
              <Square
                key={pieceId}
                id={pieceId}
                piece={piece}
                bg={isLight ? "light" : "dark"}
                size={this.squareSize}
                rank={rank}
                file={file}
                indices={[rIdx, pIdx]}
                isValidMove={isValidMove}
              />
            );
          })}
        </Flex>
      );
    });
  };
}
