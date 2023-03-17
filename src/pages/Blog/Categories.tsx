import React from "react";
import { Box, Text, Link, Skeleton, Wrap, WrapItem, useColorModeValue } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CustomSkeleton: React.FC = () => {
  return (
    <>
      {
        new Array(4).fill(0).map((_, idx) => {
          return (
            <Box h="5" w="10" key={idx}>
              <Skeleton 
                h="100%"
                w="100%"
              />
            </Box>
          )
        })
      }
    </>
  )
}

const Categories : React.FC = () => {
  const { data, loading } = useQuery<{ blogCategories: string[] }>(gql`
    query BlogCategories{
      blogCategories
    }
  `)

  const color = useColorModeValue("gray.500", "gray.400");
  const hoverColor = useColorModeValue("gray.800", "gray.50");
  return (
    <Box>
      <Text mb="2" fontSize="xl" variant="gradient" fontWeight="bold" fontFamily="heading">Categories</Text>
      <Wrap >
        {
          loading && <CustomSkeleton />
        }
        {
          data && data.blogCategories
            .map((c, i, arr) => {
              if (i !== arr.length - 1) return [c, i]
              return [c]
            })
            .flatMap(c => c)
            .map( (category, idx, arr) => {
              
            return (
              <WrapItem key={idx}>
                {
                  typeof category === "string" && (
                    <Link
                      as={ReactLink}
                      to={`/blog/${category.toLowerCase()}`}
                      fontSize="md"
                      fontWeight="thin"
                      color={color}
                      _hover={{
                        color: hoverColor
                      }}
                    >
                      {category}
                    </Link>
                  )
                }
                {
                  typeof category === "number" && (
                    <Text>&bull;</Text>
                  )
                }
              </WrapItem>
            )
          })
        }
      </Wrap>
    </Box>
  )
}

export default Categories;