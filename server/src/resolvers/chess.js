import Player from "../models/Player";
import Game from "../models/Game";
import { UserInputError } from "apollo-server-express";

// RENAME EVERYTHING WITH OPP TO PLAYER

const chessQueries = {
        getAllPlayers: async () => {
            const players = await Player.find({});

            if (players.length){
                return players;
            }else{
                throw new UserInputError("No opponents found")
            }
        },
        getPlayerById: async (_, { id }) => {
            const opp = await Player.findById(id);

            if (opp){
                return opp
            }else{
                throw new UserInputError("No opponent found with id", { id })
            }
        },
        getGame: async (_, { gameID }) => {
            const game = await Game.findById(gameID);

            if (!game){
                throw new UserInputError("No game found with id", { gameID });
            }

            return game;
        },
        testAuth: (_, args, { auth }) => {
            console.log(auth);

            return "testing auth"
        }
    }
const chessMutations = {
        createPlayer: async (_, { firstName, lastName, middleName, email, password }) => {

            const existingOpp = await Player.find({ email })

            if (existingOpp.length){
                console.log(`PLAYER WITH EMAIL: ${email} ALREADY EXISTS`)
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

            const player = await Player.create({
                name,
                email,
                password,
                signedupAt: new Date(),
                currentGameID: null,
                permissions: ["read:own_user", "write:own_user"],
                gameHistory: [],
                allGameIDs: [],
            })

            if (player){
                game = await Game.create({
                    playerID: player.id,
                    moves: [{fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', playedAt: null}],
                    playerToMove: true,
                    playerWon: false,
                    tied: false
                })

                if (game){
                    player.currentGameID = game.id;
                    player.allGameIDs.push(game.id);
                    await player.save();
                }
            }

            return player.getSignedJWT();
            
        },
        addMove: async (_, { gameID, fen }) => {
            const game = await Game.findById(gameID);

            if (!game){
                throw new UserInputError("No game found with id", { gameID })
            }

            game.moves.push({ fen, playedAt: new Date()})

            await game.save();

            return game
        },
        login: async (_, { email, password }) => {
            const player = await Player.findOne({ email }).select("+password");

            if (!player){
                throw new UserInputError("User not found")
            }

            const isMatched = await player.matchPasswords(password);

            if (!isMatched){
                throw new UserInputError("Invalid credentials");
            }

            return player.getSignedJWT();
        }
    }
    


export { chessQueries, chessMutations };