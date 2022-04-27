import Player from "../models/Player";
import Game from "../models/Game";
import { UserInputError } from "apollo-server-express";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail";
import readContent from "../utils/readContent";
import { getPathPrefix } from "../utils/helpers";

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
        },
        getPlayer: async (_, args, { auth: { id }}) => {
            const player = await Player.findById(id);
            
            return player;
        }
    }
const chessMutations = {
        register: async (_, { firstName, lastName, email, password }) => {

            const existingOpp = await Player.find({ email })

            if (existingOpp.length){
                console.log(`PLAYER WITH EMAIL: ${email} ALREADY EXISTS`)
                console.log(existingOpp)
                throw new UserInputError("Player with email already exists", {
                    email
                })
            }

            const name = {
                first: firstName,
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

            return {token: player.getSignedJWT(), message: "Player created!"};
            
        },
        completeProfile: async (_, { company, position, foundFrom }, { auth: { id } }) => {
            const player = await Player.findById(id);

            player.company = company;
            player.position = position;
            player.foundFrom = foundFrom;

            await player.save();

            return { token: player.getSignedJWT(), message: "Player profile updated." }
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

            return {token: player.getSignedJWT(), message: "Logged in!"};
        },
        forgotPassword: async (_, { email }) => {
            const player = await Player.findOne({ email });

            if (!player){
                throw new UserInputError("No player found!", { email })
            }

            const resetToken = await player.getResetPasswordToken();

            await player.save();

            try {
                const resetLink = `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ammarahmed.ca"}/chess/resetpassword?token=${resetToken}`
                const emailHTML = readContent(`${getPathPrefix(process.env.NODE_ENV)}emails/resetPassword.html`).replace("RESET_LINK", resetLink);
                
                
                await sendEmail({ to: email, subject: "Reset password for ammarahmed.ca", html: emailHTML});
            } catch (error) {
                player.resetPasswordToken = undefined;
                player.resetPasswordExpire = undefined;

                await player.save();

                console.log(error)
                throw new UserInputError("Error sending email")
            }
            
            return resetToken;

        },
        resetPassword: async (_, { newPassword, resetToken }) => {
            const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

            const player = await Player.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() }
            })

            if (!player){
                throw new UserInputError("Invalid reset token")
            }

            console.log(player)
            player.password = newPassword;
            player.resetPasswordToken = undefined;
            player.resetPasswordExpire = undefined;

            await player.save();

            return "Success"
        }
    }
    


export { chessQueries, chessMutations };