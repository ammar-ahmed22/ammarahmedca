require("dotenv").config({ path: "../config.env"});
const Notion = require("../models/Notion");

const projectDb = new Notion(process.env.NOTION_INTEGRATION_KEY, process.env.NOTION_PROJECTS_DB_ID)
const timelineDb = new Notion(process.env.NOTION_INTEGRATION_KEY, process.env.NOTION_TIMELINE_DB_ID)

const resolver = {
    Query: {
        hello: () => "hello world!!!!",
        ProjectInfo: async (_, { name, type, languages }) => {
            const result = await projectDb.getProjectInfo({name, type, languages})
            return result
        },
        FilterBy: async () => {
            const res = await projectDb.getProjectInfo({});

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
        }
    }
}


module.exports = resolver