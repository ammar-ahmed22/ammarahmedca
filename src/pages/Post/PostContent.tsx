import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  ContentQuery,
  ContentQueryResponse,
  ContentQueryVariables,
} from "@website/graphql/queries/Content";
import { Box, SkeletonText, useDimensions } from "@chakra-ui/react";
import PostBlock from "./PostBlock";
import { TextOrImageIsText } from "@website/graphql/typeGuards";
import PostNav, { HeadingType } from "./PostNav";
import { hyphenate } from "@website/utils/helpers";

interface PostContentProps {
  pathname: string;
  infoLoaded: boolean;
  headerRef: React.MutableRefObject<HTMLDivElement | null>;
}

// Pulls blocks for a blog post and renders the blog content
const PostContent: React.FC<PostContentProps> = ({
  pathname,
  infoLoaded,
  headerRef,
}) => {
  const { data, loading } = useQuery<
    ContentQueryResponse,
    ContentQueryVariables
  >(ContentQuery, { variables: { pathname } });

  const [headings, setHeadings] = useState<HeadingType[]>([]);
  const size = useDimensions(headerRef, false);

  useEffect(() => {
    if (data) {
      const res = data.content
        .map((block) => {
          if (block.type.startsWith("heading")) {
            const [content] = block.content;
            if (TextOrImageIsText(content)) {
              return {
                type: block.type,
                text: content.plainText,
                id: hyphenate(content.plainText),
              };
            }
          }

          return undefined;
        })
        .filter((item) => item !== undefined);
      setHeadings(res as HeadingType[]);
    }
  }, [data]);

  if (!loading && data && infoLoaded) {
    return (
      <>
        {size && !!headings.length && (
          <PostNav
            headings={headings}
            top={Math.round(size.marginBox.bottom)}
          />
        )}
        {data.content.map((block, idx) => {
          return (
            <PostBlock
              type={block.type}
              content={block.content}
              idx={idx}
              key={idx}
            />
          );
        })}
      </>
    );
  } else {
    return (
      <Box mt="5vh">
        <SkeletonText skeletonHeight={20} noOfLines={1} mb="4" />
        <SkeletonText skeletonHeight={4} noOfLines={1} mb="12" />

        <SkeletonText skeletonHeight={8} noOfLines={1} mb="4" />
        <SkeletonText noOfLines={7} mb="4" />
        <SkeletonText noOfLines={5} mb="4" />

        <SkeletonText skeletonHeight={8} noOfLines={1} mb="4" />
        <SkeletonText noOfLines={5} mb="4" />
      </Box>
    );
  }
};

export default PostContent;
