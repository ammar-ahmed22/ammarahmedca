require("dotenv").config({ path: "./config.env"});
const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const Notion = require("./models/Notion");

// Simple .gql file loader
const readContent = require('./utils/readContent');

const timelineDb = new Notion(process.env.NOTION_INTEGRATION_KEY, process.env.NOTION_TIMELINE_DB_ID)

timelineDb.getTimelineInfo()

const PORT = process.env.PORT || 5000



const startServer = async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs: readContent("./schema.gql"),
        resolvers: require("./resolvers")
    });

    await server.start()

    server.applyMiddleware({ app })

    app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀`))


};

startServer()

