"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var mongoose = require("mongoose");

var connectDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(URI) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return mongoose.connect(URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 2:
            console.log("Connected to MongoDB \uD83C\uDF3F with URI: ".concat(URI));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectDB(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = connectDB;