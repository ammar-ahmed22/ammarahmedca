import Opponent from "../models/Opponent";
import Game from "../models/Game";
import { UserInputError } from "apollo-server-express";



const chessQueries = {
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
        },
        getGame: async (_, { id }) => {
            const game = await Game.findById(id);

            if (!game){
                throw new UserInputError("No game found with id", { id });
            }

            return game;
        }
    }
const chessMutations = {
        createOpponent: async (_, { firstName, lastName, middleName, email }) => {

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
                    moves: [{fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', playedAt: null}],
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
            
        },
        addMove: async (_, { gameID, fen }) => {
            const game = await Game.findById(gameID);

            if (!game){
                throw new UserInputError("No game found with id", { gameID })
            }

            game.moves.push({ fen, playedAt: new Date()})

            await game.save();

            return game
        }
    }
    


export { chessQueries, chessMutations };