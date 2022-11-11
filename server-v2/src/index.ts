import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import express from "express";
import * as path from "path";
import { ApolloServer } from "apollo-server-express";

import { Arg, buildSchema, Field, ObjectType, Query, Resolver } from "type-graphql";

import { BlogResolver } from "./graphql/resolvers/Blog";

const relative = (filePath: string) : string => path.resolve(__dirname, filePath);


@Resolver()
class TestResolver{
  @Query(returns => String)
  hello(@Arg("name", { nullable: true }) name?: string){
    if (name){
      return "hello " + name + "!";
    }

    return "hello!"
  }
}

const PORT = process.env.PORT || 8080;

(async () => {
  const app = express();


  const schema = await buildSchema({
    resolvers: [TestResolver, BlogResolver],
    dateScalarMode: "timestamp"
  })

  const server = new ApolloServer({
    schema,
  })

  console.log();

  await server.start();

  server.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath} 🚀`))

  

})()