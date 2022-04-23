"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _crypto = _interopRequireDefault(require("crypto"));

var PlayerSchema = new _mongoose["default"].Schema({
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
    required: [true, "Please provide an e-mail"],
    unique: true,
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please provide a valid e-mail"]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false
  },
  signedupAt: {
    type: Date,
    required: true
  },
  permissions: Array,
  currentGameID: String,
  resetPasswordExpire: Date,
  resetPasswordToken: String,
  gameHistory: [{
    gameID: String,
    won: Boolean,
    tie: Boolean
  }],
  allGameIDs: Array
}, {
  timestamps: true
}); // Called before saved to DB
// Checks if password was modified and hashes it 

PlayerSchema.pre("save", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var salt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!this.isModified("password")) {
              next();
            }

            _context.next = 3;
            return _bcryptjs["default"].genSalt(10);

          case 3:
            salt = _context.sent;
            _context.next = 6;
            return _bcryptjs["default"].hash(this.password, salt);

          case 6:
            this.password = _context.sent;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}()); // Checks password on login

PlayerSchema.methods.matchPasswords = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].compare(password, this.password);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}(); // Provides signed JWT


PlayerSchema.methods.getSignedJWT = function () {
  return _jsonwebtoken["default"].sign({
    id: this._id,
    permissions: this.permissions
  }, process.env.JWT_SECRET);
}; // Creates reset token and expiry date


PlayerSchema.methods.getResetPasswordToken = function () {
  var resetToken = _crypto["default"].randomBytes(20).toString("hex");

  this.resetPasswordToken = _crypto["default"].crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // 10 mins
};

var Player = _mongoose["default"].model("Player", PlayerSchema);

var _default = Player;
exports["default"] = _default;