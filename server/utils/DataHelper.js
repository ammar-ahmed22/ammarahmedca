"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var DataHelper = /*#__PURE__*/(0, _createClass2["default"])(function DataHelper() {
  var _this = this;

  var notion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  (0, _classCallCheck2["default"])(this, DataHelper);
  (0, _defineProperty2["default"])(this, "readPropertyContent", function (property) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      includeDateEnd: false
    };
    var type = property.type;
    var value = property[type];

    switch (type) {
      case "title":
      case "rich_text":
        return value.length > 0 ? value[0].plain_text : "";
        break;

      case "multi_select":
        return value.map(function (item) {
          return item.name;
        });

      case "select":
        return value ? value.name : "";

      case "url":
        return value;

      case "date":
        if (options.includeDateEnd) {
          var start = value.start,
              end = value.end;
          return {
            start: start,
            end: end
          };
        } else {
          return value.start;
        }

      case "checkbox":
        return value;

      default:
        throw new Error("unable to get property content");
    }
  });
  (0, _defineProperty2["default"])(this, "readBlockContent", function (block) {
    var type = block.type;

    if (type === "code") {
      var language = block[type].language;
      return {
        type: type,
        content: block[type].text.map(function (textBlock) {
          var plain_text = textBlock.plain_text,
              annotations = textBlock.annotations;
          annotations.language = language;
          return {
            plain_text: plain_text,
            annotations: annotations
          };
        })
      };
    }

    if (type !== "image") {
      return {
        type: type,
        content: block[type].text.map(function (textBlock) {
          var plain_text = textBlock.plain_text,
              annotations = textBlock.annotations;
          return {
            plain_text: plain_text,
            annotations: annotations
          };
        })
      };
    } else {
      var url = block[type].file.url;
      var caption = block[type].caption.length > 0 ? block[type].caption[0].plain_text : "";
      return {
        type: type,
        content: [{
          url: url,
          caption: caption
        }]
      };
    }
  });
  (0, _defineProperty2["default"])(this, "monthYearFromISO", function (dateStr) {
    var _dateStr$split$map = dateStr.split("-").map(function (num) {
      return parseInt(num);
    }),
        _dateStr$split$map2 = (0, _slicedToArray2["default"])(_dateStr$split$map, 3),
        y = _dateStr$split$map2[0],
        m = _dateStr$split$map2[1],
        d = _dateStr$split$map2[2];

    var date = new Date(y, m - 1, d);
    var month = date.toLocaleString("en-US", {
      month: "long"
    });
    return "".concat(month, " ").concat(y);
  });
  (0, _defineProperty2["default"])(this, "calculateReadTime", function (blocks) {
    var totalWords = 0;

    for (var i = 0; i < blocks.length; i++) {
      var blockContent = _this.readBlockContent(blocks[i]);

      if (blockContent && blockContent.type !== "image") {
        blockContent.content.forEach(function (item) {
          totalWords += item.plain_text.split(" ").length;
        }); //totalWords += blockContent.content[0].split(" ").length
      }
    }

    var time = totalWords / 200;
    var minutes = Math.floor(time);
    var seconds = Math.floor((time - Math.floor(time)) * 60);
    return {
      time: time,
      minutes: minutes,
      seconds: seconds
    };
  });
  (0, _defineProperty2["default"])(this, "parseBlogInfo", /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(pages) {
      var result;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Promise.all(pages.map( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(page, idx) {
                  var _page$properties, Name, Timeline, Type, Languages, GitHub, External, Description, Frameworks, Published, isBlog, isProject, Category, id, last_edited_time, blocks, readTime;

                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _page$properties = page.properties, Name = _page$properties.Name, Timeline = _page$properties.Timeline, Type = _page$properties.Type, Languages = _page$properties.Languages, GitHub = _page$properties.GitHub, External = _page$properties.External, Description = _page$properties.Description, Frameworks = _page$properties.Frameworks, Published = _page$properties.Published, isBlog = _page$properties.isBlog, isProject = _page$properties.isProject, Category = _page$properties.Category;
                          id = page.id, last_edited_time = page.last_edited_time;
                          _context.next = 4;
                          return _this.notion.blocks.get({
                            blockId: id
                          });

                        case 4:
                          blocks = _context.sent;
                          readTime = Math.round(_this.calculateReadTime(blocks).time);
                          return _context.abrupt("return", {
                            id: id,
                            lastEdited: last_edited_time,
                            name: _this.readPropertyContent(Name),
                            timeline: _this.readPropertyContent(Timeline),
                            type: _this.readPropertyContent(Type),
                            languages: _this.readPropertyContent(Languages),
                            frameworks: _this.readPropertyContent(Frameworks),
                            github: _this.readPropertyContent(GitHub),
                            external: _this.readPropertyContent(External),
                            description: _this.readPropertyContent(Description),
                            published: _this.readPropertyContent(Published),
                            isBlog: _this.readPropertyContent(isBlog),
                            isProject: _this.readPropertyContent(isProject),
                            category: _this.readPropertyContent(Category),
                            readTime: readTime
                          });

                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x2, _x3) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 2:
              result = _context2.sent;
              return _context2.abrupt("return", result);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  (0, _defineProperty2["default"])(this, "mergeListItems", function (contentBlocks, typeToMerge, typeMerged) {
    var result = (0, _toConsumableArray2["default"])(contentBlocks);
    var temp = [];

    for (var i = 0; i < contentBlocks.length; i++) {
      var curr = contentBlocks[i];

      if (curr.type === typeToMerge) {
        if (i - 1 > 0 && contentBlocks[i - 1].type !== typeToMerge) {
          temp.push(i);
        } else if (i + 1 < contentBlocks.length - 1 && contentBlocks[i + 1].type !== typeToMerge) {
          temp.push(i);
        }
      }

      if (temp.length !== 0 && temp.length % 2 === 0) {
        var _temp = temp,
            _temp2 = (0, _slicedToArray2["default"])(_temp, 2),
            start = _temp2[0],
            end = _temp2[1];

        for (var j = start + 1; j <= end; j++) {
          var _contentBlocks$start$;

          (_contentBlocks$start$ = contentBlocks[start].content).push.apply(_contentBlocks$start$, (0, _toConsumableArray2["default"])(contentBlocks[j].content));
        }

        contentBlocks[start].type = typeMerged;
        temp = [];
      }
    }

    return contentBlocks.filter(function (block) {
      return block.type !== typeToMerge;
    });
  });
  this.notion = notion;
} // Reads content from notion property
);
var _default = DataHelper;
exports["default"] = _default;