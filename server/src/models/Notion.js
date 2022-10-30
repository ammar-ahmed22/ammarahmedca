import { Client } from "@notionhq/client";

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

        

        try {
            const res = await this.notion.databases.query({
                database_id: dbId,
                filter,
                sorts
            })
            
            if (res){
                return res.results
            }
        } catch (error) {
            return new Error(error)
        }
        
    }

    blocksGet = async (blockId) => {
        let res = [];
        let response = await this.notion.blocks.children.list({ block_id: blockId })
        
        res = res.concat(response.results);

        while(response.has_more){
            response = await this.notion.blocks.children.list({
                block_id: blockId,
                start_cursor: response.next_cursor
            });
            res = res.concat(response.results);
        }
        

        return res
    }
    
}

export default Notion;