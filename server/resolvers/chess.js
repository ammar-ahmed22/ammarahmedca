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

var _crypto = _interopRequireDefault(require("crypto"));

var _sendEmail = _interopRequireDefault(require("../utils/sendEmail"));

var _readContent = _interopRequireDefault(require("../utils/readContent"));

var _helpers = require("../utils/helpers");

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
  },
  getPlayer: function () {
    var _getPlayer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_, args, _ref4) {
      var id, player;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = _ref4.auth.id;
              _context4.next = 3;
              return _Player["default"].findById(id);

            case 3:
              player = _context4.sent;
              return _context4.abrupt("return", player);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function getPlayer(_x5, _x6, _x7) {
      return _getPlayer.apply(this, arguments);
    }

    return getPlayer;
  }()
};
exports.chessQueries = chessQueries;
var chessMutations = {
  register: function () {
    var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_, _ref5) {
      var firstName, lastName, email, password, existingOpp, name, game, player;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              firstName = _ref5.firstName, lastName = _ref5.lastName, email = _ref5.email, password = _ref5.password;
              _context5.next = 3;
              return _Player["default"].find({
                email: email
              });

            case 3:
              existingOpp = _context5.sent;

              if (!existingOpp.length) {
                _context5.next = 8;
                break;
              }

              console.log("PLAYER WITH EMAIL: ".concat(email, " ALREADY EXISTS"));
              console.log(existingOpp);
              throw new _apolloServerExpress.UserInputError("Player with email already exists", {
                email: email
              });

            case 8:
              name = {
                first: firstName,
                last: lastName
              };
              _context5.next = 11;
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
              player = _context5.sent;

              if (!player) {
                _context5.next = 21;
                break;
              }

              _context5.next = 15;
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
              game = _context5.sent;

              if (!game) {
                _context5.next = 21;
                break;
              }

              player.currentGameID = game.id;
              player.allGameIDs.push(game.id);
              _context5.next = 21;
              return player.save();

            case 21:
              return _context5.abrupt("return", {
                token: player.getSignedJWT(),
                message: "Player created!"
              });

            case 22:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function register(_x8, _x9) {
      return _register.apply(this, arguments);
    }

    return register;
  }(),
  completeProfile: function () {
    var _completeProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_, _ref6, _ref7) {
      var company, position, foundFrom, id, player;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              company = _ref6.company, position = _ref6.position, foundFrom = _ref6.foundFrom;
              id = _ref7.auth.id;
              _context6.next = 4;
              return _Player["default"].findById(id);

            case 4:
              player = _context6.sent;
              player.company = company;
              player.position = position;
              player.foundFrom = foundFrom;
              _context6.next = 10;
              return player.save();

            case 10:
              return _context6.abrupt("return", {
                token: player.getSignedJWT(),
                message: "Player profile updated."
              });

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function completeProfile(_x10, _x11, _x12) {
      return _completeProfile.apply(this, arguments);
    }

    return completeProfile;
  }(),
  addMove: function () {
    var _addMove = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_, _ref8) {
      var gameID, fen, game;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              gameID = _ref8.gameID, fen = _ref8.fen;
              _context7.next = 3;
              return _Game["default"].findById(gameID);

            case 3:
              game = _context7.sent;

              if (game) {
                _context7.next = 6;
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
              _context7.next = 9;
              return game.save();

            case 9:
              return _context7.abrupt("return", game);

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function addMove(_x13, _x14) {
      return _addMove.apply(this, arguments);
    }

    return addMove;
  }(),
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_, _ref9) {
      var email, password, player, isMatched;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              email = _ref9.email, password = _ref9.password;
              _context8.next = 3;
              return _Player["default"].findOne({
                email: email
              }).select("+password");

            case 3:
              player = _context8.sent;

              if (player) {
                _context8.next = 6;
                break;
              }

              throw new _apolloServerExpress.UserInputError("User not found");

            case 6:
              _context8.next = 8;
              return player.matchPasswords(password);

            case 8:
              isMatched = _context8.sent;

              if (isMatched) {
                _context8.next = 11;
                break;
              }

              throw new _apolloServerExpress.UserInputError("Invalid credentials");

            case 11:
              return _context8.abrupt("return", {
                token: player.getSignedJWT(),
                message: "Logged in!"
              });

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function login(_x15, _x16) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  forgotPassword: function () {
    var _forgotPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(_, _ref10) {
      var email, player, resetToken, resetLink, emailHTML;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              email = _ref10.email;
              _context9.next = 3;
              return _Player["default"].findOne({
                email: email
              });

            case 3:
              player = _context9.sent;

              if (player) {
                _context9.next = 6;
                break;
              }

              throw new _apolloServerExpress.UserInputError("No player found!", {
                email: email
              });

            case 6:
              _context9.next = 8;
              return player.getResetPasswordToken();

            case 8:
              resetToken = _context9.sent;
              _context9.next = 11;
              return player.save();

            case 11:
              _context9.prev = 11;
              resetLink = "".concat(process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ammarahmed.ca", "/chess/resetpassword?token=").concat(resetToken);
              emailHTML = (0, _readContent["default"])("".concat((0, _helpers.getPathPrefix)(process.env.NODE_ENV), "emails/resetPassword.html")).replace("RESET_LINK", resetLink);
              _context9.next = 16;
              return (0, _sendEmail["default"])({
                to: email,
                subject: "Reset password for ammarahmed.ca",
                html: emailHTML
              });

            case 16:
              _context9.next = 26;
              break;

            case 18:
              _context9.prev = 18;
              _context9.t0 = _context9["catch"](11);
              player.resetPasswordToken = undefined;
              player.resetPasswordExpire = undefined;
              _context9.next = 24;
              return player.save();

            case 24:
              console.log(_context9.t0);
              throw new _apolloServerExpress.UserInputError("Error sending email");

            case 26:
              return _context9.abrupt("return", resetToken);

            case 27:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[11, 18]]);
    }));

    function forgotPassword(_x17, _x18) {
      return _forgotPassword.apply(this, arguments);
    }

    return forgotPassword;
  }(),
  resetPassword: function () {
    var _resetPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(_, _ref11) {
      var newPassword, resetToken, resetPasswordToken, player;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              newPassword = _ref11.newPassword, resetToken = _ref11.resetToken;
              resetPasswordToken = _crypto["default"].createHash("sha256").update(resetToken).digest("hex");
              _context10.next = 4;
              return _Player["default"].findOne({
                resetPasswordToken: resetPasswordToken,
                resetPasswordExpire: {
                  $gt: Date.now()
                }
              });

            case 4:
              player = _context10.sent;

              if (player) {
                _context10.next = 7;
                break;
              }

              throw new _apolloServerExpress.UserInputError("Invalid reset token");

            case 7:
              console.log(player);
              player.password = newPassword;
              player.resetPasswordToken = undefined;
              player.resetPasswordExpire = undefined;
              _context10.next = 13;
              return player.save();

            case 13:
              return _context10.abrupt("return", "Success");

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    function resetPassword(_x19, _x20) {
      return _resetPassword.apply(this, arguments);
    }

    return resetPassword;
  }()
};
exports.chessMutations = chessMutations;