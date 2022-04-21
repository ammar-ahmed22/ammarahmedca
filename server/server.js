require("dotenv").config({ path: "./config.env"});
const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const connectDB = require("./utils/connectDB");



// Simple .gql file loader
const readContent = require('./utils/readContent');


const PORT = process.env.PORT || 5000
const { MONGO_URI } = process.env;


const startServer = async () => {
    const app = express();


    const server = new ApolloServer({
        typeDefs: readContent("./graphql/webContent.gql") + readContent("./graphql/chess.gql"),
        resolvers: {...require("./resolvers/webContent"), ...require("./resolvers/chess")}
    });

    
    await server.start()

    server.applyMiddleware({ app })

    connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀`))


};

startServer()

