"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var typeResolver = {
  TextOrImage: {
    __resolveType: function __resolveType(obj, context, info) {
      if (obj.annotations) {
        return "Text";
      } else if (obj.url) {
        return "Image";
      } else {
        return null;
      }
    }
  }
};
var _default = typeResolver;
exports["default"] = _default;