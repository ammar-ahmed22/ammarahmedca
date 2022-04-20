const Opponent = require("../models/Opponent");
const Game = require("../models/Game");

const resolvers = {
    Query: {
        getOpponent: () => {
            return {
              id: "1",
              name: {
                first: "Yasir",
                middle: "Pathan",
                last: "Ahmed"
              },
              email: "yasirahmed@gmail.com"
            }
        },
    },
    Mutation: {
        createOpponent: async (_, { firstName, lastName, middleName, email }) => {

            console.log(firstName, lastName, middleName, email)

            const name = {
                first: firstName,
                middle: middleName,
                last: lastName,
            }

            let game;

            const opp = await Opponent.create({
                name,
                email,
                signedupAt: new Date(),
                currentGameID: null,
                gameHistory: []
            })

            if (opp){
                game = await Game.create({
                    oppID: opp.id,
                    moves: [{fen: 'opening', playedAt: null}],
                    oppToMove: true,
                    oppWon: false,
                    tied: false
                })

                if (game){
                    opp.currentGameID = game.id
                    await opp.save();
                }
            }

            // console.log(game)
            // console.log(opp)

            //const { __doc } = game;

            const result = {...game}._doc
            
            delete result.__v;
            delete result.createdAt;
            delete result.updatedAt;
            
            console.log(result)

            return result
            return {
                id: "1",
                oppID: "1",
                moves: [{ fen: "openingFEN", playedAt: "now"}],
                oppToMove: true,
                oppWon: false,
                tied: false
            }
        }
    }
    
}

module.exports = resolvers;