require("dotenv").config({ path: "../config.env" });
const Notion = require("../models/Notion");
const Notionv2 = require("../models/Notionv2");
const DataHelper = require("../utils/DataHelper");

const blogDb = new Notion(
  process.env.NOTION_INTEGRATION_KEY,
  process.env.NOTION_BLOG_DB_ID
);
const timelineDb = new Notion(
  process.env.NOTION_INTEGRATION_KEY,
  process.env.NOTION_TIMELINE_DB_ID
);
const expDb = new Notion(
  process.env.NOTION_INTEGRATION_KEY,
  process.env.NOTION_EXP_DB_ID
);

const { NOTION_INTEGRATION_KEY, NOTION_BLOG_DB_ID, NOTION_EXP_DB_ID } = process.env;

// Custome Notion API wrapper
const notionWrapper = new Notionv2(NOTION_INTEGRATION_KEY);
// Methods to help with data parsing from Notion
const helper = new DataHelper(notionWrapper);

const resolver = {
  Query: {
    hello: () => "hello world!!!!",
    ProjectInfo: async () => {
      // Returns info for all projects

      // All blog pages with isProject checked
      const projectPages = await notionWrapper.db.get({
        dbId: NOTION_BLOG_DB_ID,
        filter: {
          or: [
            {
              property: "isProject",
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      });

      // parses into BlogInfo GraphQL type
      const res = await helper.parseBlogInfo(projectPages);

      return res;
    },
    FilterBy: async () => {
      // Returns all options to filter projects by
      const allBlogPages = await notionWrapper.db.get({
        dbId: NOTION_BLOG_DB_ID,
      });

      const result = {
        frameworks: [],
        languages: [],
        type: [],
      };

      allBlogPages.forEach((page) => {
        const { Frameworks, Languages, Type } = page.properties;

        result.frameworks.push(...helper.readPropertyContent(Frameworks));
        result.type.push(...helper.readPropertyContent(Type));
        result.languages.push(...helper.readPropertyContent(Languages));
      });

      // removing duplicates
      return {
        frameworks: [...new Set(result.frameworks)],
        type: [...new Set(result.type)],
        languages: [...new Set(result.languages)],
      };
    },
    BlogInfo: async (_, { id }) => {
      const blogPages = await notionWrapper.db.get({
        dbId: NOTION_BLOG_DB_ID,
        filter: {
          or: [
            {
              property: "isBlog",
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      });

      const res = await helper.parseBlogInfo(blogPages);

      return id ? res.filter((blogInfo) => blogInfo.id === id) : res;
    },
    BlogContent: async (_, { id }) => {
      const allBlocks = await notionWrapper.blocks.get({ blockId: id });
      
      // Reads block content into correct GraphQL type, filters out non-read types
      let parsedBlocks = allBlocks
        .map((block) => helper.readBlockContent(block))
        .filter((block) => block !== undefined);
      
      // Merges list item blocks into a single object 
      parsedBlocks = helper.mergeListItems(parsedBlocks, "numbered_list_item", "ordered_list")
      parsedBlocks = helper.mergeListItems(parsedBlocks, "bulleted_list_item", "unordered_list")

      // Filtering out any empty blocks
      return parsedBlocks.filter( block => block.content.length > 0)
    },
    ExperienceInfo: async () => {
      const expPages = await notionWrapper.db.get({
          dbId: NOTION_EXP_DB_ID,
          sorts: [
              {
                  property: "Timeframe",
                  direction: "descending"
              }
          ]
      });

      const result = expPages.map( exp => {
        const { Name, Timeframe, Role, Description, Type, Skills } = exp.properties;

        
        const description = Description.rich_text.map( text => {
            const { plain_text, annotations } = text;

            return {
                plain_text,
                annotations
            }
        })
        
        const company = helper.readPropertyContent(Name);
        const role = helper.readPropertyContent(Role)
        const type = helper.readPropertyContent(Type)
        const skills = helper.readPropertyContent(Skills)
        const { start, end } = helper.readPropertyContent(Timeframe, { includeDateEnd: true });

        return {
            company,
            description,
            role,
            type,
            skills,
            timeframe: {
                start: helper.monthYearFromISO(start),
                end: end ? helper.monthYearFromISO(end) : "Present"
            }
        }
      })

      return result;
    },
  },
  TextOrImage: {
    __resolveType(obj, context, info) {

      if (obj.annotations) {
        return "Text";
      } else if (obj.url) {
        return "Image";
      } else {
        return null;
      }
    },
  },
};

module.exports = resolver;
