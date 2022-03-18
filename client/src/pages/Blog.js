import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { Text, Skeleton, SkeletonText, Box } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import * as helper from "../utils/helpers"

const Blog = ({ match }) => {
    console.log("page", match)

    const GET_BLOG_INFO = gql`
        query {
            BlogInfo{
                id
                name
                description
                published
                readTime
            }
        }
    `

    const { data, loading, error } = useQuery(GET_BLOG_INFO);

    

    const styleProps = {
        postTitle: {
            fontSize: "2xl",
            fontFamily: "heading",
            fontWeight: "semibold"
        },
        postDescription: {
            my: 0
        },
        postInfo: {
            fontSize: "sm",
            fontWeight: "light",
            color: "gray.500"
        }
    }

    

    return (
        <>
            <NavBar active="blog"/>
            <PageContent>
                <Text fontSize="6xl" fontFamily="heading" as="h1">My <Text as="span" color="primaryLight">Journal</Text></Text>
                <Text fontSize='lg' >Sometimes I like to write about things I've worked on, my experiences or anything else of interest to me. Check it out!</Text>
                {
                     data && [...data.BlogInfo].sort((a, b) => Date.parse(b.published) - Date.parse(a.published)).map( (item, idx) => {
                        return (
                            
                            <Card isLink to={{pathname: `/blog/${item.name.toLowerCase().split(" ").join("-")}`, state: {id: item.id}}} key={idx}>
                                <Text {...styleProps.postTitle} >{item.name}</Text>
                                <Text {...styleProps.postInfo} >{helper.displayTimeSince(item.published)} &bull; {item.readTime} min read</Text>
                                <Text {...styleProps.postDescription} >{item.description}</Text>
                            </Card>
                            
                        )
                    })
                }
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
