import { Project } from "@/types/api";
import { filterDatabaseResults } from "../notion/utils";
import { databases } from "./database";
import Properties from "@/lib/notion/properties";

export type ProjectListOptions = {
  onlyPublished?: boolean;
  ascending?: boolean;
};

export type ProjectFilterPropertiesOptions = {
  onlyPublished?: boolean;
  projects?: Project[];
};

export type ProjectFilterProperties = {
  types: string[];
  languages: string[];
  frameworks: string[];
};

class Projects {
  async list(opts?: ProjectListOptions): Promise<Project[]> {
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

    const parsedProjects = filteredResults.map((result) => {
      const properties = new Properties(result.properties);
      let image: string | undefined = undefined;
      if (result.cover) {
        image = `/api/notion-assets/page/${result.id}/cover`;
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

    if (process.env.NODE_ENV === "production") {
      return parsedProjects.filter(
        (project) =>
          !project.type.some((type) => type.startsWith("_test_")),
      );
    }
    return parsedProjects;
  }

  async filterProperties(
    opts?: ProjectFilterPropertiesOptions,
  ): Promise<ProjectFilterProperties> {
    const resp = await databases.projects.retrieve();
    const result: ProjectFilterProperties = {
      types: [],
      languages: [],
      frameworks: [],
    };
    if (resp.properties.type.type === "multi_select") {
      result.types = resp.properties.type.multi_select.options.map(
        (option) => option.name,
      );
    }

    if (resp.properties.languages.type === "multi_select") {
      result.languages =
        resp.properties.languages.multi_select.options.map(
          (option) => option.name,
        );
    }

    if (resp.properties.frameworks.type === "multi_select") {
      result.frameworks =
        resp.properties.frameworks.multi_select.options.map(
          (option) => option.name,
        );
    }

    if (opts?.onlyPublished) {
      const projects =
        opts.projects ?? (await this.list({ onlyPublished: true }));
      const types = new Set<string>();
      const languages = new Set<string>();
      const frameworks = new Set<string>();
      projects.forEach((project) => {
        project.type.forEach((type) => types.add(type));
        project.languages.forEach((language) =>
          languages.add(language),
        );
        project.frameworks.forEach((framework) =>
          frameworks.add(framework),
        );
      });
      result.types = [...types.values()];
      result.languages = [...languages.values()];
      result.frameworks = [...frameworks.values()];
    }

    if (process.env.NODE_ENV === "production") {
      result.types = result.types.filter(
        (type) => !type.startsWith("_test_"),
      );
    }
    return result;
  }
}

export const projects = new Projects();
