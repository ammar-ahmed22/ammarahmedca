"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var GameSchema = new _mongoose["default"].Schema({
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

var Game = _mongoose["default"].model("Game", GameSchema);

var _default = Game;
exports["default"] = _default;