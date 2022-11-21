import type { IconType } from "react-icons";
import { FaChessKing } from "react-icons/fa";
import { Piece, AllMovesOpts } from "./Piece";
import { FENHelper } from "../FENHelper";


export class King extends Piece{
  
  public icon : IconType
  constructor(
    public color : "w" | "b"
  ){
    super()
    this.icon =  FaChessKing
  }

  get type(): PieceType {
    return "king"
  }

  get points(): number {
    return Infinity  
  }

  allMoves(rank: number, file: string, boardMatrix: BoardMatrixType[][], opts?: AllMovesOpts): string[] {
    this.validateOpts(opts);
    const numberFile = this.fileToNumber(file);
    const allPotential = [
      {
        rank: rank + 1,
        file: numberFile
      },
      {
        rank: rank - 1,
        file: numberFile
      },
      {
        rank: rank,
        file: numberFile + 1,
      },
      {
        rank: rank,
        file: numberFile - 1
      },
      {
        rank: rank + 1,
        file: numberFile + 1
      },
      {
        rank: rank + 1,
        file: numberFile - 1
      },
      {
        rank: rank - 1,
        file: numberFile - 1
      },
      {
        rank: rank - 1,
        file: numberFile + 1
      }
    ]


    const potentiallyValid = allPotential.filter( move => {
      if (move.rank < 1 || move.rank > 8 || move.file < 1 || move.file > 8){
        return false;
      }

      const isEmpty = !this.isPiece(boardMatrix, move.rank, move.file);
      const isOpp = this.isPiece(boardMatrix, move.rank, move.file, { onlyOpps: true, noKing: true });

      return isEmpty || isOpp;

    });

    console.log({ potentiallyValid });

    // simulate moves for each of the potentiallyValid
    // get valid moves for each oppPiece in the simulated matrix
    // if any valid move can take the king (rank, numberFile), not valid (will cause check)
    const currFen = FENHelper.parseMatrix(boardMatrix);
    const valid = potentiallyValid.filter( move => {
      const simulated = FENHelper.executeMove(currFen, { rank, file }, { rank: move.rank, file: this.numberToFile(move.file)});
      console.log({ simulated });
      const simulatedMatrix = simulated.matrix;

      let canBeTaken = false;
      
      for (let i = 0; i < simulatedMatrix.length; i++){
        for (let j = 0; j < simulatedMatrix[i].length; j++){
          const sRank = 8 - i;
          const sFile = String.fromCharCode(97 + j);
          const piece = simulatedMatrix[i][j];
          if (!piece || piece.color === this.color || piece.type === "king") continue;
          
          const pieceTakes = piece.allMoves(sRank, sFile, simulatedMatrix, { takesOnly: true });
          canBeTaken = pieceTakes.includes(this.createAlgebraic(move.rank, move.file));
          if (canBeTaken) console.log(piece.type);
          if (canBeTaken) break;
        }
      }
      console.log("checkingMove:", this.createAlgebraic(move.rank, move.file), { canBeTaken });
      return !canBeTaken;

    })

    console.log({ valid });


    return valid.map( move => this.createAlgebraic(move.rank, move.file) );
  }

  
}