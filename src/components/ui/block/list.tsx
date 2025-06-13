import {
  ListItem as ListItemType,
  OrderedListBlock,
  UnorderedListBlock,
} from "@/types/api/blocks";
import RichText from "@/components/ui/rich-text";
import { cn } from "@/lib/utils";

export type ListItemProps = {
  type: "unordered" | "ordered";
  data: ListItemType;
  parentId: string;
  depth: number;
};

export const ListItem: React.FC<ListItemProps> = ({
  type,
  data,
  parentId,
  depth,
}) => {
  const Parent =
    type === "unordered"
      ? ("ul" as React.ElementType)
      : ("ol" as React.ElementType);
  return (
    <li>
      <RichText data={data.content} as="span" />
      {data.children && (
        <Parent
          style={{
            marginLeft: `${(depth + 1) * 1}rem`,
          }}
          className={cn("list-inside", {
            "list-[revert]": type === "unordered",
            "list-[lower-alpha]": type === "ordered",
          })}
        >
          {data.children.map((child, idx) => {
            return (
              <ListItem
                key={`${parentId}-${depth + 1}-${idx}`}
                type={type}
                data={child}
                parentId={parentId}
                depth={depth + 1}
              />
            );
          })}
        </Parent>
      )}
    </li>
  );
};

export const UnorderedList: React.FC<UnorderedListBlock> = (
  block,
) => {
  return (
    <ul className="list-disc list-inside">
      {block.content.map((item, idx) => {
        return (
          <ListItem
            key={`${block.id}-0-${idx}`}
            type="unordered"
            depth={0}
            parentId={block.id}
            data={item}
          />
        );
      })}
    </ul>
  );
};

export const OrderedList: React.FC<OrderedListBlock> = (block) => {
  return (
    <ol className="list-decimal list-inside">
      {block.content.map((item, idx) => {
        return (
          <ListItem
            key={`${block.id}-0-${idx}`}
            type="ordered"
            depth={0}
            parentId={block.id}
            data={item}
          />
        );
      })}
    </ol>
  );
};
