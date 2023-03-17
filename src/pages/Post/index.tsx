import React, { useRef } from "react";
import {
  Text,
  Box,
  Button,
  SkeletonText,
  Wrap,
  WrapItem,
  Tag,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  BLOG_POST_QUERY,
  BlogPostQuery,
} from "@website/graphql/queries/Content";
import { useRenderedBlocks } from "./helpers";
import { styles } from "./styles/index.styles";
import { formatDistance } from "date-fns";
import { Helmet } from "react-helmet";

const Post: React.FC = () => {
  // const postName = useLoaderData() as string;
  const { slug } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => navigate("/blog");

  const { data, loading } = useQuery<
    BlogPostQuery.Response,
    BlogPostQuery.Variables
  >(BLOG_POST_QUERY, { variables: { slug: slug as string } });

  const renderedBlocks = useRenderedBlocks(data?.postBySlug.content);
  const headerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {loading && (
        <Box mt="5vh">
          <SkeletonText skeletonHeight={20} noOfLines={1} mb="4" />
          <SkeletonText skeletonHeight={4} noOfLines={1} mb="12" />

          <SkeletonText skeletonHeight={8} noOfLines={1} mb="4" />
          <SkeletonText noOfLines={7} mb="4" />
          <SkeletonText noOfLines={5} mb="4" />

          <SkeletonText skeletonHeight={8} noOfLines={1} mb="4" />
          <SkeletonText noOfLines={5} mb="4" />
        </Box>
      )}
      {!loading && data && !!renderedBlocks.length && (
        <Box my={5} ref={headerRef}>
          <Helmet>
            <title>Blog | {data.postBySlug.metadata.name}</title>
          </Helmet>
          <Button
            leftIcon={<ArrowBackIcon />}
            mt={4}
            variant="ghost"
            onClick={handleBackClick}
          >
            Back
          </Button>
          <Text {...styles.title}>{data.postBySlug.metadata.name}</Text>
          <Text {...styles.info}>
            {formatDistance(
              new Date(data.postBySlug.metadata.date),
              new Date(),
              { addSuffix: true }
            )}{" "}
            &bull; {data.postBySlug.metadata.category}
          </Text>
          <Wrap mt="2">
            {data.postBySlug.metadata.tags.map((tag) => {
              return (
                <WrapItem key={tag}>
                  <Tag variant="subtle" colorScheme="brand.purple">
                    {tag}
                  </Tag>
                </WrapItem>
              );
            })}
          </Wrap>
          <Box mt="10">{renderedBlocks}</Box>
        </Box>
      )}
    </>
  );
};

export default Post;
