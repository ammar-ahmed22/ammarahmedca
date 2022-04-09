const { Client } =  require("@notionhq/client")

class Notion{
    constructor(integrationKey){
        this.notion = new Client({ auth: integrationKey })

        this.db = {
            get: async ({ dbId, filter = { or: []}, sorts = []}) => this.databaseGet(dbId, filter, sorts),
            add: () => this.databaseAdd()
        }
        this.blocks = {
            get: async ({ blockId }) => this.blocksGet(blockId)
        }
    }

    databaseGet = async (dbId, filter, sorts) => {

        if (!filter && !sorts){
            return new Error("Provide a filter or sort")
        }

        //console.log(dbId)

        try {
            const res = await this.notion.databases.query({
                database_id: dbId,
                filter,
                sorts
            })
            console.log(res)
            if (res){
                return res.results
            }
        } catch (error) {
            return new Error(error)
        }
        //return "gets some shit from: " + dbId
    }

    blocksGet = async (blockId) => {
        const response = await this.notion.blocks.children.list({ block_id: blockId })
        return response.results
    }
    
}

module.exports = Notion