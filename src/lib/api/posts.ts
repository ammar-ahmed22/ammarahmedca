import Properties from "../notion/properties";
import {
  filterDatabaseResults,
  getAllBlocks,
  parseBlocks,
} from "../notion/utils";
import { databases } from "./database";
import { PostMetadata } from "@/types/api";
import { toSlug } from "./utils";
import { updatePage } from "../notion/utils";
import { Block } from "@/types/api/blocks";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { toPlainText } from "../notion/utils";

export type PostListOptions = {
  onlyPublished?: boolean;
  ascending?: boolean;
  slug?: string;
};

export type PostContentOptions = {
  slug: string;
};

export type PostContentResponse = {
  metadata: PostMetadata;
  content: Block[];
};

class Posts {
  async parseMetadata(
    page: PageObjectResponse,
  ): Promise<PostMetadata> {
    const properties = new Properties(page.properties);
    const dbSlug = toPlainText(properties.get("slug").asRichText());
    let genSlug: string | undefined = undefined;
    if (!dbSlug) {
      genSlug = toSlug(properties.get("name").asTitle());
      await updatePage(page.id, {
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
    if (page.cover) {
      image = `/api/notion-assets/page/${page.id}/cover`;
    }

    return {
      id: page.id,
      name: properties.get("name").asTitle(),
      description: properties.get("description").asRichText(),
      category: properties.get("category").asSelect(),
      tags: properties.get("tags").asMultiSelect(),
      date: properties.get("date").asDateRange()?.start,
      slug: dbSlug ?? genSlug!,
      image,
    };
  }
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
        const metadata = await this.parseMetadata(result);
        return metadata;
      }),
    );
    if (process.env.NODE_ENV === "production") {
      return posts.filter(
        (post) =>
          post.slug === "about" ||
          !post.tags.some((tag) => tag.startsWith("_test_")) ||
          !post.category?.startsWith("_test_"),
      );
    }
    return posts;
  }

  async content(
    opts: PostContentOptions,
  ): Promise<PostContentResponse> {
    const resp = await databases.blog.query({
      filter: {
        and: [
          {
            property: "slug",
            rich_text: {
              equals: opts.slug,
            },
          },
        ],
      },
    });

    if (resp.results.length === 0) {
      throw new Error("404: Nothing found." + opts.slug);
    }

    const filteredResults = filterDatabaseResults(resp.results);
    const [page] = filteredResults;
    const allBlocks = await getAllBlocks(page.id);
    const content = await parseBlocks(allBlocks);
    const metadata = await this.parseMetadata(page);
    return {
      metadata,
      content,
    };
  }
}
export const posts = new Posts();
