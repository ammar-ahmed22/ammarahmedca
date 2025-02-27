import Properties from "../notion/properties";
import { filterDatabaseResults } from "../notion/utils";
import { databases } from "./database";
import type { Experience } from "@/types/api";

export type ExperienceListOptions = {
  ascending?: boolean;
};

class Experiences {
  async list(opts?: ExperienceListOptions): Promise<Experience[]> {
    const experiences = await databases.experience.query({
      sorts: [
        {
          property: "Timeframe",
          direction: opts?.ascending ? "ascending" : "descending",
        },
      ],
    });

    const { results } = experiences;
    const filteredResults = filterDatabaseResults(results);
    return filteredResults.map((result) => {
      const properties = new Properties(result.properties);
      let icon: string | undefined = undefined;
      if (result.icon && result.icon.type !== "emoji") {
        icon = `/api/notion-assets/page/${result.id}/icon`;
      }
      return {
        id: result.id,
        company: properties.get("Name").asTitle(),
        role: properties.get("Role").asSelect(),
        description: properties.get("Description").asRichText(),
        type: properties.get("Type").asSelect(),
        skills: properties.get("Skills").asMultiSelect(),
        timeframe: properties.get("Timeframe").asDateRange(),
        icon,
      };
    });
  }
}

export const experiences = new Experiences();
