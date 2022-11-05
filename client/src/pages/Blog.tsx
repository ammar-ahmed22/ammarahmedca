import React from 'react';
import Card from '../components/Card';
import { Text, Skeleton, SkeletonText, Box, Divider, VStack } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { BlogInfoQuery } from '../graphql/queries/BlogInfo';
import * as helper from "../utils/helpers"
import { styles } from './Blog.styles';

const CustomSkeleton = () => {
    return (
        <Box>
            <Box>
                <SkeletonText my={4} skeletonHeight={6} noOfLines={1} w='30%'  />
                <Skeleton height="15vh" my={3} />
                <Skeleton height="15vh" my={3} />
            </Box>
            <Box>
                <SkeletonText my={4} skeletonHeight={6} noOfLines={1} w='30%'  />
                <Skeleton height="15vh" my={3} />
                <Skeleton height="15vh" my={3} />
            </Box>
        </Box>
    )
}

const Blog : React.FC = () => {

    const { data, loading } = useQuery<BlogInfo>(BlogInfoQuery);
    
    // Sorts BlogInfo array by date
    const sortByDate = (array: BlogInfo[]) => {
        return [...array].sort( ( a, b ) => Date.parse(b.published as string) - Date.parse(a.published as string))
    }

    // Sorts BlogCategory array by number of posts in descending order
    const sortBySize = (array: BlogCategory[]) => {
        return [...array].sort( ( a, b ) => b.posts.length - a.posts.length);
    }

    const hyphenate = (str: string) => {
        return str.toLowerCase().split(" ").join("-");
    }

    return (
        <>
                <Text {...styles.title} >My <Text {...styles.titleSpan} >Journal</Text></Text>
                <Text {...styles.info} >Sometimes I like to write about things I've worked on, my experiences or anything else of interest to me. Check it out!</Text>
                <VStack  spacing={{ base: 0, md: 5 }} align="baseline" >                
                {
                    data && sortBySize(data.BlogInfo).map( (categoryPosts, catIdx) => {
                        const { category, posts } = categoryPosts;
                        return (
                            <Box  key={catIdx} width={"100%"} >
                                <Text {...styles.category} >{category}</Text>
                                {
                                    sortByDate(posts).map( (post, postIdx) => {
                                        const { name, readTime, description, published } = post;
                                        return (
                                            <Card isLink to={`/blog/${encodeURIComponent(hyphenate(name))}`} key={postIdx} >
                                                <Text {...styles.postTitle} >{name}</Text>
                                                <Text {...styles.postInfo} >{helper.displayTimeSince(published as string)} &bull; {readTime} min read</Text>
                                                <Text {...styles.postDescription} >{description}</Text>
                                            </Card>
                                        )
                                    })
                                }
                                <Divider mt="10" />
                            </Box>
                        )
                    })
                }
                </VStack>
                {
                    loading && <CustomSkeleton />
                }
        </>
    );
}

export default Blog;
