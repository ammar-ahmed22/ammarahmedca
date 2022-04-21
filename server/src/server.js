import dotenv from "dotenv";
dotenv.config({ path: "./config.env"});
import { ApolloServer } from "apollo-server-express";
import express from "express";
import connectDB from "./utils/connectDB";

// Simple gql file loader
import readContent from "./utils/readContent";

// Resolvers
import { webQueries } from "./resolvers/website";
import { chessQueries, chessMutations } from "./resolvers/chess";
import typeResolver from "./resolvers/resolveType";


const PORT = process.env.PORT || 5000
const { MONGO_URI } = process.env;


const startServer = async () => {
    const app = express();

    const resolver = {
        Query: {...webQueries, ...chessQueries},
        Mutation: {...chessMutations},
        ...typeResolver
    }
    
    

    const server = new ApolloServer({
        typeDefs: readContent("./graphql/webContent.gql") + readContent("./graphql/chess.gql"),
        resolvers: resolver
    });

    
    await server.start()

    server.applyMiddleware({ app })

    connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀`))


};

startServer()

