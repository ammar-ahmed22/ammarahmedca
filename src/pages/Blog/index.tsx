import React, { useState } from "react";
import Card from "@website/components/Card";
import RichText from "@website/components/RichText";
import Categories from "./Categories";
import Tags from "./Tags";
import {
  Text,
  Skeleton,
  Box,
  SimpleGrid,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Button,
  Image
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
    <>
      {
        new Array(7).fill(0).map((_, idx) => {
          return <Skeleton height="20vh" key={idx} />
        })
      }
    </>
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
        !category && <Categories />
      }
      {
        !category && <Tags filterSet={filterTags} setFilterSet={setFilterTags} />
      }
      
        <Box w="100%" >
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
          <SimpleGrid columns={2} spacing="5" >
            {
              loading && <CustomSkeleton />
            }
            {
              data && sortByDate(data.blogMetadata).map( metadata => {
                const { category, name, slug, id, date, description, tags, image } = metadata;
                const elapsed = formatDistance(new Date(date), new Date(), { addSuffix: true });
                return (
                  <Card
                    isLink
                    to={`/blog/${stringToDashed(category)}/${slug}`}
                    key={id}
                  >
                    {
                      image && <Image src={image} w="100%" h="20vh" objectFit="cover" />
                    }
                    <Box p="4" >
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
                    </Box>
                  </Card>
                )
              })
            }
          </SimpleGrid>
        </Box>
    </>
  );
};

export default Blog;
