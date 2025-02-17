import { isFullPage } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

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
