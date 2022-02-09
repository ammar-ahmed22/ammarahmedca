require("dotenv").config({ path: "../config.env"})
const { Client } = require("@notionhq/client")

class Notion{
    constructor(integration_key, database_id){
        this.notion = new Client({ auth: integration_key })
        this.dbId = database_id
    }

    parseResponse = (resp) => {
        
    }


    query = async ({name = null, languages = null, type = null}) => {
        const { notion, dbId } = this;

        const or = []

        if (name){
            or.push({
                property: "Name",
                text: {
                    contains: name
                }
            })
        }

        if (languages){
            or.push({
                property: "Languages",
                multi_select: {
                    contains: languages
                }
            })
        }

        if (type){
            or.push({
                property: "Type",
                multi_select: {
                    contains: type
                }
            })
        }

        

        
        const res = await notion.databases.query({
            database_id: dbId,
            filter: {
                or: or
            }
        })

        

        //if (!res) throw new Error("cannot query")

        console.log(res)
    }


}

module.exports = Notion