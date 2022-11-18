import { Piece } from "./Pieces/Piece";
import { 
  Pawn,
  Bishop,
  King,
  Queen,
  Rook,
  Knight
} from "./Pieces";

export class FENHelper{
    static parseFEN = (fen: string) : BoardMatrixType[][] => {

    const rows = fen.split("/");
    const res : BoardMatrixType[][] = [];

    for (let i = 0; i < rows.length; i++){
        const row  = rows[i];
        const temp : BoardMatrixType[] = [];
        for (let j = 0; j < row.length; j++){
          if (isNaN(parseInt(row[j]))){
            const pieceString = row[j];

            const isBlack = pieceString === pieceString.toLowerCase();
            const color : "w" | "b" = isBlack ? "b" : "w";

            const pieceMap : Record<string, Piece> = {
              p: new Pawn(color),
              n: new Knight(color),
              r: new Rook(color),
              k: new King(color),
              q: new Queen(color),
              b: new Bishop(color)
            }

            temp.push(pieceMap[pieceString.toLowerCase()])
          } else {
              for (let k = 0; k < parseInt(row[j]); k++){
                temp.push(undefined)
              }
          }
        }

        res.push(temp);
    }

    return res;
  }

  static parseMatrix = (matrix: BoardMatrixType[][]) : string => {
    const fenPieceString = (type: PieceType, color: "w" | "b") => {
      if (type !== "knight"){
        return color === "b" ? type[0].toLowerCase() : type[0].toUpperCase();
      }

      return color === "b" ? "n" : "N"
    }

    const rows : string[] = [];

    for (let i = 0; i < matrix.length; i++){
      let row = "";
      for (let j = 0; j < matrix[i].length; j++){
        const piece = matrix[i][j];

        if (piece){
          row += fenPieceString(piece.type, piece.color);
        } else {
          
        }
      }
    }

    return "";
  }

  static algebraicToIndex = (algebraic: IAlgebraic) => {
    return {
      row: 8 - algebraic.rank,
      col: algebraic.file.charCodeAt(0) - 97
    }
  }

  static executeMove = (fen: string, toMove: IAlgebraic, moveTo: IAlgebraic) => {
    const matrix = FENHelper.parseFEN(fen);
    const toMoveIndex = FENHelper.algebraicToIndex(toMove);
    const moveToIndex = FENHelper.algebraicToIndex(moveTo);

    const pieceAtMoveTo = matrix[moveToIndex.row][moveToIndex.col];

    matrix[moveToIndex.row][moveToIndex.col] = matrix[toMoveIndex.row][toMoveIndex.col];

    if (!pieceAtMoveTo){
      return {
        fen: fen, // updated fen from new matrix (FENHelper.parseMatrix(matrix) => string)
      }
    }

    return {
      fen: fen, // updated fen from new matrix (FENHelper.parseMatrix(matrix) => string)
      take: pieceAtMoveTo,
    }
  }
}



