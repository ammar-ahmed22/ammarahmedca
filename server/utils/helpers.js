"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPathPrefix = void 0;

var getPathPrefix = function getPathPrefix(env) {
  if (env === 'development') {
    return "./src/";
  } else {
    return "./";
  }
};

exports.getPathPrefix = getPathPrefix;