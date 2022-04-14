class MoveChecker{
    constructor(piece, color, boardLayout, boardIndices) {
        this.piece = piece;
        this.color = color;
        this.boardLayout = boardLayout;
        this.boardIndices = boardIndices;
    }

    oneDIndex = (rank, file) => {
        return (rank * 8) + file
    }

    oneDTo2D = (idx) => {
        return {
            rank : Math.floor(idx / 8),
            file : idx % 8
        }
    }

    getEmptySpots = () => {

        const emptySpots = [];

        for (let rank = 0; rank < this.boardLayout.length; rank++){
            for (let file = 0; file < this.boardLayout[rank].length; file++){
                if (!this.boardLayout[rank][file]){
                    emptySpots.push(this.oneDIndex(rank, file))
                }
            }
        }

        return emptySpots;
    }

    colorAtMove = (move) => {
        const { rank, file } = move;

        if (rank > 7 || rank < 0 || file > 7 || rank < 0){
            return false
        }

        const pieceIdAtMove = this.boardLayout[rank][file]

        if (!pieceIdAtMove){
            return false
        }

        return pieceIdAtMove.toLowerCase() === pieceIdAtMove ? "black" : "white"
        
    }

    checkCanTake = (moveAttempt) => {
        //for a pawn this would be up and to right or left
        const { rank, file } = moveAttempt;

        const color = this.colorAtMove(moveAttempt);
        
        //const pieceIdAtMove = this.boardLayout[rank][file]
        

        if (!color){
            return false
        }

        
        
        if (this.color !== color){
            return true
        }else{
            return false
        }
    }

    // returns moves in a given straight line that can be blocked by pieces
    getBlockingLineMoves = ({ diagonal=null, vertical=null, horizontal=null}, direction ) => {
        const { rank, file } = this.boardIndices;
        const emptySpots = this.getEmptySpots();
        const res = [];

        // checks move attempt, if blocked, returns true, otherwise push to res
        const checkMoveAttempt = (toMove) => {
    
            const toMoveIdx = this.oneDIndex(toMove.rank, toMove.file);

            if (this.checkCanTake(toMove)){
                res.push(toMove);
                return true
            }

            if (emptySpots.indexOf(toMoveIdx) === -1){
                return true
            }
            
            res.push(toMove)

        }

        if (diagonal){
            
            const { up, left } = diagonal;
            // loops backwards if left, forwards if not
            for (let i = left ? file - 1 : file + 1; left ? i >= 0 : i <=7 ; left ? i-- : i++){
                const toMove = { 
                    rank: rank + ((direction * up ? 1 : -1) * Math.abs(file - i)),// math
                    file: i
                }

                const blocked = checkMoveAttempt(toMove);

                if (blocked){
                    break;
                }


            }
            
        }

        if (vertical){
            const { up } = vertical;
            // loops forwards if up, backwords if not
            for (let i = up ? rank + 1 : rank - 1; up ? i <= 7 : i >= 0; up ? i++ : i--){
                
                const toMove = {
                    rank: i,
                    file: file
                }

                const blocked = checkMoveAttempt(toMove)

                if (blocked){
                    break;
                }
            }
            
        }

        if (horizontal){
            const { left } = horizontal;
            // loops backwards if left, forwards if not
            for (let i = left ? file - 1 : file + 1; left ? i >= 0 : i <= 7; left ? i-- : i++){
                const toMove = {
                    rank: rank,
                    file: i
                }

                const blocked = checkMoveAttempt(toMove);

                if (blocked){
                    break;
                }
            }
        }
        
        
        return res;

    }

    indicesOfValidMoves = () => {

        const emptySpots = this.getEmptySpots();
        const { rank, file } = this.boardIndices;
        const direction = this.color === "white" ? -1 : 1

        const validMoves = [];

        switch (this.piece) {
            case "pawn":

                

                const hasMoved = this.color === "white" ? rank !== 6 : rank !== 1;

            

                const moveAttempts = [];
                // can take on both sides
                if (file > 0 && file < 7){
                    moveAttempts.push({ rank: rank + direction, file: file - 1})
                    moveAttempts.push({ rank: rank + direction, file: file + 1})
                }else if (file === 0){ // can take only on right side
                    moveAttempts.push({ rank: rank + direction, file: file + 1})
                }else{// can take only on left side
                    moveAttempts.push({ rank: rank + direction, file: file - 1})
                }

                moveAttempts.forEach( moveAttempt => {
                    if (this.checkCanTake(moveAttempt)){
                        validMoves.push(moveAttempt)
                    }
                })

                if (hasMoved){
                    const possibleMove = this.oneDIndex(rank + direction, file);
                    if (emptySpots.indexOf(possibleMove) !== -1){
                        validMoves.push(this.oneDTo2D(possibleMove))
                    }
                    
                }else{

                    const possibleMoves = [];

                    for (let i = 1; i < 3; i++){
                        const tempRank = rank + direction*i;
                        const tempFile = file;

                        if (!this.boardLayout[tempRank][tempFile]){
                            possibleMoves.push(this.oneDIndex(tempRank, tempFile))
                        }else{
                            break;
                        }
                    }

                    
                    possibleMoves.forEach( item => {
                        if (emptySpots.indexOf(item) !== -1){
                            validMoves.push(this.oneDTo2D(item))
                        }
                    })
                }

                
                break;
            case "knight":
                // figure out how to refactor this
                const possibleMoves = [
                    {
                        rank: rank + 2,
                        file: file + 1
                    },
                    {
                        rank: rank + 2,
                        file: file - 1,
                    },
                    {
                        rank: rank - 2,
                        file: file + 1
                    },
                    {
                        rank: rank - 2,
                        file: file - 1
                    },
                    {
                        rank: rank + 1,
                        file: file + 2
                    },
                    {
                        rank: rank - 1,
                        file: file + 2,
                    },
                    {
                        rank: rank + 1,
                        file: file - 2,
                    },
                    {
                        rank: rank - 1,
                        file: file - 2
                    }
                ].filter( possibleMove => {
                    // moves goes outside of board
                    if (possibleMove.rank > 7 || possibleMove.rank < 0 || possibleMove.file > 7 || possibleMove.file < 0){
                        return false
                    }
                    return true
                })
                
                
                possibleMoves.forEach( possibleMove => {
                    if (this.checkCanTake(possibleMove) || emptySpots.indexOf(this.oneDIndex(possibleMove.rank, possibleMove.file)) !== -1){
                        validMoves.push(possibleMove)
                    }
                })

                break;
            
            case "bishop":
            
                const bishopDirs = [
                    {
                        up: true,
                        left: true,
                    },
                    {
                        up: true,
                        left: false,
                    },
                    {
                        up: false,
                        left: true,
                    },
                    {
                        up: false,
                        left: false,
                    },
                ]

                bishopDirs.forEach( directionToCheck => {
                    validMoves.push(...this.getBlockingLineMoves({ diagonal: directionToCheck }, direction))
                })
                break;

            case "rook":
                
                const rookDirs = {
                    vertical: [{ up: true}, { up: false }],
                    horizontal: [{ left: true}, { left: false }]
                }

                for (let key in rookDirs){
                    rookDirs[key].forEach( dir => {
                        if (key === "vertical"){
                            validMoves.push(...this.getBlockingLineMoves({ vertical: dir }, direction ))
                        }else{
                            validMoves.push(...this.getBlockingLineMoves({ horizontal: dir}, direction ))
                        }
                    })
                }


            case "queen":

                const queenDirs = {
                    diagonal: [
                        {
                            // up and to the left
                            up: true,
                            left: true,
                        },
                        {
                            // up and to the right
                            up: true,
                            left: false,
                        },
                        {
                            // down and to the left
                            up: false,
                            left: true,
                        },
                        {   
                            // down and to the right
                            up: false,
                            left: false,
                        },
                    ],
                    vertical: [{ up: true}, { up: false }],
                    horizontal: [{ left: true}, { left: false }]   
                }

                for (let key in queenDirs){
                    queenDirs[key].forEach( dir => {
                        if (key === "diagonal"){
                            validMoves.push(...this.getBlockingLineMoves({ diagonal: dir }, direction ))
                        }else if (key === "vertical"){
                            validMoves.push(...this.getBlockingLineMoves({ vertical: dir }, direction ))
                        }else{
                            validMoves.push(...this.getBlockingLineMoves({ horizontal: dir }, direction ))
                        }
                    })
                }
            
            case "king":

            default:
                break;
            
            
            
        }

        return validMoves
    }

}


export default MoveChecker