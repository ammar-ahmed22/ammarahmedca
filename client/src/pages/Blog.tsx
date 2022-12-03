import React from "react";
import Card from "../components/Card";
import {
  Text,
  Skeleton,
  SkeletonText,
  Box,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import {
  BlogMetadataQuery,
  BlogMetadataQueryResponse,
  BlogMetadataQueryVariables,
} from "../graphql/queries/Metadata";
import * as helper from "../utils/helpers";
import { styles } from "./Blog.styles";

const CustomSkeleton = () => {
  return (
    <Box>
      <Box>
        <SkeletonText my={4} skeletonHeight={6} noOfLines={1} w="30%" />
        <Skeleton height="15vh" my={3} />
        <Skeleton height="15vh" my={3} />
      </Box>
      <Box>
        <SkeletonText my={4} skeletonHeight={6} noOfLines={1} w="30%" />
        <Skeleton height="15vh" my={3} />
        <Skeleton height="15vh" my={3} />
      </Box>
    </Box>
  );
};

const Blog: React.FC = () => {
  const { data, loading } = useQuery<
    BlogMetadataQueryResponse,
    BlogMetadataQueryVariables
  >(BlogMetadataQuery, { variables: { publishedOnly: true } });

  // Sorts BlogInfo array by date
  const sortByDate = (array: IMetadata[]) => {
    return [...array].sort((a, b) => {
      if (a.published && b.published) {
        return b.published - a.published;
      }

      return 0;
    });
  };

  const mapCategory = (array: IMetadata[]): Record<string, IMetadata[]> => {
    const result: Record<string, IMetadata[]> = {};
    array.forEach((metadata) => {
      if (metadata.category) {
        if (metadata.category in result) {
          result[metadata.category].push(metadata);
        } else {
          result[metadata.category] = [metadata];
        }
      }
    });

    return result;
  };

  return (
    <>
      <Text {...styles.title}>
        My <Text {...styles.titleSpan}>Journal</Text>
      </Text>
      <Text {...styles.info}>
        Sometimes I like to write about things I've worked on, my experiences or
        anything else of interest to me. Check it out!
      </Text>
      <VStack spacing={{ base: 0, md: 5 }} align="baseline">
        {data &&
          Object.keys(mapCategory(data.blogMetadata)).map(
            (category, catIdx) => {
              const posts = mapCategory(data.blogMetadata)[category];
              return (
                <Box key={catIdx} width={"100%"}>
                  <Text {...styles.category}>{category}</Text>
                  {sortByDate(posts).map((post, postIdx) => {
                    const { name, readTime, description, published, pathname } =
                      post;
                    return (
                      <Card
                        isLink
                        to={`/blog/${pathname as string}`}
                        key={postIdx}
                      >
                        <Text {...styles.postTitle}>{name}</Text>
                        <Text {...styles.postInfo}>
                          {helper.displayTimeSince(published as number)} &bull;{" "}
                          {readTime} min read
                        </Text>
                        <Text {...styles.postDescription}>{description}</Text>
                      </Card>
                    );
                  })}
                  <Divider mt="10" />
                </Box>
              );
            }
          )}
      </VStack>
      {loading && <CustomSkeleton />}
    </>
  );
};

export default Blog;
