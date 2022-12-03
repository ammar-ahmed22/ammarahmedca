import React from "react";
import { useQuery } from "@apollo/client";
import {
  ContentQuery,
  ContentQueryResponse,
  ContentQueryVariables,
} from "../../graphql/queries/Content";
import { Box, SkeletonText } from "@chakra-ui/react";
import PostBlock from "./PostBlock";

interface PostContentProps {
  pathname: string;
  infoLoaded: boolean;
}

// Pulls blocks for a blog post and renders the blog content
const PostContent: React.FC<PostContentProps> = ({ pathname, infoLoaded }) => {
  const { data, loading } = useQuery<
    ContentQueryResponse,
    ContentQueryVariables
  >(ContentQuery, { variables: { pathname } });

  if (!loading && data && infoLoaded) {
    return (
      <>
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
