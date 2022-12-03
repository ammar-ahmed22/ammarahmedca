import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { Client, isFullPage } from "@notionhq/client";
import {
  PartialBlockObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Arg, Query, Resolver } from "type-graphql";
import { Content, FilterOpts, Metadata } from "../typeDefs/Blog";
import { GraphQLError } from "graphql";

import { readProperty, readBlockContent, createDate } from "../../utils/Notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isText } from "../../types/typeGuards";

@Resolver()
export class BlogResolver {
  constructor(
    private notion = new Client({ auth: process.env.NOTION_INTEGRATION_KEY }),
    private blogdbID = process.env.NOTION_BLOG_DB_ID
  ) {}

  private getPaginatedBlocks = async (
    pageId: string
  ): Promise<(PartialBlockObjectResponse | BlockObjectResponse)[]> => {
    let blocks = await this.notion.blocks.children.list({ block_id: pageId });
    const res = blocks.results;
    while (blocks.next_cursor) {
      blocks = await this.notion.blocks.children.list({
        block_id: pageId,
        start_cursor: blocks.next_cursor,
      });
      res.push(...blocks.results);
    }

    return res;
  };

  private calculateReadtime = (content: IContent[], wpm: number = 200) => {
    let wordCount = 0;
    for (const block of content) {
      if (block.type !== "image" && block.type !== "code") {
        for (const text of block.content) {
          if (isText(text)) {
            const words = text.plainText
              .split(" ")
              .filter((word) => word !== "" && word !== ".");
            wordCount += words.length;
          }
        }
      }
    }

    return Math.round(wordCount / wpm);
  };

  private hyphenate = (str: string) => str.toLowerCase().split(" ").join("-");

