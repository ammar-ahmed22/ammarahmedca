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

  public matrix : BoardMatrixType[][] = []
  public parsedFEN : IParsedFEN;
  constructor(fen: string){
    this.parsedFEN = FENHelper.parseFEN(fen);
    this.matrix = this.createMatrix(this.parsedFEN.boardString);
  }

  private createMatrix = (boardString: string[][]) => {
    const matrix : BoardMatrixType[][] = [];
    
    
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

  private flipMatrix = (matrix: BoardMatrixType[][]) : BoardMatrixType[][] => {
    const res : BoardMatrixType[][] = [];

    for (let i = matrix.length - 1; i >= 0; i--){
      const tempRow : BoardMatrixType[] = [];
      for (let j = matrix[i].length - 1; j >= 0; j--){
        tempRow.push(matrix[i][j])
      }
      res.push(tempRow);
    }
    
    return res;
  }

  render = (validMoves: string[]) : JSX.Element[] => {
    
    // this works, however, we only want to switch the board when its the other players turn
    // as in, players may want to test out moves but only when they "send" it will flip the board for 
    // the other player 

    // In other words, when they player is making moves, we don't want to update FEN, just let them make their moves
    // Once they press send, creates a FEN and updates.
    const toRender = this.parsedFEN.colorToMove === "w" ? this.matrix : this.flipMatrix(this.matrix);

    
    return toRender.map((row, rIdx) => {
      const rowId = `row-${rIdx + 1}`
      // NEED TO UPDATE THIS FOR BLACK MOVE
      const rank = this.parsedFEN.colorToMove === "w" ? 8 - rIdx : rIdx + 1;
      const rowIsEven = rIdx % 2 === 0;
      return (
        <Flex
          key={rowId}
          id={rowId}
        >
          {
            row.map((piece, pIdx) => {
              const pieceId = `${rowId}-col-${pIdx + 1}`
              // NEED TO UPDATE THIS FOR BLACK MOVE
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

              let isValidMove = false;
              validMoves.forEach(move => {
                const [moveFile, moveRank]= move.split("");

                if (moveFile === file && parseInt(moveRank) === rank){
                  isValidMove = true;
                }
              })

              return (
                <Square 
                  key={pieceId}
                  id={pieceId}
                  piece={piece}
                  bg={isLight ? "light" : "dark"}
                  size="5vw"
                  rank={rank}
                  file={file}
                  indices={[rIdx, pIdx]}
                  isValidMove={isValidMove}
                />
              )
            })
          }
        </Flex>
      )
    })
  }

  
}