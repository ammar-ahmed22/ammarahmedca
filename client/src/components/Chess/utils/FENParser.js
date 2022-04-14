class FENParser{
    constructor(fenString){
        this.fen = fenString;
        this.designations = fenString.split(" ");
        this.boardString = this.designations[0];
        this.colorToMove = this.designations[1];
        this.castlingAbility = this.designations[2];
        this.enPassant = this.designations[3];
        this.halfMoveCount = this.designations[4];
        this.fullMoveCount = this.designations[5];
    }

    squaresFromFEN = () => {
        const ranks = this.boardString.split("/");

        const squares = [];

        for (let rank = 0; rank < ranks.length; rank++){

            let temp = [];

            for (let file = 0; file < ranks[rank].length; file++){
                const value = ranks[rank][file];

                if (isNaN(value)){
                    temp.push(value)
                }else{
                    for (let i = 0; i < parseInt(value); i++){
                        temp.push(false)
                    }
                }
            }

            squares.push(temp)

        }

        return squares;
    }

    fenFromSquares = (squares, options={ colorToMove: null, castlingAbility: null, enPassant: null, halfMoveCount: null, fullMoveCount: null }) => {

        const ranks = [];
        for (let rank = 0; rank < squares.length; rank++){
            let temp = [];
            let emptySpaces = 1;
            for (let file = 0; file < squares[rank].length; file++){
                const value = squares[rank][file];
                const next = file < 7 ? squares[rank][file + 1] : null

                if (value){
                    temp.push(value)
                }else{// current is false (empty)
                    if (next !== null){
                        if (!next){// next is false (empty)
                            emptySpaces++
                        }else{//next is not empty
                            temp.push(`${emptySpaces}`)
                            emptySpaces = 1
                        }
                    }else{
                        temp.push(`${emptySpaces}`);
                        emptySpaces = 1
                    }
                }

            }

            ranks.push(temp.join(""))
        }

        const boardString = ranks.join("/");

        const designations = []

        designations[0] = boardString;

        for (let prop in options){
            if (options[prop]){
                this[prop] = options[prop]
            }
        }
        

        return `${boardString} ${this.colorToMove} ${this.castlingAbility} ${this.enPassant} ${this.halfMoveCount} ${this.fullMoveCount}`

    }
}

export default FENParser