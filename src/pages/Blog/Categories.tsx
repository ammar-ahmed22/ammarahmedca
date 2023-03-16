import React from "react";
import { Box, Text, VStack, Link, Skeleton } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { styles } from "./Blog.styles";

const CustomSkeleton: React.FC = () => {
  return (
    <>
      {
        new Array(4).fill(0).map((_, idx) => {
          return (
            <Box pb="1" pl="5" h="5" w="100%">
              <Skeleton 
                h="100%"
                w="100%"
                key={idx}
                mb="2"
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
  return (
    <Box w="30%" >
      <Text {...styles.subtitle} variant="gradient">Categories</Text>
      <VStack align="flex-start"  spacing="0" >
        {
          loading && <CustomSkeleton />
        }
        {
          data && data.blogCategories.map( category => {
            return (
              <Link
                as={ReactLink}
                to={`/blog/${category.toLowerCase()}`}
                fontSize="lg"
                fontWeight="bold"
                pl="5"
                borderColor="gray.400" 
                borderLeftStyle="solid" 
                borderLeftWidth="2px"
                pb="1"
                transition="border-color .35s ease-in-out"
                _hover={{
                  borderColor: "brand.purple.500",
                  transition: "border-color .35s ease-in-out"
                }}
              >
                {category}
              </Link>
            )
          })
        }
      </VStack>
    </Box>
  )
}

export default Categories;