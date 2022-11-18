import { Piece } from "./Pieces/Piece";
import { 
  Pawn,
  Bishop,
  King,
  Queen,
  Rook,
  Knight
} from "./Pieces";

interface MoveExecutionResponse{
  fen: string,
  take: BoardMatrixType
}

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
      let emptyCounter = 0;
      for (let j = 0; j < matrix[i].length; j++){
        const piece = matrix[i][j];

        if (piece){
          row += fenPieceString(piece.type, piece.color);
        } else {
          if ((j + 1) >= matrix[i].length){
            emptyCounter++;
            row += `${emptyCounter}`;
            emptyCounter = 0;
            continue;
          }
          const next = matrix[i][j + 1];
          if (!next){
            emptyCounter++
            continue;
          }

          emptyCounter++;
          row += `${emptyCounter}`;
          emptyCounter = 0;
        }
      }

      rows.push(row);
    }

    return rows.join("/");
  }

  static algebraicToIndex = (algebraic: IAlgebraic) => {
    return {
      row: 8 - algebraic.rank,
      col: algebraic.file.charCodeAt(0) - 97
    }
  }

  static executeMove = (fen: string, toMove: IAlgebraic, moveTo: IAlgebraic) : MoveExecutionResponse => {
    const matrix = FENHelper.parseFEN(fen);
    const toMoveIndex = FENHelper.algebraicToIndex(toMove);
    const moveToIndex = FENHelper.algebraicToIndex(moveTo);

    const takenPiece = matrix[moveToIndex.row][moveToIndex.col];

    matrix[moveToIndex.row][moveToIndex.col] = matrix[toMoveIndex.row][toMoveIndex.col];
    matrix[toMoveIndex.row][toMoveIndex.col] = undefined;

    return {
      fen: FENHelper.parseMatrix(matrix),
      take: takenPiece
    }
  }
}



