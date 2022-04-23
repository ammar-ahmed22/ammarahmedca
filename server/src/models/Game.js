import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
    playerID: { type: String, required: true},
    moves: [{ fen: String, playedAt: Date }],
    playerToMove: {type: Boolean, required: true },
    playerWon: { type: Boolean, required: true },
    tied: { type: Boolean, required: true },
}, { timestamps: true })

const Game = mongoose.model("Game", GameSchema);

export default Game;