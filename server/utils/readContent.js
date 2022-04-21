"use strict";

var _require = require("fs"),
    readFileSync = _require.readFileSync;

var fs = require("fs");

var readContent = function readContent(file) {
  return readFileSync(file).toString("utf-8");
};

module.exports = readContent;