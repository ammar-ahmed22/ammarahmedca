"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("dotenv").config({
  path: "../config.env"
});

var Notion = require("../models/Notion");

var DataHelper = require("../utils/DataHelper");

var _process$env = process.env,
    NOTION_INTEGRATION_KEY = _process$env.NOTION_INTEGRATION_KEY,
    NOTION_BLOG_DB_ID = _process$env.NOTION_BLOG_DB_ID,
    NOTION_EXP_DB_ID = _process$env.NOTION_EXP_DB_ID; // Custom Notion API wrapper

var notionWrapper = new Notion(NOTION_INTEGRATION_KEY); // Methods to help with data parsing from Notion

var helper = new DataHelper(notionWrapper);
var resolver = {
  Query: {
    ProjectInfo: function () {
      var _ProjectInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var projectPages, res;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return notionWrapper.db.get({
                  dbId: NOTION_BLOG_DB_ID,
                  filter: {
                    or: [{
                      property: "isProject",
                      checkbox: {
                        equals: true
                      }
                    }]
                  }
                });

              case 2:
                projectPages = _context.sent;
                _context.next = 5;
                return helper.parseBlogInfo(projectPages);

              case 5:
                res = _context.sent;
                return _context.abrupt("return", res);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function ProjectInfo() {
        return _ProjectInfo.apply(this, arguments);
      }

      return ProjectInfo;
    }(),
    FilterBy: function () {
      var _FilterBy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var allBlogPages, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return notionWrapper.db.get({
                  dbId: NOTION_BLOG_DB_ID
                });

              case 2:
                allBlogPages = _context2.sent;
                result = {
                  frameworks: [],
                  languages: [],
                  type: []
                };
                allBlogPages.forEach(function (page) {
                  var _result$frameworks, _result$type, _result$languages;

                  var _page$properties = page.properties,
                      Frameworks = _page$properties.Frameworks,
                      Languages = _page$properties.Languages,
                      Type = _page$properties.Type;

                  (_result$frameworks = result.frameworks).push.apply(_result$frameworks, (0, _toConsumableArray2["default"])(helper.readPropertyContent(Frameworks)));

                  (_result$type = result.type).push.apply(_result$type, (0, _toConsumableArray2["default"])(helper.readPropertyContent(Type)));

                  (_result$languages = result.languages).push.apply(_result$languages, (0, _toConsumableArray2["default"])(helper.readPropertyContent(Languages)));
                }); // removing duplicates

                return _context2.abrupt("return", {
                  frameworks: (0, _toConsumableArray2["default"])(new Set(result.frameworks)),
                  type: (0, _toConsumableArray2["default"])(new Set(result.type)),
                  languages: (0, _toConsumableArray2["default"])(new Set(result.languages))
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function FilterBy() {
        return _FilterBy.apply(this, arguments);
      }

      return FilterBy;
    }(),
    BlogInfo: function () {
      var _BlogInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_, _ref) {
        var id, blogPages, categories, posts;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref.id;
                _context3.next = 3;
                return notionWrapper.db.get({
                  dbId: NOTION_BLOG_DB_ID,
                  filter: {
                    or: [{
                      property: "isBlog",
                      checkbox: {
                        equals: true
                      }
                    }]
                  }
                });

              case 3:
                blogPages = _context3.sent;
                categories = []; // getting all categories

                blogPages.forEach(function (page) {
                  var Category = page.properties.Category;
                  categories.push(helper.readPropertyContent(Category));
                }); // removing duplicates

                categories = (0, _toConsumableArray2["default"])(new Set(categories));
                _context3.next = 9;
                return helper.parseBlogInfo(blogPages);

              case 9:
                posts = _context3.sent;

                if (!id) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", [{
                  category: null,
                  posts: posts.filter(function (post) {
                    return post.id === id;
                  })
                }]);

              case 12:
                return _context3.abrupt("return", categories.map(function (category) {
                  return {
                    category: category,
                    posts: posts.filter(function (post) {
                      return post.category === category;
                    })
                  };
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function BlogInfo(_x, _x2) {
        return _BlogInfo.apply(this, arguments);
      }

      return BlogInfo;
    }(),
    BlogContent: function () {
      var _BlogContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_, _ref2) {
        var id, allBlocks, parsedBlocks;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref2.id;
                _context4.next = 3;
                return notionWrapper.blocks.get({
                  blockId: id
                });

              case 3:
                allBlocks = _context4.sent;
                // Reads block content into correct GraphQL type, filters out non-read types
                parsedBlocks = allBlocks.map(function (block) {
                  return helper.readBlockContent(block);
                }).filter(function (block) {
                  return block !== undefined;
                }); // Merges list item blocks into a single object 

                parsedBlocks = helper.mergeListItems(parsedBlocks, "numbered_list_item", "ordered_list");
                parsedBlocks = helper.mergeListItems(parsedBlocks, "bulleted_list_item", "unordered_list"); // Filtering out any empty blocks

                return _context4.abrupt("return", parsedBlocks.filter(function (block) {
                  return block.content.length > 0;
                }));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function BlogContent(_x3, _x4) {
        return _BlogContent.apply(this, arguments);
      }

      return BlogContent;
    }(),
    ExperienceInfo: function () {
      var _ExperienceInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        var expPages, result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return notionWrapper.db.get({
                  dbId: NOTION_EXP_DB_ID,
                  sorts: [{
                    property: "Timeframe",
                    direction: "descending"
                  }]
                });

              case 2:
                expPages = _context5.sent;
                result = expPages.map(function (exp) {
                  var _exp$properties = exp.properties,
                      Name = _exp$properties.Name,
                      Timeframe = _exp$properties.Timeframe,
                      Role = _exp$properties.Role,
                      Description = _exp$properties.Description,
                      Type = _exp$properties.Type,
                      Skills = _exp$properties.Skills;
                  var description = Description.rich_text.map(function (text) {
                    var plain_text = text.plain_text,
                        annotations = text.annotations;
                    return {
                      plain_text: plain_text,
                      annotations: annotations
                    };
                  });
                  var company = helper.readPropertyContent(Name);
                  var role = helper.readPropertyContent(Role);
                  var type = helper.readPropertyContent(Type);
                  var skills = helper.readPropertyContent(Skills);

                  var _helper$readPropertyC = helper.readPropertyContent(Timeframe, {
                    includeDateEnd: true
                  }),
                      start = _helper$readPropertyC.start,
                      end = _helper$readPropertyC.end;

                  return {
                    company: company,
                    description: description,
                    role: role,
                    type: type,
                    skills: skills,
                    timeframe: {
                      start: helper.monthYearFromISO(start),
                      end: end ? helper.monthYearFromISO(end) : "Present"
                    }
                  };
                });
                return _context5.abrupt("return", result);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function ExperienceInfo() {
        return _ExperienceInfo.apply(this, arguments);
      }

      return ExperienceInfo;
    }()
  },
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
module.exports = resolver;