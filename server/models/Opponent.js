"use strict";

var mongoose = require("mongoose");

var OpponentSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    },
    middle: String
  },
  email: {
    type: String,
    required: true
  },
  signedupAt: {
    type: Date,
    required: true
  },
  currentGameID: String,
  gameHistory: [{
    gameID: String,
    won: Boolean,
    tie: Boolean
  }]
}, {
  timestamps: true
});
var Opponent = mongoose.model("Opponent", OpponentSchema);
module.exports = Opponent;