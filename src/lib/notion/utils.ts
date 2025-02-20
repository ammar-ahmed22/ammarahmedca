import { isFullPage } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./client";

type DatabaseResults = (
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse
)[];

export function filterDatabaseResults(
  results: DatabaseResults,
): PageObjectResponse[] {
  return results.filter(
    (result) => isFullPage(result) && result,
  ) as PageObjectResponse[];
}

type UpdatePageProperties = Parameters<
  (typeof notion)["pages"]["update"]
>[0]["properties"];

export async function updatePage(
  pageId: string,
  properties: UpdatePageProperties,
): Promise<void> {
  await notion.pages.update({ page_id: pageId, properties });
}
