import { Project } from "@/types/api";
import { filterDatabaseResults } from "../notion/utils";
import { databases } from "./database";
import Properties from "@/lib/notion/properties";

export type ProjectListOptions = {
  onlyPublished?: boolean;
  ascending?: boolean;
};

export const projects = {
  list: async (opts?: ProjectListOptions): Promise<Project[]> => {
    const and = [];
    if (opts?.onlyPublished) {
      and.push({
        property: "publish",
        checkbox: {
          equals: true,
        },
      });
    }
    const projects = await databases.projects.query({
      filter: {
        and,
      },
      sorts: [
        {
          property: "date",
          direction: opts?.ascending ? "ascending" : "descending",
        },
      ],
    });
    const { results } = projects;
    const filteredResults = filterDatabaseResults(results);

    return filteredResults.map((result) => {
      const properties = new Properties(result.properties);
      let image: string | undefined = undefined;
      if (result.cover) {
        if (result.cover.type === "external") {
          image = result.cover.external.url;
        } else {
          image = result.cover.file.url;
        }
      }
      return {
        id: result.id,
        name: properties.get("name").asTitle(),
        description: properties.get("description").asRichText(),
        date: properties.get("date").asDateRange(),
        languages: properties.get("languages").asMultiSelect(),
        frameworks: properties.get("frameworks").asMultiSelect(),
        type: properties.get("type").asMultiSelect(),
        github: properties.get("github").asUrl(),
        external: properties.get("external").asUrl(),
        publish: properties.get("publish").asCheckbox(),
        image,
      };
    });
  },
};
