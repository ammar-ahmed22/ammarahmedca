import { Flex } from "@chakra-ui/react";
import Square from "../components/Square";
import { FENHelper } from "./FENHelper";





export class Board{

  public matrix : BoardMatrixType[][] = []
  public colorToMove: string;
  public castling: string;
  public enPassant: string;
  public halfMove: number;
  public fullMove: number
  // public parsedFEN : IParsedFEN;
  constructor(fen: string, opts?: BoardOpts){
    this.colorToMove = opts?.colorToMove ?? "w";
    this.castling = opts?.castling ?? "KQkq";
    this.enPassant = opts?.enPassant ?? "-";
    this.halfMove = opts?.halfMove ?? 0;
    this.fullMove = opts?.fullMove ?? 1;
    this.matrix = FENHelper.parseFEN(fen);
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

    // Adding to above, now we have state for colorToMove so this is solved. Only when we update
    // the state for colorToMove will this render the other way. (i.e. updating colorToMove option)
    // this can be set when loaded from backend request.
    const toRender = this.colorToMove === "w" ? this.matrix : this.flipMatrix(this.matrix);

    
    return toRender.map((row, rIdx) => {
      const rowId = `row-${rIdx + 1}`
      // NEED TO UPDATE THIS FOR BLACK MOVE
      const rank = this.colorToMove === "w" ? 8 - rIdx : rIdx + 1;
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
                  size="8vh"
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