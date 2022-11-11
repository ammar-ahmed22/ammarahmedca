import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import express from "express";
import * as path from "path";
import { ApolloServer } from "apollo-server-express";

import { buildSchema } from "type-graphql";

import { BlogResolver } from "./graphql/resolvers/Blog";
import { WebsiteResolver } from "./graphql/resolvers/Website";

const PORT = process.env.PORT || 8080;

(async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [ BlogResolver, WebsiteResolver ],
    dateScalarMode: "timestamp"
  })

  const server = new ApolloServer({
    schema,
    introspection: true
  })

  console.log();

  await server.start();

  server.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀`))

  

})()