import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import * as path from "path";
import fs from "fs";

import { buildSchema } from "type-graphql";
import { printSchema } from "graphql";

import { BlogResolver } from "./graphql/resolvers/Blog";
import { WebsiteResolver } from "./graphql/resolvers/Website";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

(async () => {

  const schema = await buildSchema({
    resolvers: [ BlogResolver, WebsiteResolver ],
    dateScalarMode: "timestamp"
  })

  const schemaString = printSchema(schema);

  fs.writeFileSync(path.resolve(__dirname, "./schema.graphql"), schemaString)


  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      process.env.NODE_ENV === "production" ? ApolloServerPluginLandingPageProductionDefault({
        graphRef: "ammarahmedca-api-v2@production",
        footer: false,
      }) : ApolloServerPluginLandingPageLocalDefault()
    ]
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
  })

  console.log(`🚀  Server ready at: ${url}`)

})()