"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

var _connectDB = _interopRequireDefault(require("./utils/connectDB"));

var _readContent = _interopRequireDefault(require("./utils/readContent"));

var _webContent = _interopRequireDefault(require("./resolvers/webContent"));

var _chess = _interopRequireDefault(require("./resolvers/chess"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

_dotenv["default"].config({
  path: "./config.env"
});

var PORT = process.env.PORT || 5000;
var MONGO_URI = process.env.MONGO_URI;

var startServer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var app, server;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = (0, _express["default"])();
            server = new _apolloServerExpress.ApolloServer({
              typeDefs: (0, _readContent["default"])("./graphql/webContent.gql") + (0, _readContent["default"])("./graphql/chess.gql"),
              resolvers: _objectSpread(_objectSpread({}, _webContent["default"]), _chess["default"])
            });
            _context.next = 4;
            return server.start();

          case 4:
            server.applyMiddleware({
              app: app
            });
            (0, _connectDB["default"])(MONGO_URI);
            app.listen(PORT, function () {
              return console.log("Server ready at http://localhost:".concat(PORT).concat(server.graphqlPath, " \uD83D\uDE80"));
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();

startServer();