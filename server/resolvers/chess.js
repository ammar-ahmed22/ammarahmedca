"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chessQueries = exports.chessMutations = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Opponent = _interopRequireDefault(require("../models/Opponent"));

var _Game = _interopRequireDefault(require("../models/Game"));

var _apolloServerExpress = require("apollo-server-express");

var chessQueries = {
  getAllOpponents: function () {
    var _getAllOpponents = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var opps;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _Opponent["default"].find({});

            case 2:
              opps = _context.sent;

              if (!opps.length) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", opps);

            case 7:
              throw new _apolloServerExpress.UserInputError("No opponents found");

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getAllOpponents() {
      return _getAllOpponents.apply(this, arguments);
    }

    return getAllOpponents;
  }(),
  getOpponentByEmail: function () {
    var _getOpponentByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref) {
      var email, opps;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              email = _ref.email;
              _context2.next = 3;
              return _Opponent["default"].find({
                email: email
              });

            case 3:
              opps = _context2.sent;

              if (!opps.length) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", opps[0]);

            case 8:
              throw new _apolloServerExpress.UserInputError("No opponents found with email", {
                email: email
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getOpponentByEmail(_x, _x2) {
      return _getOpponentByEmail.apply(this, arguments);
    }

    return getOpponentByEmail;
  }(),
  getOpponentById: function () {
    var _getOpponentById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_, _ref2) {
      var id, opp;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = _ref2.id;
              _context3.next = 3;
              return _Opponent["default"].findById(id);

            case 3:
              opp = _context3.sent;

              if (!opp) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", opp);

            case 8:
              throw new _apolloServerExpress.UserInputError("No opponent found with id", {
                id: id
              });

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getOpponentById(_x3, _x4) {
      return _getOpponentById.apply(this, arguments);
    }

    return getOpponentById;
  }(),
  getGame: function () {
    var _getGame = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_, _ref3) {
      var id, game;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = _ref3.id;
              _context4.next = 3;
              return _Game["default"].findById(id);

            case 3:
              game = _context4.sent;

              if (game) {
                _context4.next = 6;
                break;
              }

              throw new _apolloServerExpress.UserInputError("No game found with id", {
                id: id
              });

            case 6:
              return _context4.abrupt("return", game);

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function getGame(_x5, _x6) {
      return _getGame.apply(this, arguments);
    }

    return getGame;
  }()
};
exports.chessQueries = chessQueries;
var chessMutations = {
  createOpponent: function () {
    var _createOpponent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_, _ref4) {
      var firstName, lastName, middleName, email, password, existingOpp, name, game, opp;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              firstName = _ref4.firstName, lastName = _ref4.lastName, middleName = _ref4.middleName, email = _ref4.email, password = _ref4.password;
              _context5.next = 3;
              return _Opponent["default"].find({
                email: email
              });

            case 3:
              existingOpp = _context5.sent;

              if (!existingOpp.length) {
                _context5.next = 8;
                break;
              }

              console.log("OPPONENT WITH EMAIL: ".concat(email, " ALREADY EXISTS"));
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
              _context5.next = 11;
              return _Opponent["default"].create({
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
              opp = _context5.sent;

              if (!opp) {
                _context5.next = 21;
                break;
              }

              _context5.next = 15;
              return _Game["default"].create({
                oppID: opp.id,
                moves: [{
                  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
                  playedAt: null
                }],
                oppToMove: true,
                oppWon: false,
                tied: false
              });

            case 15:
              game = _context5.sent;

              if (!game) {
                _context5.next = 21;
                break;
              }

              opp.currentGameID = game.id;
              opp.allGameIDs.push(game.id);
              _context5.next = 21;
              return opp.save();

            case 21:
              return _context5.abrupt("return", opp.getSignedJWT());

            case 22:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function createOpponent(_x7, _x8) {
      return _createOpponent.apply(this, arguments);
    }

    return createOpponent;
  }(),
  addMove: function () {
    var _addMove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_, _ref5) {
      var gameID, fen, game;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              gameID = _ref5.gameID, fen = _ref5.fen;
              _context6.next = 3;
              return _Game["default"].findById(gameID);

            case 3:
              game = _context6.sent;

              if (game) {
                _context6.next = 6;
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
              _context6.next = 9;
              return game.save();

            case 9:
              return _context6.abrupt("return", game);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function addMove(_x9, _x10) {
      return _addMove.apply(this, arguments);
    }

    return addMove;
  }(),
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_, _ref6) {
      var email, password, opp, isMatched;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              email = _ref6.email, password = _ref6.password;
              _context7.next = 3;
              return _Opponent["default"].findOne({
                email: email
              }).select("+password");

            case 3:
              opp = _context7.sent;

              if (opp) {
                _context7.next = 6;
                break;
              }

              throw new _apolloServerExpress.UserInputError("Invalid credentials");

            case 6:
              _context7.next = 8;
              return opp.matchPasswords(password);

            case 8:
              isMatched = _context7.sent;

              if (isMatched) {
                _context7.next = 11;
                break;
              }

              throw new _apolloServerExpress.UserInputError("Invalid credentials");

            case 11:
              return _context7.abrupt("return", opp.getSignedJWT());

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function login(_x11, _x12) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
exports.chessMutations = chessMutations;