import React, { useState } from "react";
import Card from "@website/components/Card";
import RichText from "@website/components/RichText";
import Categories from "./Categories";
import Tags from "./Tags";
import {
  Text,
  Skeleton,
  SkeletonText,
  Box,
  HStack,
  SimpleGrid,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { IPostMetadata, stringToDashed, dashedToTitleCase } from "@ammarahmedca/types";
import {
  BLOG_METADATA_QUERY,
  BlogMetadataQuery,
} from "@website/graphql/queries/Metadata";
import { formatDistance } from "date-fns";
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
  const { category } = useParams();
  const navigate = useNavigate();
  const [filterTags, setFilterTags] = useState<Set<string>>(new Set<string>())
  const { data, loading } = useQuery<
    BlogMetadataQuery.Response,
    BlogMetadataQuery.Variables
  >(BLOG_METADATA_QUERY, { variables: { onlyPublished: true, category: category ? dashedToTitleCase(category) : undefined, tags: [...filterTags.values()] } });

  // Sorts BlogInfo array by date
  const sortByDate = (array: IPostMetadata[]) => {
    return [...array].sort((a, b) => {
      if (a.date && b.date) {
        return (b.date as unknown as number) - (a.date as unknown as number);
      }

      return 0;
    });
  };

  React.useEffect(() => {
    console.log(data);
  }, [data, loading])

  const removeFilterTag = (tag: string) => {
    setFilterTags(prev => new Set([...prev.values()].filter( x => x !== tag)));
  }

  return (
    <>
      {
        category && (
          <Button
            variant="ghost"
            leftIcon={<ArrowBackIcon />}
            mt="4"
            onClick={() => navigate("/blog")}
          >
            Back
          </Button>
        )
      }
      <Text {...styles.title}>
        <Text {...styles.titleSpan}>{category ? dashedToTitleCase(category) : "Blog"}</Text>
      </Text>
      {
        !category && (
          <Text {...styles.info}>
            Sometimes I like to write about things I've worked on, my experiences or
            anything else of interest to me. Check it out!
          </Text>
        )
      }
      {
        !category && <Tags filterSet={filterTags} setFilterSet={setFilterTags} />
      }
      <HStack align="flex-start" spacing="7" >
        <Box w={category ? "100%" : "70%"} >
          <Text {...styles.subtitle}>{category ? "" : "All "}<Text {...styles.titleSpan}>Posts</Text></Text>
          {
            filterTags &&
            !!filterTags.size &&
            (
              <Wrap align="center" >
                <WrapItem>
                  <Text>Filtered by: </Text>
                </WrapItem>
                {
                  [...filterTags.values()].map( tag => {
                    return (
                      <WrapItem>
                        <Tag
                          variant="subtle"
                          colorScheme="brand.purple"
                          size="sm"
                        >
                          <TagLabel>{tag}</TagLabel>
                          <TagCloseButton 
                            onClick={() => removeFilterTag(tag)}
                          />
                        </Tag>
                      </WrapItem>
                    )
                  })
                }
              </Wrap>
            )
          }
          <SimpleGrid columns={ category ? 2 : 1} spacing="5" >
            {
              data && sortByDate(data.blogMetadata).map( metadata => {
                const { category, name, slug, id, date, description, tags } = metadata;
                const elapsed = formatDistance(new Date(date), new Date(), { addSuffix: true });
                return (
                  <Card
                    isLink
                    to={`/blog/${stringToDashed(category)}/${slug}`}
                    key={id}
                  >
                    <Text {...styles.postTitle}>{name}</Text>
                    <Text {...styles.postInfo}>{elapsed} &bull; {category}</Text>
                    <RichText data={description} {...styles.postDescription} />
                    <Wrap mt="3" >
                      {
                        tags.map( (tag, tagIdx) => {
                          const tagKey = `${tag}-${tagIdx}`;
                          return (
                            <WrapItem key={tagKey} >
                              <Tag
                                variant="subtle"
                                colorScheme="brand.purple"
                                size="sm"
                                key={tagKey}
                              >
                                {tag}
                              </Tag>
                            </WrapItem>
                          )
                        })
                      }
                    </Wrap>
                  </Card>
                )
              })
            }
          </SimpleGrid>
        </Box>
        {
          !category && <Categories />
        }
      </HStack>
      {/* <VStack spacing={{ base: 0, md: 5 }} align="baseline">
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
      </VStack> */}
      {loading && <CustomSkeleton />}
    </>
  );
};

export default Blog;
