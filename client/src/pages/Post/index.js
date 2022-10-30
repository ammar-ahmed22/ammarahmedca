import React from 'react';
import NavBar from '../../components/Page/NavBar';
import PageContent from '../../components/Page/PageContent';
import Footer from '../../components/Page/Footer';
import PostContent from './PostContent';
import { Text, Box, Button, SkeletonText } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"

import { useParams, useNavigate, useLoaderData } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import * as helper from "../../utils/helpers"

const Post = () => {
    

    // const { postName } = useParams();
    const postName = useLoaderData();
    const navigate = useNavigate();

    const handleBackClick = e => {
        e.preventDefault()
        navigate("/blog")
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
            {/* <NavBar active="blog"/>
            <PageContent> */}
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
                   !loading && data && <PostContent pageId={data.BlogInfo[0].posts[0].id} infoLoaded={!loading && data}/>
                }
                

            {/* </PageContent>
            <Footer /> */}
        </>
    );
}

export default Post;
