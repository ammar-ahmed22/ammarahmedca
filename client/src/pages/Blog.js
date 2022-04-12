import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { Text, Skeleton, SkeletonText, Box, useColorModeValue, Divider, SimpleGrid, HStack } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import * as helper from "../utils/helpers"

const Blog = ({ match }) => {
    console.log("page", match)

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
            color: useColorModeValue("primaryLight", "primaryDark")
        },
        category: {
            as: "h3",
            fontSize: "3xl",
            fontFamily: "heading"
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
            <NavBar active="blog"/>
            <PageContent>
                <Text {...styleProps.title} >My <Text {...styleProps.titleSpan} >Journal</Text></Text>
                <Text {...styleProps.info} >Sometimes I like to write about things I've worked on, my experiences or anything else of interest to me. Check it out!</Text>
                <HStack  spacing={5} align="baseline">                
                {
                    data && sortBySize(data.BlogInfo).map( (categoryPosts, catIdx) => {
                        const { category, posts } = categoryPosts;
                        return (
                            <Box  key={catIdx} width="50%" >
                                <Text {...styleProps.category} >{category}</Text>
                                {
                                    sortByDate(posts).map( (post, postIdx) => {
                                        const { name, id, readTime, description, published } = post;
                                        return (
                                            <Card isLink to={{pathname: `/blog/${hyphenate(name)}`, state: { id }}} key={postIdx} >
                                                <Text {...styleProps.postTitle} >{name}</Text>
                                                <Text {...styleProps.postInfo} >{helper.displayTimeSince(published)} &bull; {readTime} min read</Text>
                                                <Text {...styleProps.postDescription} >{description}</Text>
                                            </Card>
                                        )
                                    })
                                }
                                

                            </Box>
                        )
                    })
                }
                </HStack>
                {
                    loading && [1,2].map((item, idx) => {
                        return (
                            
                            <Skeleton height="20vh" my={4} key={idx}/>
                            
                        )
                    })
                }
            </PageContent>
            <Footer />
        </>
    );
}

export default Blog;
