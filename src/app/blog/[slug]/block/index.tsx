import { BlockType, Block as ContentBlock } from "@/types/api/blocks";
import Heading from "./heading";
import Paragraph from "./paragraph";
import Callout from "./callout";
import { UnorderedList, OrderedList } from "./list";
import Equation from "./equation";
import Quote from "./quote";
import Code from "./code";
import Image from "./image";
import Video from "./video";

export type BlockProps = {
  block: ContentBlock;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<BlockType, React.FC<any>> = {
  paragraph: Paragraph,
  heading: Heading,
  code: Code,
  image: Image,
  video: Video,
  equation: Equation,
  callout: Callout,
  quote: Quote,
  unorderedList: UnorderedList,
  orderedList: OrderedList,
};

export default function Block({ block }: BlockProps) {
  const Component = components[block.type];
  return <Component {...block} />;
}
