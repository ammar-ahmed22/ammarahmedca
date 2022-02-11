require("dotenv").config({ path: "../config.env"});
const Notion = require("../models/Notion");

const projectDb = new Notion(process.env.NOTION_INTEGRATION_KEY, process.env.NOTION_PROJECTS_DB_ID)

const resolver = {
    Query: {
        hello: () => "hello world!!!!",
        ProjectInfo: async (_, { name, type, languages }) => {
            const result = await projectDb.getProjectInfo({name, type, languages})
            return result
        }
    }
}


module.exports = resolver