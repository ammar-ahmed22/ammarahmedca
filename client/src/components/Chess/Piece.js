import React from 'react';
import pieceSprites from '../utils/pieceSprites';
import MoveChecker from '../utils/MoveChecker';

const Piece = ({ color, piece, rank, file, boardIndices, boardLayout, setBoardLayout, setPieceClicked }) => {

    // Handles logic for dragging piece
    const handleDragStart = (e) => {
        

        const moveChecker = new MoveChecker(piece, color, boardLayout, boardIndices)

        const data = {
            color,
            piece,
            rank: boardIndices.rank,
            file: boardIndices.file,
            validMoves: moveChecker.indicesOfValidMoves()
        }

        // sends data with the drag (to be accessed when dropped)
        e.dataTransfer.setData("text/plain", JSON.stringify(data))
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "all";

    }

    // Handles when piece is clicked to show valid moves
    const handleClick = e => {
        const { rank, file } = boardIndices;

        
        const moveChecker = new MoveChecker(piece, color, boardLayout, boardIndices);

        setPieceClicked({
            validMoves: moveChecker.indicesOfValidMoves(),
            clickedPiece: { 
                rank,
                file
            }
        })

    }
    return (
        <div style={{width: "75%", height: "75%", _hover: {cursor: "pointer"}}} draggable onDragStart={handleDragStart} onClick={handleClick}>
            <img src={pieceSprites[color][piece]} style={{width: "100%", height: "100%"}}></img>
        </div>
    );
}

export default Piece;