  private createMetadata = async (
    page: PageObjectResponse
  ): Promise<IMetadata> => {
    const isBlog = readProperty(page.properties.isBlog) as boolean;

    let readTime = undefined;
    let pathname = readProperty(page.properties.Pathname);
    let published = createDate(readProperty(page.properties.Published).start);

    if (isBlog) {
      const blocks = await this.notion.blocks.children.list({
        block_id: page.id,
      });

      const blogContent = readBlockContent(blocks.results);

      if (blogContent) {
        readTime = this.calculateReadtime(blogContent);
      }

      if (!pathname) {
        pathname = this.hyphenate(readProperty(page.properties.Name));
        // updating pathname to hyphenated
        const response = await this.notion.pages.update({
          page_id: page.id,
          properties: {
            Pathname: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: pathname,
                  },
                },
              ],
            },
          },
        });
      }
    }

    return {
      id: page.id,
      name: readProperty(page.properties.Name),
      lastEdited: new Date(page.last_edited_time),
      pathname,
      timeline: readProperty(page.properties.Timeline) as string,
      type: readProperty(page.properties.Type) as string[],
      frameworks: readProperty(page.properties.Frameworks) as string[],
      github: readProperty(page.properties.GitHub) as string,
      external: readProperty(page.properties.External) as string,
      description: readProperty(page.properties.Description) as string,
      published,
      isBlog,
      isProject: readProperty(page.properties.isProject) as boolean,
      category: readProperty(page.properties.Category) as string,
      isPublished: readProperty(page.properties.Publish) as boolean,
      readTime,
    };
  };

  @Query((returns) => Metadata, {
    description: "Gets metadata by id or pathname",
  })
  async metadata(
    @Arg("id", { nullable: true }) id?: string,
    @Arg("pathname", { nullable: true }) pathname?: string
  ) {
    if (this.blogdbID) {
      if (id) {
        const response = await this.notion.databases.query({
          database_id: this.blogdbID,
          filter: {
            or: [],
          },
        });

        const pages = response.results.filter((page) => page.id === id);
        console.log({ pages });
        if (pages.length <= 0) throw new GraphQLError("No results with id.");

        const page = pages[0];
        if (isFullPage(page)) {
          const metadata = await this.createMetadata(page);
          return metadata;
        }
      }

      if (pathname) {
        const response = await this.notion.databases.query({
          database_id: this.blogdbID,
          filter: {
            or: [
              {
                property: "Pathname",
                rich_text: {
                  contains: pathname,
                },
              },
            ],
          },
        });

        if (response.results.length <= 0)
          throw new GraphQLError("No results with pathname");

        const page = response.results[0];
        if (isFullPage(page)) {
          const metadata = await this.createMetadata(page);
          return metadata;
        }
      }
    }
  }

  @Query((returns) => [Metadata], { description: "gets all metadata" })
  async allMetadata() {
    if (this.blogdbID) {
      const response = await this.notion.databases.query({
        database_id: this.blogdbID,
        filter: {
          or: [],
        },
      });

      const result = await Promise.all(
        response.results.map(async (result) => {
          if (isFullPage(result)) {
            const metadata = await this.createMetadata(result);
            return metadata;
          }
        })
      );

      return result;
    }
    throw new GraphQLError("error connecting to database.");
  }

  @Query((returns) => [Metadata], { description: "Gets blog post metadata" })
  async blogMetadata(
    @Arg("publishedOnly", { nullable: true }) publishedOnly: boolean = false
  ) {
    if (this.blogdbID) {
      const filter = !publishedOnly
        ? {
            or: [
              {
                property: "isBlog",
                checkbox: {
                  equals: true,
                },
              },
            ],
          }
        : {
            and: [
              {
                property: "isBlog",
                checkbox: {
                  equals: true,
                },
              },
              {
                property: "Publish",
                checkbox: {
                  equals: true,
                },
              },
            ],
          };

      const response = await this.notion.databases.query({
        database_id: this.blogdbID,
        filter,
      });

      const result = await Promise.all(
        response.results.map(async (result) => {
          if (isFullPage(result)) {
            const metadata = await this.createMetadata(result);

            return metadata;
          }
        })
      );

      return result;
    }
    throw new GraphQLError("error connecting to database.");
  }

  @Query((returns) => [Metadata], { description: "Gets project post metadata" })
  async projectMetadata() {
    if (this.blogdbID) {
      const response = await this.notion.databases.query({
        database_id: this.blogdbID,
        filter: {
          or: [
            {
              property: "isProject",
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      });

      const result = await Promise.all(
        response.results.map(async (result) => {
          if (isFullPage(result)) {
            const metadata = await this.createMetadata(result);
            return metadata;
          }
        })
      );

      return result;
    }

    throw new GraphQLError("error connecting to database.");
  }

  @Query((returns) => [Content], {
    description: "Gets content for blog by pathname.",
  })
  async content(@Arg("pathname") pathname: string) {
    if (this.blogdbID) {
      const response = await this.notion.databases.query({
        database_id: this.blogdbID,
        filter: {
          or: [
            {
              property: "Pathname",
              rich_text: {
                contains: pathname,
              },
            },
          ],
        },
      });

      if (response.results.length === 0) {
        throw new GraphQLError("Nothing found!");
      }

      if (!isFullPage(response.results[0])) {
        throw new GraphQLError("Page not found!");
      }

      const [page] = response.results;

      const blocks = await this.notion.blocks.children.list({
        block_id: page.id,
      });

      if (!blocks) {
        throw new GraphQLError("Error reading content");
      }

      const allBlocks = await this.getPaginatedBlocks(page.id);

      return readBlockContent(allBlocks);
    }

    throw new GraphQLError("error connecting to database.");
  }

  @Query((returns) => FilterOpts)
  async filterOpts() {
    if (this.blogdbID) {
      const response = await this.notion.databases.retrieve({
        database_id: this.blogdbID,
      });

      const res: IFilterOpts = {
        frameworks: [],
        type: [],
        languages: [],
        category: [],
      };

      if (response.properties.Frameworks.type === "multi_select") {
        res.frameworks =
          response.properties.Frameworks.multi_select.options.map(
            (option) => option.name
          );
      }

      if (response.properties.Type.type === "multi_select") {
        res.type = response.properties.Type.multi_select.options.map(
          (option) => option.name
        );
      }

      if (response.properties.Languages.type === "multi_select") {
        res.languages = response.properties.Languages.multi_select.options.map(
          (option) => option.name
        );
      }

      if (response.properties.Category.type === "select") {
        res.languages = response.properties.Category.select.options.map(
          (option) => option.name
        );
      }

      return res;
    }

    throw new GraphQLError("error connecting to database.");
  }
}
