import dotenv from "dotenv";
dotenv.config({ path: "./config.env"});
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema"
import { applyMiddleware } from "graphql-middleware";
import express from "express";
import { expressjwt } from "express-jwt";
import connectDB from "./utils/connectDB";
import { getPathPrefix } from "./utils/helpers";

// Simple gql file loader
import readContent from "./utils/readContent";

// Resolvers
import { webQueries } from "./resolvers/website";
import { chessQueries, chessMutations } from "./resolvers/chess";
import typeResolver from "./resolvers/resolveType";
import sendEmail from "./utils/sendEmail";

// Permissions
import permissions from "./utils/permissions";

// testing email
//sendEmail({ to: "a353ahme@uwaterloo.ca", subject: "Test", html: "<p>test</p>" });


const PORT = process.env.PORT || 5000
const { MONGO_URI } = process.env;


(async () => {
    const app = express();

    app.use(
        expressjwt({
            secret: process.env.JWT_SECRET,
            algorithms: ["HS256"],
            credentialsRequired: false
        })
    )

    const resolver = {
        Query: {...webQueries, ...chessQueries},
        Mutation: {...chessMutations},

        ...typeResolver
    }


    
    const schema = makeExecutableSchema({ typeDefs: readContent(`${getPathPrefix(process.env.NODE_ENV)}graphql/webContent.gql`) + readContent(`${getPathPrefix(process.env.NODE_ENV)}graphql/chess.gql`), resolvers: resolver })
    

    const server = new ApolloServer({
        schema: applyMiddleware(schema, permissions),
        context: ({ req }) => {
            const auth = req.auth || null;
            return { auth }
        }
    });

    
    
    await server.start()

    server.applyMiddleware({ app })

    connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀`))
})();

