"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _apolloServerExpress = require("apollo-server-express");

var _schema = require("@graphql-tools/schema");

var _graphqlMiddleware = require("graphql-middleware");

var _express = _interopRequireDefault(require("express"));

var _expressJwt = require("express-jwt");

var _connectDB = _interopRequireDefault(require("./utils/connectDB"));

var _readContent = _interopRequireDefault(require("./utils/readContent"));

var _website = require("./resolvers/website");

var _chess = require("./resolvers/chess");

var _resolveType = _interopRequireDefault(require("./resolvers/resolveType"));

var _permissions = _interopRequireDefault(require("./utils/permissions"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

_dotenv["default"].config({
  path: "./config.env"
});

var PORT = process.env.PORT || 5000;
var MONGO_URI = process.env.MONGO_URI;
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var app, resolver, schema, server;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          app = (0, _express["default"])();
          app.use((0, _expressJwt.expressjwt)({
            secret: process.env.JWT_SECRET,
            algorithms: ["HS256"],
            credentialsRequired: false
          }));
          resolver = _objectSpread({
            Query: _objectSpread(_objectSpread({}, _website.webQueries), _chess.chessQueries),
            Mutation: _objectSpread({}, _chess.chessMutations)
          }, _resolveType["default"]);
          schema = (0, _schema.makeExecuteableSchema)({
            typeDefs: (0, _readContent["default"])("./graphql/webContent.gql") + (0, _readContent["default"])("./graphql/chess.gql"),
            resolvers: resolver
          });
          server = new _apolloServerExpress.ApolloServer({
            // typeDefs: readContent("./graphql/webContent.gql") + readContent("./graphql/chess.gql"),
            // resolvers: resolver,
            schema: (0, _graphqlMiddleware.applyMiddleware)(schema, _permissions["default"]),
            context: function context(_ref2) {
              var req = _ref2.req;
              //console.log(req)
              var auth = req.auth || null;
              return {
                auth: auth
              };
            }
          });
          _context.next = 7;
          return server.start();

        case 7:
          server.applyMiddleware({
            app: app
          }); // server.applyMiddleware({ permissions })

          (0, _connectDB["default"])(MONGO_URI);
          app.listen(PORT, function () {
            return console.log("Server ready at http://localhost:".concat(PORT).concat(server.graphqlPath, " \uD83D\uDE80"));
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();