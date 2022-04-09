class DataHelper {
    constructor(notion=null){
        this.notion = notion;
    }

    // Reads content from notion property
    readPropertyContent = (property, options={includeDateEnd: false}) => {
        const { type } = property;
        const value = property[type];

        switch (type) {
            case "title":
            case "rich_text":
                return value.length > 0 ? value[0].plain_text : ""
                break;
            case "multi_select":
                return value.map(item => item.name)
            case "select":
                return value.name
            case "url":
                return value
            case "date":
                if (options.includeDateEnd){
                    const { start, end } = value;
                    return { start, end }
                }else{
                    return value.start
                }
            case "checkbox":
                return value
            default:
                throw new Error("unable to get property content")
        }
    }

    // Reads content from notion block
    readBlockContent = (block) => {
        const { type } = block;
        if (type === "code"){
            console.log(block)
            const { language } = block[type];
            return {
                type,
                content: block[type].text.map( textBlock => {
                    const { plain_text, annotations } = textBlock
                    annotations.language = language
                    return {
                        plain_text,
                        annotations
                    }
                })
            }
        }
        if (type !== "image"){
            return {
                type,
                content: block[type].text.map( textBlock => {
                    const { plain_text, annotations } = textBlock;
                    return {
                        plain_text,
                        annotations
                    }
                })
            }
        }else{
            const { url } = block[type].file;
            const caption = block[type].caption.length > 0 ? block[type].caption[0].plain_text : ""
            return {
                type,
                content: [{
                    url,
                    caption
                }]
            }
        }
        
    }
    
    // calculates read time given notion blocks
    calculateReadTime = (blocks) => {

        let totalWords = 0;

        for (let i = 0; i < blocks.length; i++){
            const blockContent = this.readBlockContent(blocks[i]);

            if (blockContent && blockContent.type !== "image"){
                blockContent.content.forEach( item => {
                    totalWords += item.plain_text.split(" ").length
                })
                //totalWords += blockContent.content[0].split(" ").length
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

    // Parses list of notion pages into list of BlogInfo GraphQL type => [BlogInfo]
    parseBlogInfo = async (pages) => {
        const result = await Promise.all( pages.map( async (page, idx) => {
            const { 
                Name, 
                Timeline, 
                Type, 
                Languages, 
                GitHub, 
                External, 
                Description, 
                Frameworks, 
                Published, 
                isBlog, 
                isProject 
            } = page.properties;

            const { id, last_edited_time } = page

            const blocks = await this.notion.blocks.get({ blockId: id })
            const readTime = Math.round(this.calculateReadTime(blocks).time);

            return {
                id,
                lastEdited: last_edited_time,
                name: this.readPropertyContent(Name),
                timeline: this.readPropertyContent(Timeline),
                type: this.readPropertyContent(Type),
                languages: this.readPropertyContent(Languages),
                frameworks: this.readPropertyContent(Frameworks),
                github: this.readPropertyContent(GitHub),
                external: this.readPropertyContent(External),
                description: this.readPropertyContent(Description),
                published: this.readPropertyContent(Published),
                isBlog: this.readPropertyContent(isBlog),
                isProject: this.readPropertyContent(isProject),
                readTime
            }
        }))

        return result;
    }
}

module.exports = DataHelper