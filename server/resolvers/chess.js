const Opponent = require("../models/Opponent");
const Game = require("../models/Game");
const { UserInputError } = require("apollo-server-express")

const resolvers = {
    Query: {
        getAllOpponents: async () => {
            const opps = await Opponent.find({});

            if (opps.length){
                return opps;
            }else{
                throw new UserInputError("No opponents found")
            }
        },
        getOpponentByEmail: async (_, { email }) => {
            const opps = await Opponent.find({ email });

            if (opps.length){
                return opps[0]
            }else{
                throw new UserInputError("No opponents found with email", { email })
            }
        },
        getOpponentById: async (_, { id }) => {
            const opp = await Opponent.findById(id);

            if (opp){
                return opp
            }else{
                throw new UserInputError("No opponent found with id", { id })
            }
        }
    },
    Mutation: {
        createOpponent: async (_, { firstName, lastName, middleName, email }) => {

            //console.log(firstName, lastName, middleName, email)

            const existingOpp = await Opponent.find({ email })

            if (existingOpp.length){
                console.log(`OPPONENT WITH EMAIL: ${email} ALREADY EXISTS`)
                console.log(existingOpp)
                throw new UserInputError("Opponent with email already exists", {
                    email
                })
            }

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

            
            
            
            

            return game
            
        }
    }
    
}

module.exports = resolvers;