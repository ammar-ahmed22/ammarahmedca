import type { IconType } from "react-icons";
import { Board } from "../Board";
import { fileToNumber, createAlgebraic } from "../utils";

interface FindDiagonalOpts {
  incrementRank: boolean;
  incrementFile: boolean;
}

interface FindPerpOpts {
  direction: 1 | -1;
  horizontal?: boolean;
  vertical?: boolean;
}

export interface AllMovesOpts {
  validOnly?: boolean;
  takesOnly?: boolean;
}

export abstract class Piece {
  abstract color: "w" | "b";
  abstract icon: IconType;

  abstract get type(): PieceType;
  abstract get points(): number;

  /**
   * Gets all moves including king takes
   * @param {number} rank - Rank (row) number for chess board
   * @param {string} file - File (column) letter for chess board (A-H)
   * @param {BoardMatrixType[][]} boardMatrix - 8 x 8 matrix containing pieces and empty spaces
   * @param {AllMovesOpts} [opts] - Options
   */
  abstract allMoves(
    rank: number,
    file: string,
    board: Board,
    opts?: AllMovesOpts
  ): string[];

  protected validateOpts = (opts?: AllMovesOpts) => {
    if (opts?.takesOnly && opts.validOnly) {
      throw new Error("takesOnly and validOnly cannot be the same!");
    }
  };

  protected removeKings = (moves: string[], board: Board): string[] => {
    return moves.filter((move) => {
      const [file, rank] = move.split("");
      const piece = board.getPiece(parseInt(rank), fileToNumber(file));

      if (piece?.type === "king") return false;

      return true;
    });
  };

  protected removeNonTakes = (moves: string[], board: Board): string[] => {
    return moves.filter((move) => {
      const [file, rank] = move.split("");
      const piece = board.getPiece(parseInt(rank), fileToNumber(file));

      if (!piece) return false;
      return true;
    });
  };

  protected findDiagonalMoves = (
    board: Board,
    startRank: number,
    startFile: string,
    { incrementFile, incrementRank }: FindDiagonalOpts
  ) => {
    const res: string[] = [];
    const rankDir = incrementRank ? 1 : -1;
    const fileDir = incrementFile ? 1 : -1;

    const startFileNum = fileToNumber(startFile);

    let pFile = startFileNum + fileDir;
    for (
      let pRank = startRank + rankDir;
      incrementRank ? pRank <= 8 : pRank >= 1;
      pRank += rankDir
    ) {
      const isEmpty = !board.isPiece(pRank, pFile, this.color);
      const isOpponent = board.isPiece(pRank, pFile, this.color, {
        onlyOpps: true,
      });

      if (pFile <= 0 || pFile >= 9) {
        break;
      }

      // empty, move to next
      if (isEmpty) {
        if (pFile <= 0)
          throw new Error("pfile is neg or 0, startFile: " + startFileNum);
        res.push(createAlgebraic(pRank, pFile));
        pFile += fileDir;
        continue;
      }

      // opponent, add and stop
      if (isOpponent) {
        if (pFile <= 0) throw new Error("pfile is neg or 0");
        res.push(createAlgebraic(pRank, pFile));
        break;
      }

      // teammate, stop
      if (!isEmpty && !isOpponent) {
        break;
      }
    }

    return res;
  };

  protected getAllDiagonals = (board: Board, rank: number, file: string) => {
    const opts: Record<string, FindDiagonalOpts> = {
      topRight: {
        incrementRank: true,
        incrementFile: true,
      },
      topLeft: {
        incrementRank: true,
        incrementFile: false,
      },
      bottomRight: {
        incrementRank: false,
        incrementFile: true,
      },
      bottomLeft: {
        incrementRank: false,
        incrementFile: false,
      },
    };

    return Object.keys(opts).flatMap((opt) => {
      return this.findDiagonalMoves(board, rank, file, opts[opt]);
    });
  };

  protected findPerpendicularMoves = (
    board: Board,
    startRank: number,
    startFile: string,
    { direction, horizontal, vertical }: FindPerpOpts
  ) => {
    const optErrorMsg = "horizontal and vertical cannot be the same!";
    if ((horizontal && vertical) || (!horizontal && !vertical)) {
      throw new Error(optErrorMsg);
    }

    const res: string[] = [];

    const startFileNum = fileToNumber(startFile);

    // horizontal: iterate file
    if (horizontal) {
      for (
        let pFile = startFileNum + direction;
        direction === 1 ? pFile <= 8 : pFile >= 1;
        pFile += direction
      ) {
        const isEmpty = !board.isPiece(startRank, pFile, this.color);
        const isOpponent = board.isPiece(startRank, pFile, this.color, {
          onlyOpps: true,
        });

        if (isEmpty) {
          if (pFile <= 0) throw new Error("pfile is neg or 0");
          res.push(createAlgebraic(startRank, pFile));
          continue;
        }

        if (isOpponent) {
          if (pFile <= 0) throw new Error("pfile is neg or 0");
          res.push(createAlgebraic(startRank, pFile));
          break;
        }

        if (!isEmpty && !isOpponent) {
          break;
        }
      }
    }

    // vertical: iterate rank
    if (vertical) {
      for (
        let pRank = startRank + direction;
        direction === 1 ? pRank <= 8 : pRank >= 1;
        pRank += direction
      ) {
        const isEmpty = !board.isPiece(pRank, startFileNum, this.color);
        const isOpponent = board.isPiece(pRank, startFileNum, this.color, {
          onlyOpps: true,
        });

        if (isEmpty) {
          res.push(createAlgebraic(pRank, startFileNum));
          continue;
        }

        if (isOpponent) {
          res.push(createAlgebraic(pRank, startFileNum));
          break;
        }

        if (!isEmpty && !isOpponent) {
          break;
        }
      }
    }

    return res;
  };

  protected getAllPerpendicular = (
    board: Board,
    rank: number,
    file: string
  ) => {
    const opts: Record<string, FindPerpOpts> = {
      up: {
        direction: 1,
        vertical: true,
      },
      down: {
        direction: -1,
        vertical: true,
      },
      right: {
        direction: 1,
        horizontal: true,
      },
      left: {
        direction: -1,
        horizontal: true,
      },
    };

    return Object.keys(opts).flatMap((opt) => {
      return this.findPerpendicularMoves(board, rank, file, opts[opt]);
    });
  };
}
