import { isFullBlock } from "@notionhq/client";
import {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { isContentArray } from "../types/typeGuards";

export const readProperty = (property: Record<string, any>) => {
  const { type } = property;
  const value = property[type as string];

  switch (type as string) {
    case "title":
    case "rich_text":
      return value.length > 0 ? value[0].plain_text : "";
    case "multi_select":
      return value.map((item: Record<string, string>) => item.name);
    case "select":
      return value ? value.name : "";
    case "url":
      return value;
    case "date":
      const { start, end } = value;
      return { start, end };
    case "number":
    case "checkbox":
      return value;
    default:
      throw new Error("unable to get property content");
  }
};

export const createDate = (yyyy_mm_dd: string) => {
  const [year, month, day] = yyyy_mm_dd.split("-").map((str) => parseInt(str));
  return new Date(year, month - 1, day, 0, 0, 0);
};

export const mergeListItems = (content: IContent[]): IContent[] => {
  const isListItem = (block: IContent): boolean => {
    return (
      block.type === "numbered_list_item" || block.type === "bulleted_list_item"
    );
  };

  const isList = (block: IContent): boolean => {
    return block.type === "numbered_list" || block.type === "bulleted_list";
  };

  const listItemToList = (type: string): string => type.replace("_item", "");

  const merged: IContent[] = [];

  for (const curr of content) {
    const last = merged[merged.length - 1];

    if (isListItem(curr)) {
      if (!isList(last)) {
        merged.push({
          type: listItemToList(curr.type),
          content: [],
        });
      }
      merged[merged.length - 1].content.push(...curr.content);
    } else {
      merged.push(curr);
    }
  }

  return merged;
};

export const readBlockContent = (
  blocks: (PartialBlockObjectResponse | BlockObjectResponse)[]
): IContent[] | undefined => {
  const result = blocks
    .map((block) => {
      if (!isFullBlock(block)) {
        return undefined;
      }

      const { type } = block;

      switch (type) {
        case "image":
          const image = block[type] as any;
          let url: string = "";
          if (image.type === "external") {
            url = image.external.url;
          } else if (image.type === "file") {
            url = image.file.url;
          }
          const caption =
            block[type].caption.length > 0
              ? block[type].caption[0].plain_text
              : "";
          return {
            type: type as string,
            content: [
              {
                url,
                caption,
              },
            ],
          };
        case "heading_1":
          return {
            type: type as string,
            content: block.heading_1.rich_text.map((text) => {
              return {
                plainText: text.plain_text,
                annotations: {
                  ...text.annotations,
                  color: text.annotations.color as string,
                },
              };
            }),
          };
        case "heading_2":
          return {
            type: type as string,
            content: block.heading_2.rich_text.map((text) => {
              return {
                plainText: text.plain_text,
                annotations: {
                  ...text.annotations,
                  color: text.annotations.color as string,
                },
              };
            }),
          };
        case "heading_3":
          return {
            type: type as string,
            content: block.heading_3.rich_text.map((text) => {
              return {
                plainText: text.plain_text,
                annotations: {
                  ...text.annotations,
                  color: text.annotations.color as string,
                },
              };
            }),
          };
        case "paragraph":
          return {
            type: type as string,
            content: block.paragraph.rich_text.map((text) => {
              return {
                plainText: text.plain_text,
                annotations: {
                  ...text.annotations,
                  color: text.annotations.color as string,
                },
              };
            }),
          };
        case "code":
          return {
            type: type as string,
            content: block.code.rich_text.map((text) => {
              return {
                plainText: text.plain_text,
                annotations: {
                  ...text.annotations,
                  language: block.code.language,
                },
              };
            }),
          };
        case "bulleted_list_item":
          return {
            type: type as string,
            content: block.bulleted_list_item.rich_text.map((text) => {
              return {
                plainText: text.plain_text,
                annotations: {
                  ...text.annotations,
                  color: text.annotations.color as string,
                },
              };
            }),
          };
        case "numbered_list_item":
          return {
            type: type as string,
            content: block.numbered_list_item.rich_text.map((text) => {
              return {
                plainText: text.plain_text,
                annotations: {
                  ...text.annotations,
                  color: text.annotations.color as string,
                },
              };
            }),
          };
        default:
          return undefined;
      }
    })
    .filter((block) => {
      if (!block) {
        return false;
      } else if (block.content.length === 0) {
        return false;
      }

      return true;
    });

  if (isContentArray(result)) return mergeListItems(result);
};
