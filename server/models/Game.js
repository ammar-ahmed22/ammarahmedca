"use strict";

var mongoose = require("mongoose");

var GameSchema = new mongoose.Schema({
  oppID: {
    type: String,
    required: true
  },
  moves: [{
    fen: String,
    playedAt: Date
  }],
  oppToMove: {
    type: Boolean,
    required: true
  },
  oppWon: {
    type: Boolean,
    required: true
  },
  tied: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});
var Game = mongoose.model("Game", GameSchema);
module.exports = Game;