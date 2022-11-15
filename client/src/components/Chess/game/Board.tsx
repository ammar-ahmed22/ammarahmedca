import { Piece } from "./Pieces/Piece";
import { 
  Pawn,
  Bishop,
  King,
  Queen,
  Rook,
  Knight
} from "./Pieces";
import { Flex } from "@chakra-ui/react";
import Square from "../components/Square";


interface IParsedFEN{
  boardString: string[][],
  colorToMove: string,
  castling: string,
  enPassant: string,
  halfMove: number,
  fullMove: number
}



export class FENHelper{
  static parseFEN = (fen: string) : IParsedFEN => {
    
    const [
      board,
      colorToMove,
      castling,
      enPassant,
      halfMove,
      fullMove
    ] = fen.split(" ");

    const rows = board.split("/");
    const res : string[][] = [];

    for (let i = 0; i < rows.length; i++){
      const row  = rows[i];
      const temp : string[] = [];
      for (let j = 0; j < row.length; j++){
        if (isNaN(parseInt(row[j]))){
          temp.push(row[j])
        } else {
          for (let k = 0; k < parseInt(row[j]); k++){
            temp.push("")
          }
        }
      }

      res.push(temp);
    }

    return {
      boardString: res,
      colorToMove,
      castling,
      enPassant,
      halfMove: parseInt(halfMove),
      fullMove: parseInt(fullMove)
    }
  }
}

export class Board{

  public matrix : (Piece | undefined)[][] = []
  public parsedFEN : IParsedFEN;
  constructor(fen: string){
    this.parsedFEN = FENHelper.parseFEN(fen);
    this.matrix = this.createMatrix(this.parsedFEN.boardString);
  }

  public createMatrix = (boardString: string[][]) => {
    const matrix : (Piece | undefined)[][] = [];
    
    
    for (let i = 0; i < boardString.length; i++){
      const row = boardString[i];
      const tempRow : (Piece | undefined)[] = [];
      for (let j = 0; j < row.length; j++){
        const pieceString = row[j];
        
        if (pieceString === ""){
          tempRow.push(undefined);
          continue;
        }
      
        const isBlack = pieceString === pieceString.toLowerCase();
        const color : "w" | "b" = isBlack ? "b" : "w"

        const pieceMap : Record<string, Piece> = {
          p: new Pawn(color),
          n: new Knight(color),
          r: new Rook(color),
          k: new King(color),
          q: new Queen(color),
          b: new Bishop(color)
        }

        tempRow.push(pieceMap[pieceString.toLowerCase()])

      }
      matrix.push(tempRow);
    }

    return matrix;
  }

  render = () : JSX.Element[] => {
    // use which turn it is to move to render the board accordingly.
    // this.parsedFEN.colorToMove

    // THIS IS ASSUMING WHITE TO MOVE
    return this.matrix.map((row, rIdx) => {
      const rowId = `row-${rIdx + 1}`
      const rank = 8 - rIdx;
      const rowIsEven = rIdx % 2 === 0;
      return (
        <Flex
          key={rowId}
          id={rowId}
        >
          {
            row.map((piece, pIdx) => {
              const pieceId = `${rowId}-col-${pIdx + 1}`
              const file = String.fromCharCode(97 + pIdx);
              const colIsEven = pIdx % 2 === 0;
              let isLight = false;
              if (rowIsEven){
                if (colIsEven){
                  isLight = true
                }
              } else{
                if (!colIsEven){
                  isLight = true;
                }
              }

              return (
                <Square 
                  key={pieceId}
                  id={pieceId}
                  piece={piece}
                  bg={isLight ? "light" : "dark"}
                  size="8vw"
                  rank={rank}
                  file={file}
                />
              )
            })
          }
        </Flex>
      )
    })
  }

  
}