import Properties from "../notion/properties";
import { filterDatabaseResults } from "../notion/utils";
import { databases } from "./database";
import { PostMetadata } from "@/types/api";
import { toSlug } from "./utils";
import { updatePage } from "../notion/utils";

export type PostListOptions = {
  onlyPublished?: boolean;
  ascending?: boolean;
  slug?: string;
};

class Posts {
  async list(opts?: PostListOptions): Promise<PostMetadata[]> {
    const and = [];
    if (opts?.onlyPublished) {
      and.push({
        property: "publish",
        checkbox: {
          equals: true,
        },
      });
    }

    if (opts?.slug) {
      and.push({
        property: "slug",
        rich_text: {
          equals: opts.slug,
        },
      });
    }

    const response = await databases.blog.query({
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

    const { results } = response;
    const filteredResults = filterDatabaseResults(results);

    const posts = await Promise.all(
      filteredResults.map(async (result) => {
        const properties = new Properties(result.properties);
        const dbSlug = properties
          .get("slug")
          .asRichText()
          .map((r) => r.plainText)
          .join("");
        let genSlug: string | undefined = undefined;
        if (!dbSlug) {
          genSlug = toSlug(properties.get("name").asTitle());
          await updatePage(result.id, {
            slug: {
              rich_text: [
                {
                  text: {
                    content: genSlug,
                  },
                },
              ],
            },
          });
        }
        let image: string | undefined = undefined;
        if (result.cover) {
          if (result.cover.type === "external") {
            image = result.cover.external.url;
          } else if (result.cover.type === "file") {
            image = result.cover.file.url;
          }
        }

        return {
          id: result.id,
          name: properties.get("name").asTitle(),
          description: properties.get("description").asRichText(),
          category: properties.get("category").asSelect(),
          tags: properties.get("tags").asMultiSelect(),
          date: properties.get("date").asDateRange()?.start,
          slug: dbSlug ?? genSlug!,
          image,
        };
      }),
    );
    return posts;
  }
}

export const posts = new Posts();
