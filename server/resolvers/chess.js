"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chessQueries = exports.chessMutations = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Player = _interopRequireDefault(require("../models/Player"));

var _Game = _interopRequireDefault(require("../models/Game"));

var _apolloServerExpress = require("apollo-server-express");

// RENAME EVERYTHING WITH OPP TO PLAYER
var chessQueries = {
  getAllPlayers: function () {
    var _getAllPlayers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var players;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _Player["default"].find({});

            case 2:
              players = _context.sent;

              if (!players.length) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", players);

            case 7:
              throw new _apolloServerExpress.UserInputError("No opponents found");

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getAllPlayers() {
      return _getAllPlayers.apply(this, arguments);
    }

    return getAllPlayers;
  }(),
  getPlayerById: function () {
    var _getPlayerById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref) {
      var id, opp;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = _ref.id;
              _context2.next = 3;
              return _Player["default"].findById(id);

            case 3:
              opp = _context2.sent;

              if (!opp) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", opp);

            case 8:
              throw new _apolloServerExpress.UserInputError("No opponent found with id", {
                id: id
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getPlayerById(_x, _x2) {
      return _getPlayerById.apply(this, arguments);
    }

    return getPlayerById;
  }(),
  getGame: function () {
    var _getGame = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_, _ref2) {
      var gameID, game;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              gameID = _ref2.gameID;
              _context3.next = 3;
              return _Game["default"].findById(gameID);

            case 3:
              game = _context3.sent;

              if (game) {
                _context3.next = 6;
                break;
              }

              throw new _apolloServerExpress.UserInputError("No game found with id", {
                gameID: gameID
              });

            case 6:
              return _context3.abrupt("return", game);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getGame(_x3, _x4) {
      return _getGame.apply(this, arguments);
    }

    return getGame;
  }(),
  testAuth: function testAuth(_, args, _ref3) {
    var auth = _ref3.auth;
    console.log(auth);
    return "testing auth";
  }
};
exports.chessQueries = chessQueries;
var chessMutations = {
  createPlayer: function () {
    var _createPlayer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_, _ref4) {
      var firstName, lastName, middleName, email, password, existingOpp, name, game, player;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              firstName = _ref4.firstName, lastName = _ref4.lastName, middleName = _ref4.middleName, email = _ref4.email, password = _ref4.password;
              _context4.next = 3;
              return _Player["default"].find({
                email: email
              });

            case 3:
              existingOpp = _context4.sent;

              if (!existingOpp.length) {
                _context4.next = 8;
                break;
              }

              console.log("PLAYER WITH EMAIL: ".concat(email, " ALREADY EXISTS"));
              console.log(existingOpp);
              throw new _apolloServerExpress.UserInputError("Opponent with email already exists", {
                email: email
              });

            case 8:
              name = {
                first: firstName,
                middle: middleName,
                last: lastName
              };
              _context4.next = 11;
              return _Player["default"].create({
                name: name,
                email: email,
                password: password,
                signedupAt: new Date(),
                currentGameID: null,
                permissions: ["read:own_user", "write:own_user"],
                gameHistory: [],
                allGameIDs: []
              });

            case 11:
              player = _context4.sent;

              if (!player) {
                _context4.next = 21;
                break;
              }

              _context4.next = 15;
              return _Game["default"].create({
                playerID: player.id,
                moves: [{
                  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                  playedAt: null
                }],
                playerToMove: true,
                playerWon: false,
                tied: false
              });

            case 15:
              game = _context4.sent;

              if (!game) {
                _context4.next = 21;
                break;
              }

              player.currentGameID = game.id;
              player.allGameIDs.push(game.id);
              _context4.next = 21;
              return player.save();

            case 21:
              return _context4.abrupt("return", player.getSignedJWT());

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function createPlayer(_x5, _x6) {
      return _createPlayer.apply(this, arguments);
    }

    return createPlayer;
  }(),
  addMove: function () {
    var _addMove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_, _ref5) {
      var gameID, fen, game;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              gameID = _ref5.gameID, fen = _ref5.fen;
              _context5.next = 3;
              return _Game["default"].findById(gameID);

            case 3:
              game = _context5.sent;

              if (game) {
                _context5.next = 6;
                break;
              }

              throw new _apolloServerExpress.UserInputError("No game found with id", {
                gameID: gameID
              });

            case 6:
              game.moves.push({
                fen: fen,
                playedAt: new Date()
              });
              _context5.next = 9;
              return game.save();

            case 9:
              return _context5.abrupt("return", game);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function addMove(_x7, _x8) {
      return _addMove.apply(this, arguments);
    }

    return addMove;
  }(),
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_, _ref6) {
      var email, password, player, isMatched;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              email = _ref6.email, password = _ref6.password;
              _context6.next = 3;
              return _Player["default"].findOne({
                email: email
              }).select("+password");

            case 3:
              player = _context6.sent;

              if (player) {
                _context6.next = 6;
                break;
              }

              throw new _apolloServerExpress.UserInputError("User not found");

            case 6:
              _context6.next = 8;
              return player.matchPasswords(password);

            case 8:
              isMatched = _context6.sent;

              if (isMatched) {
                _context6.next = 11;
                break;
              }

              throw new _apolloServerExpress.UserInputError("Invalid credentials");

            case 11:
              return _context6.abrupt("return", player.getSignedJWT());

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function login(_x9, _x10) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
exports.chessMutations = chessMutations;