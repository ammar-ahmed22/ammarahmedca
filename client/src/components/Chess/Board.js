import React, { useEffect, useState } from "react";
import Square from "./Square";
import { Box } from "@chakra-ui/react"

const Board = ({ size, fen, setFen }) => {
  const styles = {
    board: {
      display: "grid",
      gridTemplateRows: "repeat(8, minmax(0, 1fr))",
      width: size,
      height: size,
    },
    rankContainer: {
      width: size,
      display: "flex",
      position: "relative",
    },
    rankIdentifier: {
      position: "absolute",
      top: 0,
      // transform: "translate(0, -50%)",
      margin: 0,
      padding: ".25em .25em 0 .25em",
      // fontWeight: "bold"
    },
    fileIdentifierContainer: {
      position: "absolute",
      bottom: 0,
      display: "flex",
      width: size,
    },
    fileIdentifier: {
      width: size / 8,
      // fontWeight: "bold",
      textAlign: "end",
      margin: 0,
      padding: ".5em .5em .5em .5em",
    },
  };

  const [boardLayout, setBoardLayout] = useState([]);
  const [pieceClicked, setPieceClicked] = useState({});

  useEffect(() => {
    const parseFEN = (fen) => {
      const designations = fen.split(" ");
      const ranks = designations[0].split("/");
      const colorToMove = designations[1];
      const castlingAbility = designations[2];
      const enPassant = designations[3];
      const halfMove = designations[4];
      const fullMove = designations[5];

      const squares = [];
      // loop through ranks
      for (let rank = 0; rank < ranks.length; rank++) {
        
        let temp = [];

        // loop through files (letter (piece) or number (num of empty spaces))
        for (let file = 0; file < ranks[rank].length; file++) {
          
          if (isNaN(ranks[rank][file])) {// is the string a letter

            temp.push(ranks[rank][file]); // push to temp

          } else { // string is a number
            for (let i = 0; i < parseInt(ranks[rank][file]); i++) { // add false for each empty space
              temp.push(false); // think about changing false to empty string, keep array type the same.
            }
          }
        }
        // squares gets pushed each rank (letters or false for each square on board) ==> 2D array
        squares.push(temp);
      }

      return {
        squares,
        colorToMove,
        castlingAbility,
        enPassant,
        halfMove,
        fullMove,
      };
    };

    const { squares } = parseFEN(fen);

    

    setBoardLayout(squares);

    
  }, [fen]);

  return (
    <Box id="board" {...styles.board} >
      {boardLayout.length > 0 &&
        boardLayout.map((rank, rankNum) => {
          return (
            <Box {...styles.rankContainer} key={`rank-${rankNum}`}>
              {rank.map((pieceID, fileNum) => {
                // No piece is clicked
                if (Object.keys(pieceClicked).length === 0){
                    return (
                        <Square
                          rank={8 - rankNum}
                          file={String.fromCharCode(97 + fileNum)}
                          boardIndices={{ rank: rankNum, file: fileNum }}
                          size={size / 8}
                          pieceID={pieceID}
                          boardLayout={boardLayout}
                          setBoardLayout={setBoardLayout}
                          pieceClicked={pieceClicked}
                          setPieceClicked={setPieceClicked}
                          showMoveIdentifier={false} // don't show move identifier
                          key={`${rankNum}-${fileNum}`}
                        />
                      );
                }else{
                    // check if the current square is a valid move of the clicked piece
                    let valid = false;
                    pieceClicked.validMoves.forEach( move => {
                        if (move.rank === rankNum && move.file === fileNum){
                            valid = true
                        }
                    })

                    return (
                        <Square
                          rank={8 - rankNum}
                          file={String.fromCharCode(97 + fileNum)}
                          boardIndices={{ rank: rankNum, file: fileNum }}
                          size={size / 8}
                          pieceID={pieceID}
                          boardLayout={boardLayout}
                          setBoardLayout={setBoardLayout}
                          pieceClicked={pieceClicked}
                          setPieceClicked={setPieceClicked}
                          showMoveIdentifier={valid} // show move identifier accordingly
                          key={`${rankNum}-${fileNum}`}
                        />
                    )
                }
                
              })}
            </Box>
          );
        })}
    </Box>
  );
};

export default Board;
