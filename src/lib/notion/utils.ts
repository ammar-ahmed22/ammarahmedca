import { isFullBlock, isFullPage } from "@notionhq/client";
import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./client";
import { RichText } from "@/types/api";

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

export async function getAllBlocks(
  startBlockId: string,
): Promise<BlockObjectResponse[]> {
  let hasNext = true;
  let startCursor: string | undefined = undefined;

  const result = [];
  while (hasNext) {
    const response = await notion.blocks.children.list({
      block_id: startBlockId,
      start_cursor: startCursor,
      page_size: 100,
    });
    hasNext = response.has_more;
    startCursor = response.next_cursor ?? undefined;
    for (const block of response.results) {
      if (isFullBlock(block)) {
        result.push(block);
      }
    }
  }
  return result;
}

export function mapRichText(rt: RichTextItemResponse): RichText {
  return {
    plainText: rt.plain_text,
    annotations: {
      ...rt.annotations,
      href: rt.href ?? undefined,
      equation: rt.type === "equation",
    },
  };
}

export function toPlainText(richText: RichText[]): string {
  return richText.map((r) => r.plainText).join("");
}
