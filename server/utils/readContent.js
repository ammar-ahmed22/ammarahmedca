"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = require("fs");

var readContent = function readContent(file) {
  return (0, _fs.readFileSync)(file).toString("utf-8");
};

var _default = readContent;
exports["default"] = _default;