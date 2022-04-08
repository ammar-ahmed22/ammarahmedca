const { Client } =  require("@notionhq/client")

// class Notionv2{
//     constructor(integrationKey){
//         this.notion = new Client({ auth: integrationKey })
//     }

//     db = (dbId) => {
//         this.dbId = dbId;

//         this.working = () => "working"
//     }

    
// }



// const Notionv2 = (integrationKey) =>{
//     this.notion = new Client({ auth: integrationKey })

//     this.db = {
//         get: () => "gets some shit",
//         add: () => "adds some shit"
//     }
// }

class Notionv2{
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
        return this.notion.blocks.children.list({ block_id: blockId })
    }
    
}

module.exports = Notionv2