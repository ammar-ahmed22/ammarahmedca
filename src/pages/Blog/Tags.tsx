import React from "react";
import { Box, Text, Wrap, WrapItem, Tag, Skeleton } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";

type TagsProps = {
  filterSet: Set<string>;
  setFilterSet: React.Dispatch<React.SetStateAction<Set<string>>>;
};

const CustomSkeleton: React.FC = () => {
  return (
    <>
      {new Array(8).fill(0).map((_, idx) => {
        return (
          <Box key={idx} w={10} h={5}>
            <Skeleton w="100%" h="100%" />
          </Box>
        );
      })}
    </>
  );
};

const Tags: React.FC<TagsProps> = ({ filterSet, setFilterSet }) => {
  const { data, loading } = useQuery<{ blogTags: string[] }>(gql`
    query BlogTags {
      blogTags
    }
  `);

  const addFilterTag = (tag: string) => {
    setFilterSet((prev) => new Set(prev.add(tag)));
  };

  return (
    <Box my="2">
      <Text
        mb="2"
        fontSize="xl"
        variant="gradient"
        fontWeight="bold"
        fontFamily="heading"
      >
        Tags
      </Text>
      <Wrap>
        {loading && <CustomSkeleton />}
        {data &&
          data.blogTags
            .filter((tag) => !filterSet.has(tag))
            .map((tag) => {
              return (
                <WrapItem key={tag}>
                  <Tag
                    variant="subtle"
                    colorScheme="brand.purple"
                    transform="scale(0.95)"
                    _hover={{
                      cursor: "pointer",
                      transform: "scale(1)",
                    }}
                    onClick={() => addFilterTag(tag)}
                  >
                    {tag}
                  </Tag>
                </WrapItem>
              );
            })}
      </Wrap>
    </Box>
  );
};

export default Tags;
