import React from 'react';
import NavBar from '../components/NavBar';
import PageContent from '../components/PageContent';
import Footer from '../components/Footer';
import BlogContent from '../components/Blog/BlogContent';
import { Text, Box, Button, SkeletonText } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"

import { useParams } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import * as helper from "../utils/helpers"

const Post = ({ history }) => {
    

    const { postName } = useParams();

    const handleBackClick = e => {
        e.preventDefault()
        history.push("/blog")
    }

    const GET_BLOG_INFO = gql`
        query($name: String!){
            BlogInfo(name: $name){
                posts{
                    id
                    name
                    readTime
                    published
                }   
            }
        }
    `

    const styleProps = {
        title: {
            fontSize: "5xl",
            fontFamily: "heading",
            fontWeight: "bold",
            variant: "gradient",
            as: "h1"
        },
        info: {
            fontSize: "md",
            as: "span",
            color: "gray.500"
        },
    }

    
    const { data, loading, error } = useQuery(GET_BLOG_INFO, { variables: {name: decodeURIComponent(postName)}});

    
    

    return (
        <>
            <NavBar active="blog"/>
            <PageContent>
                {
                    loading && (
                        <Box mt="5vh">
                            <SkeletonText skeletonHeight={20} noOfLines={1} mb="4"/>
                            <SkeletonText skeletonHeight={4} noOfLines={1} mb="12"/>
                        </Box>
                    )
                }
                {
                    !loading && data && (
                        <Box my={5}>
                            <Button leftIcon={<ArrowBackIcon />} mt={4} variant="ghost" onClick={handleBackClick}>Back</Button>
                            <Text {...styleProps.title}>{data.BlogInfo[0].posts[0].name}</Text>
                            <Text {...styleProps.info}>{helper.displayTimeSince(data.BlogInfo[0].posts[0].published)} &bull; {data.BlogInfo[0].posts[0].readTime} min read</Text>

                        </Box>
                    )
                }
                {
                   !loading && data && <BlogContent pageId={data.BlogInfo[0].posts[0].id} infoLoaded={!loading && data}/>
                }
                

            </PageContent>
            <Footer />
        </>
    );
}

export default Post;
