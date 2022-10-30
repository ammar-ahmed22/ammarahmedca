import React, { useEffect, useState } from 'react';
import NavBar from '../components/Page/NavBar';
import PageContent from '../components/Page/PageContent';
import Footer from '../components/Page/Footer';
import Card from '../components/Card';
import { Text, Skeleton, SkeletonText, Box, useColorModeValue, Divider, SimpleGrid, HStack, VStack } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import * as helper from "../utils/helpers"

const CustomSkeleton = () => {
    return (
        <SimpleGrid columns={{ base: 1, md: 2}} spacing={2} >
            <Box>
                <SkeletonText mb={2} skeletonHeight={6} noOfLines={1} w='50%' mx={{base: 2, md: 0}} mt={2} />
                <Skeleton height="30vh" my={2} mx={{base: 2, md: 0}}/>
                <Skeleton height="30vh" my={2} mx={{base: 2, md: 0}}/>
            </Box>
            <Box>
                <SkeletonText mb={2} skeletonHeight={6} noOfLines={1} w="50%" mx={{base: 2, md: 0}} mt={2}/>
                <Skeleton height="30vh" my={2} mx={{base: 2, md: 0}}/>
                <Skeleton height="30vh" my={2} mx={{base: 2, md: 0}}/>
            </Box>
        </SimpleGrid>
    )
}

const Blog = () => {
    

    const GET_BLOG_INFO = gql`
        query {
            BlogInfo{
                category
                posts{
                    id
                    name
                    description
                    published
                    readTime
                    category
                }
            }
            
        }
    `

    const { data, loading, error } = useQuery(GET_BLOG_INFO);


    const styleProps = {
        title : {
            fontSize: "6xl",
            fontFamily: "heading",
            as: "h1"
        },
        titleSpan: {
            as: "span",
            variant: "gradient"
        },
        category: {
            as: "h3",
            fontSize: "3xl",
            fontFamily: "heading",
            // variant: "gradient"
        },
        info: {
            fontSize: "lg"
        },
        postTitle: {
            fontSize: "2xl",
            fontFamily: "heading",
            fontWeight: "semibold"
        },
        postDescription: {
            my: 0,
            fontSize: "sm"
        },
        postInfo: {
            fontSize: "sm",
            fontWeight: "light",
            color: "gray.500"
        }
    }

    
    // Sorts BlogInfo array by date
    const sortByDate = (array) => {
        return [...array].sort( ( a, b ) => Date.parse(b.published) - Date.parse(a.published))
    }

    // Sorts BlogCategory array by number of posts in descending order
    const sortBySize = (array) => {
        return [...array].sort( ( a, b ) => b.posts.length - a.posts.length);
    }

    const hyphenate = string => {
        return string.toLowerCase().split(" ").join("-");
    }

    return (
        <>
            {/* <NavBar active="blog"/>
            <PageContent> */}
                <Text {...styleProps.title} >My <Text {...styleProps.titleSpan} >Journal</Text></Text>
                <Text {...styleProps.info} >Sometimes I like to write about things I've worked on, my experiences or anything else of interest to me. Check it out!</Text>
                <VStack  spacing={{ base: 0, md: 5 }} align="baseline" >                
                {
                    data && sortBySize(data.BlogInfo).map( (categoryPosts, catIdx) => {
                        const { category, posts } = categoryPosts;
                        return (
                            <Box  key={catIdx} width={"100%"} >
                                <Text {...styleProps.category} >{category}</Text>
                                {
                                    sortByDate(posts).map( (post, postIdx) => {
                                        const { name, id, readTime, description, published } = post;
                                        return (
                                            <Card isLink to={{pathname: `/blog/${encodeURIComponent(hyphenate(name))}`, state: { id }}} key={postIdx} >
                                                <Text {...styleProps.postTitle} >{name}</Text>
                                                <Text {...styleProps.postInfo} >{helper.displayTimeSince(published)} &bull; {readTime} min read</Text>
                                                <Text {...styleProps.postDescription} >{description}</Text>
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
            {/* </PageContent>
            <Footer /> */}
        </>
    );
}

export default Blog;
