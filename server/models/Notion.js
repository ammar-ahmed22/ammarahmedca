const { Client } = require("@notionhq/client")

class Notion{
    constructor(integration_key, database_id){
        this.notion = new Client({ auth: integration_key })
        this.dbId = database_id
    }

    parseResponse = (resp) => {
        // Parses results list from Notion API
        
        const result = resp.map( (page, idx) => {
            const { Name, Timeline, Type, Languages, GitHub, External, Description, Frameworks } = page.properties;
            return {
                id: page.id,
                lastEdited: page.last_edited_time,
                name: Name.title[0].plain_text,
                timeline: Timeline.rich_text[0].plain_text,
                type: Type.multi_select.map( item => item.name),
                languages: Languages.multi_select.map( item => item.name),
                frameworks: Frameworks.multi_select.map( item => item.name),
                github: GitHub.url,
                external: External.url,
                description: Description.rich_text.length > 0 ? Description.rich_text[0].plain_text : "",
            };
        })

        return result

    }


    getProjectInfo = async ({name = null, languages = null, type = null}) => {
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

        

        if (!res) throw new Error("cannot query")
        //console.log(res.results)
        return this.parseResponse(res.results);
    }


}

module.exports = Notion