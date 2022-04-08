const Notionv2 = require("./Notionv2")
require("dotenv").config({ path: "./config.env"});



const blogDbId = process.env.NOTION_BLOG_DB_ID
const intKey = process.env.NOTION_INTEGRATION_KEY

const notion = new Notionv2(intKey);

//console.log(process.env.NOTION_BLOG_DB_ID)

//console.log(notion.db.get({ dbId: "testdb"}))
// console.log(notion.db.get(blogDbId, {
//     or: []
// }))
console.log(intKey)
console.log(blogDbId)
console.log(notion.db.get({ dbId: blogDbId }))
console.log(notion.db.add())