import React from "react";
import { ListItem, OrderedList, UnorderedList } from "@chakra-ui/react";
import { IListItem } from "@ammarahmedca/types";
import RichText from "./RichText";

type RecursiveListItemProps = {
  data: IListItem;
  listType: "numbered_list" | "bulleted_list";
};

const RecursiveListItem: React.FC<RecursiveListItemProps> = ({
  data,
  listType,
}) => {
  return (
    <ListItem>
      <RichText data={data.content} />
      {data.children &&
        !!data.children.length &&
        listType === "numbered_list" && (
          <OrderedList>
            {data.children.map((child) => {
              return <RecursiveListItem data={child} listType={listType} />;
            })}
          </OrderedList>
        )}
      {data.children &&
        !!data.children.length &&
        listType === "bulleted_list" && (
          <UnorderedList>
            {data.children.map((child) => {
              return <RecursiveListItem data={child} listType={listType} />;
            })}
          </UnorderedList>
        )}
    </ListItem>
  );
};

export default RecursiveListItem;
