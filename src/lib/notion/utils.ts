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
import {
  Block,
  CalloutBlock,
  CodeBlock,
  EquationBlock,
  HeadingBlock,
  ImageBlock,
  ListItem,
  OrderedListBlock,
  ParagraphBlock,
  QuoteBlock,
  UnorderedListBlock,
  VideoBlock,
} from "@/types/api/blocks";
import { v4 as uuid } from "uuid";

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

export function mapRichText(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rt: RichTextItemResponse | any,
): RichText {
  return {
    plainText: rt.plain_text ?? rt.text?.content ?? "",
    annotations: {
      ...rt.annotations,
      href: rt.href ?? rt.text?.link?.url ?? undefined,
      equation: rt.type === "equation",
    },
  };
}

export function toPlainText(richText: RichText[]): string {
  return richText.map((r) => r.plainText).join("");
}
export async function getAllListChildren(
  parentId: string,
  block: BlockObjectResponse,
): Promise<ListItem[]> {
  const result: ListItem[] = [];
  if (!block.has_children) {
    return result;
  }
  const resp = await getAllBlocks(parentId);
  for (const block of resp) {
    if (isFullBlock(block)) {
      if (block.type === "bulleted_list_item") {
        result.push({
          content:
            block.bulleted_list_item.rich_text.map(mapRichText),
          children: await getAllListChildren(block.id, block),
        });
      } else if (block.type === "numbered_list_item") {
        result.push({
          content:
            block.numbered_list_item.rich_text.map(mapRichText),
          children: await getAllListChildren(block.id, block),
        });
      }
    }
  }
  return result;
}

export async function parseBlocks(
  blocks: BlockObjectResponse[],
): Promise<Block[]> {
  const content: Block[] = [];
  let listType: "unorderedList" | "orderedList" = "unorderedList";
  let listStack: ListItem[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "heading_1":
        content.push({
          id: block.id,
          type: "heading",
          level: 1,
          content: block.heading_1.rich_text.map(mapRichText),
        } as HeadingBlock);
        break;
      case "heading_2":
        content.push({
          id: block.id,
          type: "heading",
          level: 2,
          content: block.heading_2.rich_text.map(mapRichText),
        } as HeadingBlock);
        break;
      case "heading_3":
        content.push({
          id: block.id,
          type: "heading",
          level: 3,
          content: block.heading_3.rich_text.map(mapRichText),
        } as HeadingBlock);
        break;
      case "paragraph":
        content.push({
          id: block.id,
          type: "paragraph",
          content: block.paragraph.rich_text.map(mapRichText),
        } as ParagraphBlock);
        break;
      case "image":
        content.push({
          id: block.id,
          type: "image",
          url: `/api/notion-assets/block/${block.id}/image`,
          caption: block.image.caption?.map(mapRichText) ?? [],
        } as ImageBlock);
        break;
      case "code":
        content.push({
          id: block.id,
          type: "code",
          language: block.code.language,
          content: block.code.rich_text
            .map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (r: RichTextItemResponse | any) =>
                r.plain_text || r.text?.content,
            )
            .join(""),
          caption: block.code.caption?.map(mapRichText) ?? [],
        } as CodeBlock);
        break;
      case "bulleted_list_item":
        listType = "unorderedList";
        listStack.push({
          content:
            block.bulleted_list_item.rich_text.map(mapRichText),
          children: await getAllListChildren(block.id, block),
        });
        break;
      case "numbered_list_item":
        listType = "orderedList";
        listStack.push({
          content:
            block.numbered_list_item.rich_text.map(mapRichText),
          children: await getAllListChildren(block.id, block),
        });
        break;
      case "equation":
        content.push({
          id: block.id,
          type: "equation",
          expression: block.equation.expression,
        } as EquationBlock);
        break;
      case "quote":
        content.push({
          id: block.id,
          type: "quote",
          content: block.quote.rich_text.map(mapRichText),
        } as QuoteBlock);
        break;
      case "callout":
        let icon: string | undefined = undefined;
        if (block.callout.icon) {
          if (block.callout.icon.type === "emoji") {
            icon = block.callout.icon.emoji;
          }
        }
        content.push({
          id: block.id,
          type: "callout",
          icon,
          content: block.callout.rich_text.map(mapRichText),
        } as CalloutBlock);
        break;
      case "video":
        content.push({
          id: block.id,
          type: "video",
          url: `/api/notion-assets/block/${block.id}/video`,
          caption: block.video.caption.map(mapRichText),
        } as VideoBlock);
        break;
      default:
        console.warn("Encountered unknown block type: " + block.type);
        break;
    }
    if (
      block.type !== "numbered_list_item" &&
      block.type !== "bulleted_list_item"
    ) {
      if (listStack.length > 0) {
        // Insert before the last element for correct ordering
        if (listType === "unorderedList") {
          content.splice(content.length - 1, 0, {
            id: uuid(),
            type: "unorderedList",
            content: listStack,
          } as UnorderedListBlock);
        } else {
          content.splice(content.length - 1, 0, {
            id: uuid(),
            type: "orderedList",
            content: listStack,
          } as OrderedListBlock);
        }
        listStack = [];
      }
    }
  }
  if (listStack.length > 0) {
    // Insert before the last element for correct ordering
    if (listType === "unorderedList") {
      content.splice(content.length - 1, 0, {
        id: uuid(),
        type: "unorderedList",
        content: listStack,
      } as UnorderedListBlock);
    } else {
      content.splice(content.length - 1, 0, {
        id: uuid(),
        type: "orderedList",
        content: listStack,
      } as OrderedListBlock);
    }
    listStack = [];
  }

  return content;
}
