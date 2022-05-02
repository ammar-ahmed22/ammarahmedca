"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlShield = require("graphql-shield");

var checkPermission = function checkPermission(auth, permission) {
  if (auth && auth.permissions) {
    return auth.permissions.includes(permission);
  }

  ;
  return false;
};

var isAuthenticated = (0, _graphqlShield.rule)()(function (p, a, _ref) {
  var auth = _ref.auth;
  return auth !== null;
});
var anyone = (0, _graphqlShield.rule)()(function () {
  return true;
});
var canReadAnyUser = (0, _graphqlShield.rule)()(function (p, a, _ref2) {
  var auth = _ref2.auth;
  return checkPermission(auth, "read:any_user");
});
var canReadOwnUser = (0, _graphqlShield.rule)()(function (p, a, _ref3) {
  var auth = _ref3.auth;
  return checkPermission(auth, "read:own_user");
});
var canWriteAnyUser = (0, _graphqlShield.rule)()(function (p, a, _ref4) {
  var auth = _ref4.auth;
  return checkPermission(auth, "write:any_user");
});
var canWriteOwnUser = (0, _graphqlShield.rule)()(function (p, a, _ref5) {
  var auth = _ref5.auth;
  return checkPermission(auth, "write:own_user");
});
var isReadingOwnUser = (0, _graphqlShield.rule)()(function (p, _ref6, _ref7) {
  var id = _ref6.id;
  var auth = _ref7.auth;
  return auth && auth.id === id;
});
var isAccessingOwnGame = (0, _graphqlShield.rule)()(function (p, _ref8, _ref9) {
  var gameID = _ref8.gameID;
  var auth = _ref9.auth;
  return auth && auth.allGameIDs && auth.allGameIDs.includes(gameID);
});
var isSuperUser = (0, _graphqlShield.rule)()(function (p, a, _ref10) {
  var auth = _ref10.auth;
  return checkPermission(auth, "super_user");
});

var _default = (0, _graphqlShield.shield)({
  Query: {
    getPlayerById: (0, _graphqlShield.or)((0, _graphqlShield.and)(canReadOwnUser, isReadingOwnUser), canReadAnyUser),
    getAllPlayers: canReadAnyUser,
    getGame: (0, _graphqlShield.or)(isSuperUser, isAccessingOwnGame),
    getPlayer: (0, _graphqlShield.and)(isAuthenticated, canReadOwnUser)
  },
  Mutation: {
    addMove: (0, _graphqlShield.or)(isSuperUser, isAccessingOwnGame),
    completeProfile: (0, _graphqlShield.or)(canWriteOwnUser, isSuperUser)
  }
}, {
  debug: true
});

exports["default"] = _default;