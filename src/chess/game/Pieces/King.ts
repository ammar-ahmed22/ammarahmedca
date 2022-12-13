import type { IconType } from "react-icons";
import { FaChessKing } from "react-icons/fa";
import { Piece, AllMovesOpts } from "./Piece";
import { FENHelper } from "../FENHelper";
import { Board } from "../Board";
import { createAlgebraic, fileToNumber, numberToFile } from "../utils";

export class King extends Piece {
  public icon: IconType;
  constructor(public color: "w" | "b") {
    super();
    this.icon = FaChessKing;
  }

  get type(): PieceType {
    return "king";
  }

  get points(): number {
    return Infinity;
  }

  allMoves(
    rank: number,
    file: string,
    board: Board,
    opts?: AllMovesOpts
  ): string[] {
    this.validateOpts(opts);
    const numberFile = fileToNumber(file);
    const allPotential = [
      {
        rank: rank + 1,
        file: numberFile,
      },
      {
        rank: rank - 1,
        file: numberFile,
      },
      {
        rank: rank,
        file: numberFile + 1,
      },
      {
        rank: rank,
        file: numberFile - 1,
      },
      {
        rank: rank + 1,
        file: numberFile + 1,
      },
      {
        rank: rank + 1,
        file: numberFile - 1,
      },
      {
        rank: rank - 1,
        file: numberFile - 1,
      },
      {
        rank: rank - 1,
        file: numberFile + 1,
      },
    ];

    const potentiallyValid = allPotential.filter((move) => {
      if (move.rank < 1 || move.rank > 8 || move.file < 1 || move.file > 8) {
        return false;
      }

      const isEmpty = !board.isPiece(move.rank, move.file, this.color);
      const isOpp = board.isPiece(move.rank, move.file, this.color, {
        onlyOpps: true,
        noKing: true,
      });

      return isEmpty || isOpp;
    });

    // simulate moves for each of the potentiallyValid
    // get potential takes for each opponent piece in the simulated matrix
    // if any potentially valid move can cause king to be taken: not valid
    const currFen = FENHelper.parseMatrix(board.matrix);
    const valid = potentiallyValid.filter((move) => {
      const simulated = FENHelper.executeMove(
        currFen,
        { rank, file },
        { rank: move.rank, file: numberToFile(move.file) }
      );

      const simulatedBoard = new Board(simulated.fen);

      let canBeTaken = false;

      mainLoop: for (let i = 0; i < simulatedBoard.matrix.length; i++) {
        for (let j = 0; j < simulatedBoard.matrix[i].length; j++) {
          const sRank = 8 - i;
          const sFile = String.fromCharCode(97 + j);
          const piece = simulatedBoard.matrix[i][j];
          // if the piece is the opponent king (we don't want to call allMoves as below)
          if (piece && piece.color !== this.color && piece.type === "king") {
            // find distance between the 2 kings
            const currKing = { x: move.file, y: move.rank };
            const otherKing = { x: fileToNumber(sFile), y: sRank };

            const distance = Math.sqrt(
              Math.pow(currKing.x - otherKing.x, 2) +
                Math.pow(currKing.y - otherKing.y, 2)
            );

            // if simulated move would cause the kings to be one space away: not valid
            if (distance === 1 || distance === Math.sqrt(2)) {
              canBeTaken = true;
              break mainLoop;
            }
          }
          // only select non-king, opponent pieces
          if (!piece || piece.color === this.color || piece.type === "king")
            continue;

          // get all take moves
          const pieceTakes = piece.allMoves(sRank, sFile, simulatedBoard, {
            takesOnly: true,
          });

          // if potentially valid move could be taken, not valid
          canBeTaken = pieceTakes.includes(
            createAlgebraic(move.rank, move.file)
          );

          if (canBeTaken) break mainLoop;
        }
      }

      return !canBeTaken;
    });

    const moves = valid.map((move) => createAlgebraic(move.rank, move.file));

    if (opts?.validOnly) return this.removeKings(moves, board);
    if (opts?.takesOnly) return this.removeNonTakes(moves, board);

    return moves;
  }
}