const { Client } = require("@notionhq/client")

class Notion{
    constructor(integration_key, database_id){
        this.notion = new Client({ auth: integration_key })
        this.dbId = database_id
    }

    readPropertyContent = (property, type) => {
        switch (type) {
            case "title":
                return property.title[0].plain_text
            case "text":
                return property.rich_text.length > 0 ? property.rich_text[0].plain_text : ""
            case "multi-select":
                return property.multi_select.map( item => item.name)
            case "select":
                return property.select.name
            case "url":
                return property.url
            
            default:
                throw Error("error getting data")
                break;
        }
    }

    


    getProjectInfo = async ({name = null, languages = null, type = null, onlyHasContent=false}) => {
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

        const parseProjectsResponse = (resp) => {
            // Parses projects results list from Notion API
            const result = resp.map( (page, idx) => {
                const { Name, Timeline, Type, Languages, GitHub, External, Description, Frameworks } = page.properties;
                
                return {
                    id: page.id,
                    lastEdited: page.last_edited_time,
                    name: this.readPropertyContent(Name, "title"),
                    timeline: this.readPropertyContent(Timeline, "text"),
                    type: this.readPropertyContent(Type, "multi-select"),
                    languages: this.readPropertyContent(Languages, "multi-select"),
                    frameworks: this.readPropertyContent(Frameworks, "multi-select"),
                    github: this.readPropertyContent(GitHub, "url"),
                    external: this.readPropertyContent(External, "url"),
                    description: this.readPropertyContent(Description, "text"),
                };
            })
    
            return result
    
        }

        

        
        const res = await notion.databases.query({
            database_id: dbId,
            filter: {
                or: or
            }
        })

        

        if (!res) throw new Error("cannot query")

        // pageResp.results.forEach( (item, idx) => {
        //     switch (item.type) {
        //         case "heading_1":
        //             console.log(idx, "H1:", item.heading_1.text[0].plain_text)
        //             break;
        //         case "heading_3":
        //             console.log(idx, "H3:", item.heading_3.text[0].plain_text)
        //             break
        //         case "paragraph":
        //             if (item.paragraph.text.length > 0){
        //                 console.log(idx, "PARA:", item.paragraph.text[0].plain_text)
        //             }
                    
        //             break
        //         case "numbered_list_item":
        //             console.log(idx, "OL ITEM:", item.numbered_list_item.text[0].plain_text)
        //         default:
        //             break;
        //     }
        // })

        const response = await Promise.all(parseProjectsResponse(res.results).map( async item => {
            const pageContent = await notion.blocks.children.list({ block_id: item.id });
            return {
                ...item,
                hasContent: pageContent.results.length > 0
            }
        }));
        
        if (onlyHasContent){
            return response.filter( item => item.hasContent)
        }
        
        return response;
    }

    getTimelineInfo = async () => {
        const { notion, dbId } = this;

        const res = await notion.databases.query({
            database_id: dbId,
            sorts: [
                {
                    property: "Year",
                    direction: "descending"
                }
            ]
        })

        const getAllYears = (resp) => {
            const years = resp.map( page => {
                return this.readPropertyContent(page.properties.Year, "select")
            })

            return [... new Set(years)]
        }

        const results = await Promise.all(getAllYears(res.results).map( async year => {
            const notionYearData = await notion.databases.query({
                database_id: dbId,
                filter: {
                    or: [
                        {
                            property: "Year",
                            select: {
                                equals: year
                            }
                        }
                    ]
                }
            })


            
            return {
                year: parseInt(year),
                yearData: notionYearData.results.map( item => {
                    const { Title, Description } = item.properties;
                    return {
                        title: this.readPropertyContent(Title, "title"),
                        description: this.readPropertyContent(Description, "text")
                    }
                })
            }
        }))

        return results
    }


}

module.exports = Notion