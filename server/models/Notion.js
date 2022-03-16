const { Client } = require("@notionhq/client")

class Notion{
    constructor(integration_key, database_id=null){
        this.notion = new Client({ auth: integration_key })
        this.dbId = database_id
    }

    readPropertyContent = (property, type) => {
        switch (type) {
            case "title":
                return property.title.length > 0 ? property.title[0].plain_text : ""
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
            case "checkbox":
                //console.log(property)
                return property.checkbox
                break;
            default:
                throw Error("error getting data")
                break;
        }
    }

    readBlockContent = (block) => {
        switch (block.type) {
            case "heading_1":
                return {type: "h1", content: [block.heading_1.text[0].plain_text]}
                break;
            case "heading_2":
                return {type: "h2", content: [block.heading_2.text[0].plain_text]}
                break
            
            case "heading_3":
                return {type: "h3", content: [block.heading_3.text[0].plain_text]}
                break
            
            case "paragraph":
                if (block.paragraph.text.length > 0){
                    return {type: "p", content: [block.paragraph.text[0].plain_text]}
                }

                break
            
            case "numbered_list_item":
                return { type: "ol-li", content: [block.numbered_list_item.text[0].plain_text]}
            default:

            return block
                break;
        }
    }

    


    getBlogPostInfo = async ({ isBlog=false, isProject=false}) => {
        const { notion, dbId } = this;

        const or = []

        

        if (isProject){
            or.push({
                property: "isProject",
                checkbox: {
                    "equals": true
                }
            })
        }

        if (isBlog){
            or.push({
                property: "isBlog",
                checkbox: {
                    "equals": true
                }
            })
        }

        const parseBlogPostResponse = (resp) => {
            // Parses projects results list from Notion API
            const result = resp.map( (page, idx) => {
                const { Name, Timeline, Type, Languages, GitHub, External, Description, Frameworks, Published, isBlog, isProject } = page.properties;
                this.readPropertyContent(isBlog, "checkbox")
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
                    published: this.readPropertyContent(Published, "date"),
                    isBlog: this.readPropertyContent(isBlog, "checkbox"),
                    isProject: this.readPropertyContent(isProject, 'checkbox')
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

        
        const response = await Promise.all(parseBlogPostResponse(res.results).map( async item => {
            const blocks = await notion.blocks.children.list({ block_id: item.id });
            
            return {
                ...item,
                readTime: calculateReadTime(blocks.results).minutes
            }
        }));
        
        
        return response;
    }

    getBlogContent = async (pageId) => {
        const blocks = await this.notion.blocks.children.list({block_id: pageId});

        console.log("INSIDE BLOG CONTENT")
       
        const response = blocks.results.map( block => {
            return this.readBlockContent(block)
        }).filter( item => item !== undefined);

        
        let temp = [];
        for (let i = 0; i < response.length; i++){
            const curr = this.readBlockContent(response[i]);

            

            if ((i-1) > 0 && curr.type === "ol-li" && this.readBlockContent(response[i-1]).type !== "ol-li"){
                console.log("START INDEX", i)
                
                temp.push(i)
            }else if ((i+1) < response.length - 1 && curr.type === "ol-li" && this.readBlockContent(response[i+1]).type !== 'ol-li'){
                console.log("END INDEX", i)
                temp.push(i)
            }

            if (temp.length !== 0 && temp.length % 2 == 0 ){
                
                const [start, end] = temp;


                for (let j = start; j <= end; j++){
                    if (j !== start){
                        response[start].content.push(response[j].content[0]);
                    }
                }

                response[start].type = "ol";
                
                temp = []
            }

        }


        

        return response.filter( item => item.type !== 'ol-li')

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