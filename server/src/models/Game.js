import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
    oppID: { type: String, required: true},
    moves: [{ fen: String, playedAt: Date }],
    oppToMove: {type: Boolean, required: true },
    oppWon: { type: Boolean, required: true },
    tied: { type: Boolean, required: true },
}, { timestamps: true })

const Game = mongoose.model("Game", GameSchema);

export default Game;