import React, { useEffect, useState } from "react";
import Square from "./Square";

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

      for (let rank = 0; rank < ranks.length; rank++) {
        let temp = [];
        for (let file = 0; file < ranks[rank].length; file++) {
          if (isNaN(ranks[rank][file])) {
            temp.push(ranks[rank][file]);
          } else {
            for (let i = 0; i < parseInt(ranks[rank][file]); i++) {
              temp.push(false);
            }
          }
        }

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

    //console.log(squares);

    setBoardLayout(squares);

    //console.log(pieceClicked);
  }, [fen]);

  return (
    <div id="board" style={styles.board}>
      {boardLayout.length > 0 &&
        boardLayout.map((rank, rankNum) => {
          return (
            <div style={styles.rankContainer} key={`rank-${rankNum}`}>
              {rank.map((pieceID, fileNum) => {
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
                          showMoveIdentifier={false}
                          key={`${rankNum}-${fileNum}`}
                        />
                      );
                }else{
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
                          showMoveIdentifier={valid}
                          key={`${rankNum}-${fileNum}`}
                        />
                    )
                }
                
              })}
            </div>
          );
        })}
    </div>
  );
};

export default Board;
