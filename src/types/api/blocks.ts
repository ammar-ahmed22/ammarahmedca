import { RichText } from ".";

export type BlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "code"
  | "callout"
  | "quote"
  | "equation"
  | "video"
  | "orderedList"
  | "unorderedList"; // Add more block types here

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  level: 1 | 2 | 3;
  content: RichText[];
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  content: RichText[];
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  url: string;
  caption: RichText[];
}

export interface CodeBlock extends BaseBlock {
  type: "code";
  content: string;
  language?: string;
  caption: RichText[];
}

export type ListItem = {
  content: RichText[];
  children: ListItem[];
};

export interface OrderedListBlock extends BaseBlock {
  type: "orderedList";
  content: ListItem[];
}

export interface UnorderedListBlock extends BaseBlock {
  type: "unorderedList";
  content: ListItem[];
}

export interface CalloutBlock extends BaseBlock {
  type: "callout";
  icon?: string;
  content: RichText[];
}

export interface QuoteBlock extends BaseBlock {
  type: "quote";
  content: RichText[];
}

export interface EquationBlock extends BaseBlock {
  type: "equation";
  expression: string;
}

export interface VideoBlock extends BaseBlock {
  type: "video";
  url: string;
  caption: RichText[];
}

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | CodeBlock
  | CalloutBlock
  | QuoteBlock
  | EquationBlock
  | VideoBlock
  | OrderedListBlock
  | UnorderedListBlock;
