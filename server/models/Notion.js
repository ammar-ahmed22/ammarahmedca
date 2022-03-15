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
            case "date":
                return property.date.start
            
            default:
                throw Error("error getting data")
                break;
        }
    }

    readBlockContent = (block) => {
        switch (block.type) {
            case "heading_1":
                return {type: "h1", content: block.heading_1.text[0].plain_text}
                break;
            case "heading_2":
                return {type: "h2", content: block.heading_2.text[0].plain_text}
                break
            
            case "heading_3":
                return {type: "h3", content: block.heading_3.text[0].plain_text}
                break
            
            case "paragraph":
                if (block.paragraph.text.length > 0){
                    return {type: "p", content: block.paragraph.text[0].plain_text}
                }

                break
            
            default:
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
                const { Name, Timeline, Type, Languages, GitHub, External, Description, Frameworks, Published } = page.properties;
                
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
                    published: this.readPropertyContent(Published, "date")
                };
            })
    
            return result
    
        }

        const calculateReadTime = (blocks) => {

            let totalWords = 0;

            for (let i = 0; i < blocks.length; i++){
                const blockContent = this.readBlockContent(blocks[i]);

                if (blockContent){
                    totalWords += blockContent.content.split(" ").length
                }
            }

            const time = totalWords / 200;
            const minutes = Math.floor(time)
            const seconds = Math.floor(((time) - Math.floor(time))*60)

            return {
                time,
                minutes,
                seconds
            }

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
            const blocks = await notion.blocks.children.list({ block_id: item.id });

            

            
            return {
                ...item,
                hasContent: blocks.results.length > 0,
                readTime: calculateReadTime(blocks.results).minutes
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