import {
  ListItem as ListItemType,
  OrderedListBlock,
  UnorderedListBlock,
} from "@/types/api/blocks";
import RichText from "@/components/ui/rich-text";

export type ListItemProps = {
  type: "unordered" | "ordered";
  data: ListItemType;
  parentId: string;
  depth: number;
  index: number;
};

export const ListItem: React.FC<ListItemProps> = ({
  type,
  data,
  parentId,
  depth,
  index,
}) => {
  const marker = type === "unordered" ? "–" : `${index + 1}.`;
  return (
    <li className="font-mono text-base text-foreground leading-relaxed flex gap-2">
      <span className="text-muted shrink-0 select-none tabular-nums">
        {marker}
      </span>
      <div className="flex-1">
        <RichText data={data.content} as="span" />
        {data.children && (
          <ul className="mt-1 ml-2 flex flex-col gap-1">
            {data.children.map((child, idx) => (
              <ListItem
                key={`${parentId}-${depth + 1}-${idx}`}
                type={type}
                data={child}
                parentId={parentId}
                depth={depth + 1}
                index={idx}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export const UnorderedList: React.FC<UnorderedListBlock> = (
  block,
) => {
  return (
    <ul className="flex flex-col gap-1 my-1">
      {block.content.map((item, idx) => (
        <ListItem
          key={`${block.id}-0-${idx}`}
          type="unordered"
          depth={0}
          parentId={block.id}
          data={item}
          index={idx}
        />
      ))}
    </ul>
  );
};

export const OrderedList: React.FC<OrderedListBlock> = (block) => {
  return (
    <ol className="flex flex-col gap-1 my-1">
      {block.content.map((item, idx) => (
        <ListItem
          key={`${block.id}-0-${idx}`}
          type="ordered"
          depth={0}
          parentId={block.id}
          data={item}
          index={idx}
        />
      ))}
    </ol>
  );
};
