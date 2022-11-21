import type { IconType } from "react-icons";

interface IsPieceOpts{
  onlyOpps?: boolean,
  noKing?: boolean
}

interface FindDiagonalOpts{
  incrementRank: boolean,
  incrementFile: boolean
}

interface FindPerpOpts{
  direction: 1 | -1,
  horizontal?: boolean,
  vertical?: boolean
}

export interface AllMovesOpts{
  validOnly?: boolean,
  takesOnly?: boolean
}

export abstract class Piece {

  abstract color : "w" | "b"
  abstract icon : IconType

  abstract get type() : PieceType
  abstract get points() : number

  /**
   * Gets all moves including king takes
   * @param {number} rank - Rank (row) number for chess board
   * @param {string} file - File (column) letter for chess board (A-H)
   * @param {BoardMatrixType[][]} boardMatrix - 8 x 8 matrix containing pieces and empty spaces
   * @param {AllMovesOpts} [opts] - Options
   */
  abstract allMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][], opts?: AllMovesOpts) : string[]

  protected validateOpts = (opts?: AllMovesOpts) => {
    if (opts?.takesOnly && opts.validOnly){
      throw new Error("takesOnly and validOnly cannot be the same!");
    }
  }

  protected removeKings = (moves: string[], boardMatrix: BoardMatrixType[][]) : string[] => {
    return moves.filter( move => {
      const [file, rank] = move.split("");
      const piece = this.getPiece(boardMatrix, parseInt(rank), this.fileToNumber(file));

      if (piece?.type === "king") return false;

      return true;
    })
    
  }

  protected removeNonTakes = (moves: string[], boardMatrix: BoardMatrixType[][]) : string[] => {
    return moves.filter( move => {
      const [file, rank] = move.split("");
      const piece = this.getPiece(boardMatrix, parseInt(rank), this.fileToNumber(file));

      if (!piece) return false;
      return true;
    })
  }

  protected fileToNumber = (file: string) : number => file.charCodeAt(0) - 96 ;
  protected numberToFile = (numberFile: number) : string => String.fromCharCode(numberFile + 96) 
  protected createAlgebraic = (rank: number, file: string | number) : string => {
    if (typeof file === "string"){
      return `${file}${rank}`
    } else{
      return `${this.numberToFile(file)}${rank}`
    }
  } 

  protected getPiece = (boardMatrix: BoardMatrixType[][], rank: number, numberFile: number) : BoardMatrixType => {
    const row = 8 - rank;
    const col = numberFile - 1;

    return boardMatrix[row][col];
  }

  protected isPiece = (boardMatrix: BoardMatrixType[][], rank: number, numberFile: number, opts?: IsPieceOpts) : boolean => {
    const piece = this.getPiece(boardMatrix, rank, numberFile)

    if (!piece) return false;

    if (opts?.onlyOpps && piece.color === this.color) return false;

    if (opts?.noKing && piece.type === "king") return false;

    return true;
    
  }

  protected findDiagonalMoves = (boardMatrix: BoardMatrixType[][], startRank: number, startFile: string, { incrementFile, incrementRank } : FindDiagonalOpts) => {
    const res : string[] = []
    const rankDir = incrementRank ? 1 : -1;
    const fileDir = incrementFile ? 1 : -1;
    
    const startFileNum = this.fileToNumber(startFile);

    let pFile = startFileNum + fileDir;
    for (let pRank = startRank + rankDir; incrementRank ? pRank <= 8 : pRank >= 1; pRank += rankDir){
      const isEmpty = !this.isPiece(boardMatrix, pRank, pFile)
      const isOpponent = this.isPiece(boardMatrix, pRank, pFile, { onlyOpps: true });

      if (pFile <= 0 || pFile >= 9){
        break;
      }

      // empty, move to next
      if (isEmpty) {
        if (pFile <= 0) throw new Error("pfile is neg or 0, startFile: " + startFileNum);
        res.push(this.createAlgebraic(pRank, pFile));
        pFile += fileDir;
        continue;
      }

      // opponent, add and stop
      if (isOpponent) {
        if (pFile <= 0) throw new Error("pfile is neg or 0")
        res.push(this.createAlgebraic(pRank, pFile));
        break;
      }

      // teammate, stop
      if (!isEmpty && !isOpponent){
        break;
      }
    }

    return res;
  }

  protected getAllDiagonals = (boardMatrix: BoardMatrixType[][], rank: number, file: string) => {
    const opts : Record<string, FindDiagonalOpts> = {
      topRight: {
        incrementRank: true,
        incrementFile: true
      },
      topLeft: {
        incrementRank: true,
        incrementFile: false
      },
      bottomRight: {
        incrementRank: false,
        incrementFile: true
      },
      bottomLeft: {
        incrementRank: false,
        incrementFile: false
      }
    };

    return Object.keys(opts).flatMap((opt) => {
      return this.findDiagonalMoves(boardMatrix, rank, file, opts[opt])
    })
  }

  protected findPerpendicularMoves = (boardMatrix: BoardMatrixType[][], startRank: number, startFile: string, { direction, horizontal, vertical } : FindPerpOpts) => {

    const optErrorMsg = "horizontal and vertical cannot be the same!"
    if ((horizontal && vertical) || (!horizontal && !vertical)){
      throw new Error(optErrorMsg)
    }

    const res : string[] = []

    const startFileNum = this.fileToNumber(startFile);

    // horizontal: iterate file
    if (horizontal){
      for (let pFile = startFileNum + direction; direction === 1 ? pFile <= 8 : pFile >= 1; pFile += direction){
        const isEmpty = !this.isPiece(boardMatrix, startRank, pFile)
        const isOpponent = this.isPiece(boardMatrix, startRank, pFile, { onlyOpps: true });

        if (isEmpty){
          if (pFile <= 0) throw new Error("pfile is neg or 0")
          res.push(this.createAlgebraic(startRank, pFile));
          continue;
        }

        if (isOpponent){
          if (pFile <= 0) throw new Error("pfile is neg or 0")
          res.push(this.createAlgebraic(startRank, pFile));
          break;
        }

        if (!isEmpty && !isOpponent){
          break;
        }

      }
    }

    // vertical: iterate rank
    if (vertical){
      for (let pRank = startRank + direction; direction === 1 ? pRank <= 8 : pRank >= 1; pRank += direction){
        const isEmpty = !this.isPiece(boardMatrix, pRank, startFileNum)
        const isOpponent = this.isPiece(boardMatrix, pRank, startFileNum, { onlyOpps: true });

        if (isEmpty){
          res.push(this.createAlgebraic(pRank, startFileNum));
          continue;
        }

        if (isOpponent){
          res.push(this.createAlgebraic(pRank, startFileNum));
          break;
        }

        if (!isEmpty && !isOpponent){
          break;
        }

      }
    }


    return res;

  }

  protected getAllPerpendicular = (boardMatrix: BoardMatrixType[][], rank: number, file: string) => {
    const opts : Record<string, FindPerpOpts> = {
      up: {
        direction: 1,
        vertical: true,
      },
      down: {
        direction: -1,
        vertical: true
      },
      right: {
        direction: 1,
        horizontal: true
      },
      left: {
        direction: -1,
        horizontal: true
      }
    }

    return Object.keys(opts).flatMap( opt => {
      return this.findPerpendicularMoves(boardMatrix, rank, file, opts[opt])
    })
  }


}

