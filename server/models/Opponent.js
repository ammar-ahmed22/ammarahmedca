"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var OpponentSchema = new _mongoose["default"].Schema({
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

var Opponent = _mongoose["default"].model("Opponent", OpponentSchema);

var _default = Opponent;
exports["default"] = _default;