require("dotenv").config({ path: "../config.env"});
const Notion = require("../models/Notion");

const blogDb = new Notion(process.env.NOTION_INTEGRATION_KEY, process.env.NOTION_BLOG_DB_ID)
const timelineDb = new Notion(process.env.NOTION_INTEGRATION_KEY, process.env.NOTION_TIMELINE_DB_ID)

const resolver = {
    Query: {
        hello: () => "hello world!!!!",
        ProjectInfo: async () => {
            const result = await blogDb.getBlogPostInfo({ isProject: true})
            return result
        },
        FilterBy: async () => {
            const res = await blogDb.getBlogPostInfo({});

            const result = {
                frameworks: [],
                type: [],
                languages: []
            }

            res.forEach(project => {
                project.frameworks.forEach( item => {
                    result.frameworks.push(item)
                })

                project.type.forEach(item => {
                    result.type.push(item)
                })

                project.languages.forEach(item => {
                    result.languages.push(item)
                })
            })

            // removing duplicates
            return {
                frameworks: [...new Set(result.frameworks)],
                type: [...new Set(result.type)],
                languages: [...new Set(result.languages)]
            }

        },
        TimelineInfo: async () => {
            const results = await timelineDb.getTimelineInfo();

            return results
        },
        BlogInfo: async (_, { id }) => {
            const result = await blogDb.getBlogPostInfo({isBlog: true, id});
            return result
        },
        BlogContent: async (_, { id }) => {

            const result = await blogDb.getBlogContent(id)
            //console.log(result)
            return result;
            //return "tester"
        }
    }
}


module.exports = resolver