"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _client = require("@notionhq/client");

var Notion = /*#__PURE__*/(0, _createClass2["default"])(function Notion(integrationKey) {
  var _this = this;

  (0, _classCallCheck2["default"])(this, Notion);
  (0, _defineProperty2["default"])(this, "databaseGet", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dbId, filter, sorts) {
      var res;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!filter && !sorts)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", new Error("Provide a filter or sort"));

            case 2:
              _context.prev = 2;
              _context.next = 5;
              return _this.notion.databases.query({
                database_id: dbId,
                filter: filter,
                sorts: sorts
              });

            case 5:
              res = _context.sent;

              if (!res) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.results);

            case 8:
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);
              return _context.abrupt("return", new Error(_context.t0));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 10]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  (0, _defineProperty2["default"])(this, "blocksGet", /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(blockId) {
      var response;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.notion.blocks.children.list({
                block_id: blockId
              });

            case 2:
              response = _context2.sent;
              return _context2.abrupt("return", response.results);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  this.notion = new _client.Client({
    auth: integrationKey
  });
  this.db = {
    get: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
        var dbId, _ref3$filter, filter, _ref3$sorts, sorts;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                dbId = _ref3.dbId, _ref3$filter = _ref3.filter, filter = _ref3$filter === void 0 ? {
                  or: []
                } : _ref3$filter, _ref3$sorts = _ref3.sorts, sorts = _ref3$sorts === void 0 ? [] : _ref3$sorts;
                return _context3.abrupt("return", _this.databaseGet(dbId, filter, sorts));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function get(_x5) {
        return _get.apply(this, arguments);
      }

      return get;
    }(),
    add: function add() {
      return _this.databaseAdd();
    }
  };
  this.blocks = {
    get: function () {
      var _get2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
        var blockId;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                blockId = _ref4.blockId;
                return _context4.abrupt("return", _this.blocksGet(blockId));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function get(_x6) {
        return _get2.apply(this, arguments);
      }

      return get;
    }()
  };
});
var _default = Notion;
exports["default"] = _default;