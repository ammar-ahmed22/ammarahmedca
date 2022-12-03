import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import { Client, isFullPage } from "@notionhq/client";
import { Arg, Query, Resolver } from "type-graphql";
import { readProperty } from "../../utils/Notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { createDate } from "../../utils/Notion";

import { Experience, Skill } from "../typeDefs/Website";

@Resolver()
export class WebsiteResolver {
  constructor(
    private notion = new Client({ auth: process.env.NOTION_INTEGRATION_KEY }),
    private expdbId = process.env.NOTION_EXP_DB_ID,
    private skilldbId = process.env.NOTION_SKILL_DB_ID
  ) {}

  private createExperience = (page: PageObjectResponse): IExperience => {
    const { start, end } = readProperty(page.properties.Timeframe);
    const timeframe: ITimeframe = {
      start: createDate(start),
      end: end ? createDate(end) : undefined,
    };

    let description: IText[] = [];

    if (page.properties.Description.type === "rich_text") {
      description = page.properties.Description.rich_text.map((item): IText => {
        return {
          plainText: item.plain_text,
          annotations: item.annotations,
        };
      });
    }

    return {
      company: readProperty(page.properties.Name),
      role: readProperty(page.properties.Role),
      description,
      type: readProperty(page.properties.Type),
      skills: readProperty(page.properties.Skills),
      timeframe,
    };
  };

  @Query((returns) => [Experience], { description: "Gets all experiences." })
  async experiences() {
    if (this.expdbId) {
      const response = await this.notion.databases.query({
        database_id: this.expdbId,
        filter: {
          or: [],
        },
      });

      return response.results.map((page) => {
        if (isFullPage(page)) {
          return this.createExperience(page);
        }
      });
    }

    throw new Error("error connecting to database.");
  }

  @Query((returns) => [Skill], {
    description: "Gets all skill values with optional filtering by type.",
  })
  async skills(@Arg("onlyType", { nullable: true }) onlyType?: string) {
    if (this.skilldbId) {
      const filter: any = {
        or: [],
      };

      if (onlyType) {
        filter.or.push({
          property: "Type",
          select: {
            equals: onlyType,
          },
        });
      }
      const response = await this.notion.databases.query({
        database_id: this.skilldbId,
        filter,
      });

      return response.results.map((page) => {
        if (isFullPage(page)) {
          return {
            name: readProperty(page.properties.Name),
            type: readProperty(page.properties.Type),
            value: readProperty(page.properties.Competency),
          };
        }
      });
    }

    throw new Error("error connecting to database.");
  }

  @Query((returns) => [String], { description: "Gets all types for skills." })
  async skillTypes() {
    if (this.skilldbId) {
      const response = await this.notion.databases.retrieve({
        database_id: this.skilldbId,
      });

      if (response.properties.Type.type === "select") {
        return response.properties.Type.select.options.map(
          (option) => option.name
        );
      }

      throw new Error("Could not find anything!");
    }

    throw new Error("error connecting to database.");
  }
}
