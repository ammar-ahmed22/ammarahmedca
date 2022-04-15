import React, { useEffect, useState } from "react";
import Square from "./Square";
import { Box } from "@chakra-ui/react"
import FENParser from "./utils/FENParser";

const Board = ({ size, fen, setFen, isFirstMove }) => {
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
    const parser = new FENParser(fen);

    const squares = parser.squaresFromFEN()

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
                          setFen={setFen}
                          pieceClicked={pieceClicked}
                          setPieceClicked={setPieceClicked}
                          showMoveIdentifier={false} // don't show move identifier
                          isFirstMove={isFirstMove}
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
                          setFen={setFen}
                          pieceClicked={pieceClicked}
                          setPieceClicked={setPieceClicked}
                          showMoveIdentifier={valid} // show move identifier accordingly
                          isFirstMove={isFirstMove}
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
